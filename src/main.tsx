import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { store } from "./store";
import { router } from "./router";
import "./index.css";
import { Loader } from "@/components/shared/loader";
import { ThemeProvider } from "@/components/shared/theme-provider";

import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="roselle-theme"
      >
        <HelmetProvider>
          <Suspense
            fallback={
              <div className="h-dvh flex justify-center items-center">
                <Loader />
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>

          <Toaster position="top-center" />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>,
);
