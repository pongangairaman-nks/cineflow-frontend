This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Folder Structure

📂 cineflow-frontend
┣ 📂 app → Next.js App Router
┃ ┣ 📂 (auth) → Authentication Pages
┃ ┃ ┣ 📜 login/page.tsx → Netflix-Style Login Page
┃ ┃ ┣ 📜 signup/page.tsx → Netflix-Style Signup Page
┃ ┃ ┣ 📜 forgotPassword/page.tsx→ Netflix-Style Signup Page
┃ ┃ ┗ 📜 layout.tsx → Auth Layout
┃ ┣ 📂 (dashboard) → Main UI (Movies, TV Shows, Genres)
┃ ┃ ┣ 📜 page.tsx → Homepage with Netflix UI
┃ ┃ ┣ 📜 movies/page.tsx → Movies Page
┃ ┃ ┣ 📜 tv-shows/page.tsx → TV Shows Page
┃ ┃ ┣ 📜 genres/page.tsx → Genres Page
┃ ┃ ┗ 📜 layout.tsx → Dashboard Layout (Navbar)
┣ 📂 components → Reusable UI Components
┃ ┣ 📜 Navbar.tsx → Netflix Navigation Bar
┃ ┣ 📜 HeroSection.tsx → Hero Section (Featured Movie Banner)
┃ ┣ 📜 MovieRow.tsx → Scrollable Movie Sections
┣ 📂 redux → Redux Store Setup
┃ ┣ 📂 slices → State Slices (Movies, User, etc.)
┃ ┃ ┣ 📜 movieSlice.ts → Movie Fetching State (Redux Toolkit)
┃ ┣ 📜 store.ts → Redux Store Configuration
┣ 📂 zustand → Zustand Store Setup
┃ ┣ 📜 store.ts → Zustand Store for UI State
┣ 📂 styles → Global Styles
┃ ┣ 📜 global.css → Netflix Font Family & Tailwind Styling
┣ 📜 tailwind.config.js → Tailwind Configuration
┣ 📜 next.config.js → Next.js Configuration
┣ 📜 package.json → Dependencies & Scripts
┣ 📜 .env → API Configuration
