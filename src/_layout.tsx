import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

import { logout } from "@/features/auth/authSlice";
import { type AppDispatch, type RootState } from "@/store";

import { Header } from "@/components/shared/header";
import { TopBar } from "@/components/shared/top-bar";

export default function RootLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, sessionExpiresAt } = useSelector(
    (state: RootState) => state.auth,
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isSessionExpired = !sessionExpiresAt || sessionExpiresAt < Date.now();

    if (!isAuthenticated || isSessionExpired) {
      dispatch(logout());
      navigate("/login", { replace: true });
      return;
    }

    const timeoutMs = sessionExpiresAt - Date.now();

    const timeoutId = setTimeout(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    }, timeoutMs);

    return () => clearTimeout(timeoutId);
  }, [dispatch, isAuthenticated, navigate, sessionExpiresAt]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className={`sticky top-0 z-10 bg-white ${
          scrolled ? "border-b border-border" : ""
        }`}
      >
        <TopBar />
        <Header />
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
