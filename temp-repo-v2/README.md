# Over-Stimulated (OS) Portfolio

A high-end, editorial-style portfolio application built with Next.js 15, Tailwind CSS, Framer Motion, and GSAP. This project features a sophisticated "bento-grid" horizontal scroll gallery, an interactive editorial system, and a minimalist design language inspired by modern design studios.

## 🤖 AI Context & Architectural Overview

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4.0
- **Animations:** 
  - `motion/react` (Framer Motion) for UI component transitions.
  - `gsap` + `ScrollTrigger` for advanced horizontal scrolling and smooth interactions.
- **Icons:** `lucide-react`
- **Typography:** Inter (Sans), Space Grotesk (Display), JetBrains Mono (Technical).

### Core Components Structure (app/page.tsx)
The application is currently contained within a single main page to maintain the fluidity of the "Studio Ethos" experience.

#### 1. State Management
- `viewMode`: Controls the primary content of the index section (`about`, `os-tools`, `writing`).
- `selectedWritingId`: Manages the drill-down state for the Writing section.
- `showDetails`: Toggles a global "expanded" UI state that blurs the background.

#### 2. Sections
- **Header:** Contains the brand identity, dynamic clock, and the core "Index" navigation.
- **Index Content:** 
  - `About OS`: Minimalist studio description.
  - `Writing`: A list of editorial entries that expand into full write-ups with slide-in animations.
  - `OS Tools®`: Showcase of internal products.
- **Project Gallery:** 
  - A horizontal bento-grid layout using `grid-rows-2`.
  - Content autoscrolls horizontally.
  - Each card supports background video autoplay, custom color mapping, and a "See More" hover overlay.

### Key Logic Patterns

#### Horizontal Scroll (GSAP)
The project gallery uses a horizontal scroll implementation that is smoothed by GSAP. When an AI is modifying the grid:
- Grid structure: `grid-rows-2 grid-flow-col`.
- Card sizing is handled via `col-span` and `row-span` properties in the `projects` data array.
- Padding and height are sensitive to ensure no cutoff on different viewport sizes.

#### Writing Section Navigation
The writing section uses an `AnimatePresence` pattern to switch between the list view and the detailed article view.
- To add new articles, update the `writings` array in `page.tsx`.

### Design Guidelines (The "OS" Feel)
- **Restraint:** High use of whitespace.
- **Contrast:** Black and white base with bold, deliberate splashes of color (Red `#e31e24`, Deep Green `#0a4d3c`).
- **Motion:** Soft `y` offsets (5px-10px) on entrance and exit. High-speed backdrop blurring for meta-navigation.

## 🛠 Development Commands
- `npm run dev`: Starts the development server on port 3000.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint for code quality checks.

## 📍 File Map
- `/app/page.tsx`: The heart of the application logic and UI.
- `/app/layout.tsx`: Root layout, font loading, and global metadata.
- `/app/globals.css`: Tailwind imports and base styles.
- `/public/`: Static assets (images/videos).

## ⚠️ Known Implementation Details
- **Video Source:** Using `<source src={...} type="video/mp4" />` within `<video>` tags is mandatory for cross-browser compatibility.
- **iFrame Constraints:** The app is designed to run within the AI Studio preview window; use `ResizeObserver` if any canvas or dynamic sizing components are added.
