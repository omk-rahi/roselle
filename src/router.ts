import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    lazy: async () => {
      const module = await import("@/_layout");
      return { Component: module.default };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/features/home/page");
          return { Component: module.default };
        },
      },
      {
        path: "/cart",
        lazy: async () => {
          const module = await import("@/features/cart/page");
          return { Component: module.default };
        },
      },
      {
        path: "/profile",
        lazy: async () => {
          const module = await import("@/features/profile/page");
          return { Component: module.default };
        },
      },
      {
        path: "/shop",
        lazy: async () => {
          const module = await import("@/features/shop/page");
          return { Component: module.default };
        },
      },
      {
        path: "/product/:id",
        lazy: async () => {
          const module = await import("@/features/product/page");
          return { Component: module.default };
        },
      },
    ],
  },
  {
    path: "/login",
    lazy: async () => {
      const module = await import("@/features/auth/login/page");
      return { Component: module.default };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const module = await import("@/features/auth/register/page");
      return { Component: module.default };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const module = await import("@/features/not-found/page");
      return { Component: module.default };
    },
  },
]);
