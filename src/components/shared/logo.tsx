import { useTheme } from "next-themes";
import { Link } from "react-router";

export function Logo() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? "/logo-light.svg" : "/logo.svg";

  return (
    <Link to="/">
      <img src={logoSrc} alt="Roselle Logo" />
    </Link>
  );
}
