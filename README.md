# Roselle Jewelry | Elegant & Timeless Jewellery

Roselle Jewelry is a modern eCommerce platform designed to deliver a seamless and elegant jewelry shopping experience. The platform allows users to explore a curated collection of beautiful jewelry pieces, search products effortlessly, view detailed product information, and manage their shopping cart with ease.

Built with a focus on performance, scalability, and user experience, Roselle Jewelry provides a smooth and responsive interface that makes browsing and purchasing jewelry simple and enjoyable.

## Links

- GitHub: <https://github.com/omk-rahi/roselle>
- Live URL: <https://roselle-omkar.vercel.app/>

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Redux Toolkit
- TanStack Query
- Tailwind CSS 4

## Routes

- `/` Home
- `/shop` Product listing
- `/shop?q=<search-term>` Search results
- `/product/:id` Product details
- `/cart` Cart
- `/profile` Profile
- `/login` Login
- `/register` Register
- `*` Not found

## Data and State Notes

- Product data is fetched from `DUMMYJSON API` (`/products/category/womens-jewellery` endpoints).
- Cart data is stored in localStorage (`roselle-cart`).
- Auth users are stored in localStorage (`roselle-users`).
- Active auth session is stored in localStorage (`roselle-auth-session`) with a 5-minute expiry.

## TASKS

- [x] User Registration
- [x] User Login
- [x] Session Management
- [x] Dashboard
- [x] Product Listing
- [x] Product Detail
- [x] Cart Management
- [x] User Profile

## Bonus Features

- [x] Product search or filter
- [x] Toast notifications
- [x] Persist login on page refresh
- [x] Custom hooks for auth or cart
- [x] Dark mode support
- [ ] Infinite Product Scroll – Not implemented because the API currently contains only 3 jewellery products.
