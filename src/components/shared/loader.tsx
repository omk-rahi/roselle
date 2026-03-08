import { useTheme } from "next-themes";

export function Loader() {
  const { resolvedTheme } = useTheme();
  const loaderSrc =
    resolvedTheme === "dark" ? "/loader-light.gif" : "/loader.gif";

  return (
    <div className="flex justify-center">
      <img src={loaderSrc} alt="Diamond loader" className="h-48" />
    </div>
  );
}
