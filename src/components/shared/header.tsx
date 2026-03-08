import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Logo } from "@/components/shared/logo";
import { Link } from "react-router";
import { type RootState } from "@/store";
import { HeaderSearch } from "@/components/shared/header-search";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  MapPin,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Necklace", "Bracelet", "Bangles", "Rings", "Earrings"];

export function Header() {
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const { resolvedTheme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const isDarkTheme = resolvedTheme === "dark";

  useEffect(() => {
    if (!isMobileMenuOpen && !isSearchOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (headerRef.current?.contains(target)) {
        return;
      }

      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "bg-background",
        (isMobileMenuOpen || isSearchOpen) &&
          "border-b border-border/80 relative",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-2 sm:gap-4">
        <div className="flex-1 hidden md:flex">
          <ul className="flex gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <Link
                  to="/shop"
                  className="relative inline-flex pb-1 text-sm uppercase font-medium transition-colors hover:text-neutral-700 after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 md:hidden flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <div className="flex justify-center flex-1">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2 lg:gap-4">
          <div className="hidden lg:block">
            <Select defaultValue="ahmedabad">
              <SelectTrigger className="w-40 text-sm shadow-none border-0 bg-background font-medium">
                <MapPin className="h-4 w-4" />
                <SelectValue placeholder="DELIVER TO" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                  <SelectItem value="vadodara">Vadodara</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle search"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </Button>

            <Button asChild variant="ghost" size="icon">
              <Link to="/profile" aria-label="Profile">
                <User size={20} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart" aria-label="Cart">
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-foreground px-1 text-center text-[10px] leading-4 text-background">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/80 px-4 py-4 absolute w-full z-5 bg-background">
          <ul className="grid gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <Link
                  to="/shop"
                  className="relative inline-flex pb-1 text-sm uppercase font-medium after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Select defaultValue="ahmedabad">
              <SelectTrigger className="w-full text-sm shadow-none border-0 bg-background font-medium">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="DELIVER TO" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                  <SelectItem value="vadodara">Vadodara</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <HeaderSearch
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onNavigate={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
}
