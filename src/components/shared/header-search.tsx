import type { ReactNode } from "react";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

const SEARCH_SUGGESTIONS = [
  "Green Crystal Earring",
  "Green Oval Earring",
  "Tropical Earring",
];

function highlightMatch(value: string, query: string): ReactNode {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return value;
  }

  const lowerValue = value.toLowerCase();
  const lowerQuery = trimmedQuery.toLowerCase();
  const matchIndex = lowerValue.indexOf(lowerQuery);

  if (matchIndex < 0) {
    return value;
  }

  const start = value.slice(0, matchIndex);
  const match = value.slice(matchIndex, matchIndex + trimmedQuery.length);
  const end = value.slice(matchIndex + trimmedQuery.length);

  return (
    <>
      {start}
      <span className="font-semibold text-foreground">{match}</span>
      {end}
    </>
  );
}

type HeaderSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onNavigate?: () => void;
};

export function HeaderSearch({
  query,
  onQueryChange,
  onNavigate,
}: HeaderSearchProps) {
  const navigate = useNavigate();
  const trimmedSearch = query.trim().toLowerCase();

  const matchingSuggestions = useMemo(() => {
    const filtered = SEARCH_SUGGESTIONS.filter((suggestion) =>
      suggestion.toLowerCase().includes(trimmedSearch),
    );

    return (trimmedSearch ? filtered : SEARCH_SUGGESTIONS).slice(0, 5);
  }, [trimmedSearch]);

  function handleSearchNavigation(term: string) {
    navigate(`/shop?q=${encodeURIComponent(term.trim())}`);
    onNavigate?.();
  }

  function handleSearchSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearchNavigation(query);
  }

  return (
    <div className="border-t border-border/80 bg-background absolute w-full z-10">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="mx-auto w-full max-w-4xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex h-14 items-center gap-3 border border-input bg-card px-4 rounded-xl">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search for jewellery"
                className="h-full w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </div>
          </form>

          <div className="mt-4 divide-y divide-border/70 rounded-md bg-card">
            {matchingSuggestions.length ? (
              matchingSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-foreground/90 transition-colors hover:bg-muted/60 sm:text-base"
                  onClick={() => handleSearchNavigation(suggestion)}
                >
                  {highlightMatch(suggestion, query)}
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-muted-foreground sm:text-base">
                No suggestions found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
