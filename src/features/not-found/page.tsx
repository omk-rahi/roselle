import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <Helmet>
        <title>Page Not Found | Roselle</title>
      </Helmet>

      <div className="max-w-lg text-center">
        <h1 className="font-heading text-7xl sm:text-8xl font-semibold text-foreground">
          404
        </h1>

        <p className="mt-2 text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Page Not Found
        </p>

        <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Try going back to the homepage.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
