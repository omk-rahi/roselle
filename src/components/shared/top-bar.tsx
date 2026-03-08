import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

export function TopBar() {
  const sessionExpiresAt = useSelector(
    (state: RootState) => state.auth.sessionExpiresAt,
  );

  const [sessionText, setSessionText] = useState("");

  useEffect(() => {
    if (!sessionExpiresAt) return;

    const interval = setInterval(() => {
      const remaining = sessionExpiresAt - Date.now();

      if (remaining <= 0) {
        setSessionText("Session expired");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(remaining / 1000 / 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setSessionText(
        `Session expires in ${minutes}:${seconds.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionExpiresAt]);

  return (
    <div className="bg-[#F7C8D0] dark:text-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-1.5 text-xs sm:text-sm">
        <p className="px-3 sm:px-5">{sessionText}</p>

        <div className="flex items-center justify-end">
          <p className="px-3 sm:px-5">Welcome to Roselle</p>
          <p className="hidden sm:block border-x border-foreground dark:border-background px-5">
            English
          </p>
          <p className="hidden sm:block px-5">INR (Rs)</p>
        </div>
      </div>
    </div>
  );
}
