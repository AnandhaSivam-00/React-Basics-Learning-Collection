# React Basics Learning Collection

A comprehensive, project-based learning repository that documents a progressive journey through React fundamentals to advanced concepts. Built with **React 18**, **Vite**, and a modern tooling stack, this collection spans seven full-scale projects, dedicated learning modules, and supporting exercises — each designed to reinforce specific aspects of the React ecosystem.

---

## Table of Contents

- [Tech Stack Overview](#tech-stack-overview)
- [Project Breakdown](#project-breakdown)
  - [1. React Facts](#1-react-facts)
  - [2. Travel Journal](#2-travel-journal)
  - [3. Meme Generator](#3-meme-generator)
  - [4. Chief Mistral (AI Recipe Generator)](#4-chief-mistral-ai-recipe-generator)
  - [5. Assembly EndGame (Word Guessing Game)](#5-assembly-endgame-word-guessing-game)
  - [6. Tenzies (Dice Game)](#6-tenzies-dice-game)
  - [7. Moody (Mood Tracker & Journal)](#7-moody-mood-tracker--journal)
- [Router Learning Project](#router-learning-project)
  - [VanLife (React Router v7)](#vanlife-react-router-v7)
- [Supporting Learning Modules](#supporting-learning-modules)
  - [Redux Learning](#redux-learning)
  - [Framer Motion Learning](#framer-motion-learning)
  - [Context API & useReducer Exercises](#context-api--usereducer-exercises)
- [Architecture & Routing](#architecture--routing)
- [Key Learnings & Overall Insights](#key-learnings--overall-insights)

---

## Tech Stack Overview

| Category | Technologies |
|---|---|
| **Core** | React 18.3, Vite 6 |
| **Routing** | React Router DOM v7, @remix-run/router |
| **State Management** | Redux 5, Redux Toolkit 2, React Context API, useReducer |
| **Backend / BaaS** | Firebase (Auth, Firestore Lite) |
| **AI Integration** | Google Gemini (Generative AI SDK), Hugging Face Inference API (Mistral) |
| **Styling** | Bootstrap 5, Tailwind CSS 4, CSS Modules |
| **Animation** | Framer Motion 12 |
| **UI Libraries** | Ant Design (antd) |
| **Mock Server** | MirageJS |
| **Other** | Axios, React Markdown, nanoid, clsx, crypto-js, react-confetti-boom |

---

## Project Breakdown

### 1. React Facts

**Path:** `src/Projects/React Facts/`

**What it does:** A simple, static informational page that displays fun facts about React. It serves as a "Hello World" project for the collection.

**Technologies:** React, JSX, Bootstrap, CSS

**Key Learnings:**
- **Component Composition** — Breaking a page into `Header`, `MainContent`, and `Footer` components
- **JSX Fundamentals** — Understanding how JSX maps to React elements
- **Static Rendering** — Building presentational components without state
- **Component Hierarchy** — Parent-child component relationships

**Implementation Details:**
- Three functional components (`Header`, `MainContent`, `Footer`) composed inside a parent `ReactFacts` component
- Uses Bootstrap grid system for responsive layout
- Custom SVG icons and CSS styling via `ReactFacts.css`

---

### 2. Travel Journal

**Path:** `src/Projects/Travel Journal/`

**What it does:** A travel journal that renders a list of famous world landmarks as styled article cards, each with an image, description, country, and Google Maps link.

**Technologies:** React, JSX, Bootstrap, CSS, Custom SVG Icons

**Key Learnings:**
- **List Rendering** — Using `.map()` to render dynamic lists from a data array
- **Props & Spread Operator** — Passing data via props and using `{...data}` spread syntax for prop forwarding
- **Component Reusability** — A single `ArticleCards` component reused for each data entry
- **Key Prop Importance** — Understanding why unique `key` props are required for list items
- **External Asset Integration** — Embedding images via URLs and linking to Google Maps

**Implementation Details:**
- Data-driven rendering from a hardcoded `dataObject` array containing 7 world landmarks
- `ArticleCards` component receives spread props (`{...data}`) for clean prop passing
- Custom `FlightIcon` and `LocationIcon` SVG components from a shared icons file
- Responsive card layout using Bootstrap's grid system

---

### 3. Meme Generator

**Path:** `src/Projects/Meme Generator/`

**What it does:** An interactive meme generator that fetches meme templates from the ImgFlip API and overlays user-provided top and bottom text onto a randomly selected meme image.

**Technologies:** React, Context API, External REST API (ImgFlip), Bootstrap

**Key Learnings:**
- **Context API for State Sharing** — `MainContentProvider` wraps the app and shares meme state (`meme`, `setMeme`) via `createContext` and a custom `useMemeDataContext` hook, avoiding prop drilling between `InputForm` and `OutputContainer`
- **API Data Fetching** — Using `useEffect` with `fetch()` to retrieve meme templates from an external API on mount
- **Controlled Form Inputs** — Dynamic state updates via `onChange` handlers that update the correct field using computed property names (`[name]: value`)
- **Event Handling & Form Submission** — `onSubmit` with `event.preventDefault()` for controlled form behavior
- **Custom Hooks** — Extracting context consumption into a reusable `useMemeDataContext()` hook

**Implementation Details:**
- `MainContentProvider.jsx` — Creates and provides a React Context with meme state
- `InputForm.jsx` — Fetches meme data on mount, handles text input changes, and generates random meme images
- `OutputContainer.jsx` — Renders the meme image with overlaid text
- Component architecture: `MemeGenerator` → `MainContentProvider` → (`InputForm` + `OutputContainer`)

---

### 4. Chief Mistral (AI Recipe Generator)

**Path:** `src/Projects/Chief Mistral/`

**What it does:** An AI-powered recipe generator where users add ingredients they have on hand, and the Mistral AI model (via Hugging Face) generates a recipe suggestion in Markdown format.

**Technologies:** React, Hugging Face Inference API (Mistral Mixtral-8x7B), React Markdown, Bootstrap, CSS

**Key Learnings:**
- **AI/LLM Integration** — Making API calls to Hugging Face's Inference endpoint for the Mistral model
- **`forwardRef` Usage** — The `GetRecipe` component uses `React.forwardRef()` to accept a ref from its parent, demonstrating how functional components can work with refs
- **`useRef` for DOM Interaction** — Using a ref to programmatically scroll to the recipe section after generation via `scrollIntoView({ behavior: "smooth" })`
- **`useEffect` with Dependencies** — Triggering scroll behavior only when `recipeIdea` state changes
- **Functional State Updates** — Using previous state in `setIngredientList` for safe state transitions
- **Form Handling with `FormData`** — Extracting form values using the native `FormData` API
- **Markdown Rendering** — Using `react-markdown` to render AI-generated Markdown content as HTML
- **Input Validation** — Regex-based validation to reject numeric-only input

**Implementation Details:**
- `AiModel.js` — Implements Hugging Face API calls with the Mixtral-8x7B-Instruct model, including a system prompt for recipe generation and fallback fetch-based implementation for MirageJS compatibility
- `GetRecipe` component uses `forwardRef` to receive a scroll target ref from `MainContent`
- Recipe is only shown when the user has added more than 2 ingredients
- Loading states with Bootstrap spinner while the AI generates the recipe
- Handles MirageJS passthrough configuration for external API calls

---

### 5. Assembly EndGame (Word Guessing Game)

**Path:** `src/Projects/Assembly EndGame/`

**What it does:** A word-guessing game inspired by "Hangman" where the player must guess a secret word letter by letter. Wrong guesses eliminate programming languages (displayed as chips), and the game ends if all languages are lost.

**Technologies:** React, Google Gemini AI, Bootstrap, clsx, react-confetti-boom, CSS

**Key Learnings:**
- **AI-Generated Content** — Using Google Gemini (`gemini-3.1-flash-lite`) to generate random English words for each game round
- **Derived State** — Computing `wrongGuessedWordCount`, `isGameOver`, `isGameWon`, and `isLatestGuessWrong` from primary state rather than storing them separately
- **`clsx` for Conditional Classes** — Using the `clsx` utility for clean conditional CSS class application
- **`useEffect` for Side Effects** — Fetching AI-generated words on component mount
- **Game Logic with Array Methods** — Using `.filter()`, `.every()`, and `.includes()` for game state evaluation
- **Confetti Animation** — Integrating `react-confetti-boom` for win celebration
- **Accessibility** — `aria-label` and `aria-disabled` attributes on interactive elements

**Implementation Details:**
- `AiRandomWordGenerator.js` — Interfaces with Google Gemini API to generate random 4-8 letter English words
- `LanguageChips` component — Displays programming languages that get eliminated with each wrong guess
- `Notification` component — Shows contextual feedback for correct/wrong guesses
- Fallback to local `getRandomWord()` when AI generation fails
- Keyboard buttons are disabled when the game is over or won
- Letter reveal animation: correct guesses show the letter, wrong guesses show `?`

---

### 6. Tenzies (Dice Game)

**Path:** `src/Projects/Tenzies/`

**What it does:** A full-featured dice game where players roll 10 dice and try to get all dice to show the same number. Players click individual dice to "hold" them and roll the rest. The game tracks clicks, time, and maintains a leaderboard with user authentication.

**Technologies:** React, Redux Toolkit, Firebase (Auth + Firestore), React Router DOM v7, Ant Design, nanoid, react-confetti-boom, Bootstrap, CSS

**Key Learnings:**
- **Redux Toolkit (RTK) Architecture** — Full RTK setup with `configureStore`, `createSlice`, and `createAsyncThunk` for async operations. Four slices: `authSlice`, `userSlice`, `userLogSlice`, `leaderboardSlice`
- **Firebase Authentication** — Complete auth flow: `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, session persistence, and auth state listeners
- **Firestore Database Operations** — CRUD operations including `setDoc`, `updateDoc`, `getDoc`, `getDocs`, with structured sub-collections for user settings and game history
- **Compound Component Pattern** — `Tenzies` parent with attached sub-components (`Tenzies.Login`, `Tenzies.SignUp`, `Tenzies.MainContent`, `Tenzies.LeaderBoard`) via the index file
- **Lazy Initialization in `useState`** — `useState(() => generateNewDice())` to avoid expensive recalculation on re-renders
- **`useRef` for DOM Focus** — Auto-focusing the roll button after game completion
- **Game Statistics Tracking** — Calculating elapsed time, click counts, and formatted durations
- **Redux Middleware Configuration** — Customizing serializable check middleware for Firebase Timestamp objects
- **Route-Level Authentication** — Using React Router `loader` with `createAsyncThunk` to guard routes
- **Accessibility** — `aria-live` regions for screen reader announcements on game events

**Implementation Details:**
- **Redux Store** (`redux/app/store.js`) — Configured with four reducers and custom serializable check middleware to handle Firebase Timestamps
- **Auth Slice** (`redux/features/authSlice.js`) — Implements `loginUserAction`, `registerUserAction`, `logoutUserAction`, and `requireAuthUser` as async thunks with comprehensive Firebase error code handling
- **User Registration** — Creates entries in Firestore across three sub-collections: user profile, settings data, and game history statistics
- **Game Mechanics** — `generateNewDice()` creates 10 dice with `nanoid` IDs; `holdDie()` toggles individual dice; `rollDice()` randomizes unheld dice
- **Win Condition** — All dice must match the first die's value and all must be held (`isClicked`)
- **Modal System** — `CountModal` displays game stats (clicks, time) after winning
- **Leaderboard** — `LeaderBoard` page with `LeaderTable` and `UserLogsTable` components for competitive tracking
- **Settings** — Trail mode, dark mode, leaderboard visibility, and email preferences

---

### 7. Moody (Mood Tracker & Journal)

**Path:** `src/Projects/Moody/`

**What it does:** A full-featured mood tracking and journaling application where users can log their daily moods (Awful, Bad, Meh, Good, Amazing), write journal entries, view a social feed of posts, manage their profile with avatar upload, and filter posts by date range.

**Technologies:** React, Firebase (Auth + Firestore), React Router DOM v7, Framer Motion, Ant Design, Tailwind CSS, Bootstrap, Cloudinary (avatar uploads), CSS

**Key Learnings:**
- **Firebase Authentication (Full Suite)** — Email/password login, Google Sign-In via `GoogleAuthProvider`, account deletion, profile updates with `updateProfile`
- **Firestore Complex Queries** — Using `query()`, `where()`, `orderBy()`, `collection()`, and `serverTimestamp()` for structured data retrieval
- **React Router Loaders & Actions** — `moodyPostLoader`, `moodyPostAction`, `moodyLoginLoader`, `moodyBasicAction`, `moodyUpdateProfileAction`, `moodyFeedsLoader` for data-driven routing
- **`useFetcher` for Non-Navigating Submissions** — Submitting form data without triggering a page navigation, using the fetcher API from React Router
- **`useCallback` & `React.memo`** — Memoizing event handlers (`handleMoodClick`, `handleMoodPost`, `filterPostsByDate`) and wrapping `MoodyHome` in `React.memo` for performance optimization
- **`useSearchParams` for URL State** — Managing filter state (today/week/month/all) through URL search parameters
- **`Suspense` + `Await` for Deferred Data** — Streaming async loader data with `<Suspense>` and `<Await resolve={postData}>` for progressive rendering
- **`Outlet` Context Passing** — Passing `userData` and `setUserData` from the `Moody` layout to child routes via `<Outlet context={{...}} />`
- **Framer Motion Animations** — Page transitions (`PageTransition`), text reveal animations (`TextRevealAnimation`), background grid transitions, and animated navigation cursor (`CursorTracker`)
- **Custom Navigation Component** — A compound `Menu` component (`Menu`, `Menu.Button`, `Menu.Dropdown`, `Menu.Item`) built from scratch
- **Route Guards** — Custom `requireFirebaseAuth` function that wraps `onAuthStateChanged` in a Promise for React Router loader integration
- **Ant Design Modals** — Using `Modal.confirm()` for post submission confirmation

**Implementation Details:**
- **Pages:** `MoodyLogin`, `MoodyHome`, `Feeds`, `UpdateProfile`, `AboutPage`
- **Components:** `FlexNavBar` (animated nav with cursor-following highlight), `MoodyPostCard` (post display), `DragAndDropImage` (avatar upload), `BackgroundGridTransition`, `TextRevealAnimation`, `PageTransition`
- **Data Layer** (`dataFetchFunctions.js`) — Comprehensive Firestore operations: user CRUD, post creation, avatar management, Google login, profile updates
- **Navigation** — Custom compound Menu component with Framer Motion-powered cursor tracking animation
- **Post Filtering** — Client-side filtering by today/week/month with `useSearchParams` for URL-persistent filter state
- **Profile Management** — Avatar upload via Cloudinary drag-and-drop, display name updates, phone number management, account deletion

---

## Router Learning Project

### VanLife (React Router v7)

**Path:** `src/React Router Projects/VanLife/`

**What it does:** A van rental marketplace application that demonstrates advanced React Router patterns. Users can browse available vans, view details, and hosts can manage their van listings through a dedicated dashboard.

**Technologies:** React, React Router DOM v7, MirageJS (mock API server), Firebase Firestore, Bootstrap, CSS

**Key Learnings:**
- **`createBrowserRouter` with `createRoutesFromElements`** — Declarative route definition using JSX `<Route>` elements compiled into a browser router
- **Route Loaders & Actions** — `vansLoader`, `vanDetailsLoader`, `hostVansLoader`, `loginLoader`, `loginAction` for data fetching and mutations at the route level
- **Nested Routes & Layouts** — `MainLayout` wrapping public routes, `HostLayout` wrapping host-specific routes, with `<Outlet />` for child rendering
- **Dynamic Routes** — `vans/:id` for individual van detail pages with parameterized loading
- **Route-Level Authentication** — `requireAuth(request)` function in loaders to protect host routes, redirecting unauthenticated users
- **Error Boundaries** — `errorElement={<Errors />}` on routes for graceful error handling
- **Mock API with MirageJS** — Full mock server with models, seeds, routes, and passthrough configuration for external APIs (Firebase, Hugging Face)
- **Conditional Rendering with Auth State** — UI elements shown/hidden based on login status

**Implementation Details:**
- **Server** (`server/server.js`) — MirageJS server with `vans` and `users` models, seeded data, RESTful routes (`GET /vans`, `GET /vans/:id`, `GET /host/vans`, `POST /login`), and extensive passthrough rules for Firebase and AI APIs
- **API Layer** (`server/ApiCalls.js`) — Firestore CRUD operations for vans and users, including `getVans`, `getVan`, `getHostVans`, `getHostVan`, `loginAuth`
- **Host Dashboard** — Sub-routes for `Dashboard`, `Income`, `Reviews`, and nested van management (`HostVans` → `HostVansDetails` with `pricing` and `photos` sub-routes)
- **Login Flow** — Form action-based login with `loginAction` and `loginLoader`, with redirect handling via URL search params

---

## Supporting Learning Modules

### Redux Learning

**Path:** `src/Redux-Learning/`

**What it does:** A dedicated learning module covering both legacy Redux and modern Redux Toolkit patterns, demonstrated through a Pizza/Burger shop ordering UI and a user management view.

**Technologies:** Redux 5, Redux Toolkit 2, React-Redux, Redux Thunk

**Key Learnings:**
- **Legacy Redux** — `createStore`, `combineReducers`, `applyMiddleware`, `connect()` HOC with `mapStateToProps` / `mapDispatchToProps`
- **Redux Toolkit Migration** — Transitioning from legacy Redux to RTK's `configureStore`, `createSlice`, and `createAsyncThunk`
- **Actions & Reducers** — Separate action creators and reducers for pizza and burger domains
- **Thunk Middleware** — Async action handling with `redux-thunk` for API-fetched product data
- **Redux DevTools** — Integration with `@redux-devtools/extension` for state inspection

---

### Framer Motion Learning

**Path:** `src/Framer-Motion-Learning/`

**What it does:** A sandbox for learning Framer Motion animation techniques, featuring scroll-driven animations, parallax effects, drag interactions, and progress indicators.

**Technologies:** Framer Motion 12, Tailwind CSS

**Key Learnings:**
- **Scroll-Linked Animations** — `useScroll` with `useTransform` to create scroll-progress-driven visual effects
- **Spring Physics** — `useSpring` for smooth, natural-feeling animation interpolation
- **Parallax Effects** — Multi-layer parallax with `clipPath` polygon transforms, background-size animation, and per-image scroll offsets
- **Draggable Elements** — `DraggableCircle` component for drag interaction learning
- **`AnimatePresence`** — Orchestrating enter/exit animations for mounting/unmounting components
- **Motion Values & Templates** — `useMotionTemplate` for combining multiple motion values into CSS transform strings
- **Progress Bar** — Fixed scroll progress indicator with color interpolation from purple to green

---

### Context API & useReducer Exercises

**Path:** `src/MealsListView/`, `src/SampleReducer/`

**MealsList (Context API):**
- Demonstrates `createContext`, custom provider components, and custom hooks (`useMealsList`)
- `MealsListProvider` wraps `MealsList` and `Counter` to share a meals list without prop drilling

**Wallet (useReducer):**
- Demonstrates React's built-in `useReducer` hook as a lightweight alternative to Redux
- A simple wallet with deposit/withdraw actions via a `moneyReducer`
- Pattern: `const [state, dispatch] = useReducer(reducer, initialState)`

---

## Architecture & Routing

The entire application is orchestrated through a single `App.jsx` at the root that defines all routes using React Router v7's `createBrowserRouter`:

```
/                          → HappyDays (Landing/Navigation Hub)
/chief-mistral             → AI Recipe Generator
/reactfacts                → React Facts
/travel-journal            → Travel Journal
/meme-generator            → Meme Generator
/assembly-endgame          → Assembly EndGame
/tenzies-game/*            → Tenzies (auth-guarded)
  ├── /                    → Main Content (Game)
  ├── /login               → Login
  ├── /sign-up             → Sign Up
  └── /leaderboard         → Leaderboard
/vanslife/*                → VanLife
  ├── /                    → Home
  ├── /about               → About
  ├── /vans                → Vans List
  ├── /vans/:id            → Van Details
  ├── /login               → Login
  └── /host/*              → Host Dashboard (auth-guarded)
/moody/*                   → Moody
  ├── /login               → Login
  └── /home/*              → Home (Firebase auth-guarded)
      ├── /                → Moody Home
      ├── /post-feeds      → Feeds
      ├── /profile-update  → Profile Update
      └── /about           → About
```

**Cross-Cutting Patterns:**
- **Lazy Loading** — Nearly all route components are loaded via `React.lazy()` with `<Suspense>` fallback
- **`AnimatePresence`** — Wraps the `RouterProvider` for animated route transitions
- **Redux Provider** — Global Redux store wrapping at the root level in `main.jsx`
- **Firebase Configuration** — Centralized Firebase config in `src/config/firebaseConfig.js` shared across Moody, Tenzies, and VanLife

---

## Key Learnings & Overall Insights

### Progressive Complexity
The projects are structured in increasing complexity — from static pages (React Facts) to fully authenticated, AI-integrated applications (Moody, Tenzies). This progression naturally builds competence in:

1. **Component Design** — From simple presentational components to compound component patterns and render delegation
2. **State Management Evolution** — Local state (`useState`) → `useReducer` → Context API → Redux → Redux Toolkit with async thunks
3. **Data Fetching Patterns** — Inline `fetch()` → `useEffect` side effects → React Router loaders → Redux async thunks
4. **Authentication Depth** — Mock authentication (MirageJS) → Firebase email/password → Google OAuth → Route-level guards

### React Fundamentals Reinforced Across Projects
- **Props & Component Communication** — Every project reinforces different prop-passing patterns (direct, spread, context, outlet context)
- **Hooks Mastery** — Comprehensive use of `useState`, `useEffect`, `useRef`, `useReducer`, `useCallback`, `useMemo`, `useSearchParams`, `useFetcher`, `useLoaderData`, `useActionData`, `useNavigation`
- **Conditional Rendering** — Ternary operators, short-circuit evaluation, and early returns
- **List Rendering** — `.map()` with keys in Travel Journal, Tenzies dice, Moody posts, VanLife vans
- **Form Handling** — Controlled inputs, `FormData` API, `useFetcher` submissions, Ant Design modals
- **Side Effects** — API calls, DOM manipulation, scroll behavior, timers, and cleanup functions

### Advanced Concepts Demonstrated
- **AI Integration** — Two projects integrate LLM APIs (Google Gemini for word generation, Hugging Face Mistral for recipe generation)
- **Real-Time Backend** — Firebase Firestore for persistent data across Tenzies and Moody
- **Animation Systems** — Framer Motion for page transitions, parallax scrolling, drag interactions, and cursor-following effects
- **Performance Optimization** — `React.memo`, `useCallback`, `useMemo`, lazy loading, and code splitting
- **Accessibility** — `aria-*` attributes, `aria-live` regions, keyboard navigation, and screen reader support
- **Route Architecture** — Nested layouts, route guards, loader/action patterns, error boundaries, and deferred data with `Suspense`/`Await`

### Design Patterns Encountered
- **Compound Components** — Tenzies (`Tenzies.Login`, `Tenzies.MainContent`) and Moody's Menu system
- **Provider Pattern** — Context providers for Meme Generator and MealsList
- **Render Props / Children Pattern** — Layout components using `{children}` and `<Outlet />`
- **Custom Hooks** — `useMemeDataContext`, `useMealsList`, `requireFirebaseAuth`, `requireAuth`
- **Lazy Loading** — `React.lazy()` + `Suspense` for code-split route components

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/AnandhaSivam-00/React-Basics-Learning-Collection.git

# Install dependencies
npm install

# Create a .env file with your API keys
# VITE_HUGGING_FACE_MISTRAL_MODEL_API=...
# VITE_GOOGLE_GEMINI_MODEL_API=...
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# VITE_FIREBASE_PROJECT_ID=...
# VITE_FIREBASE_STORAGE_BUCKET=...
# VITE_FIREBASE_MESSAGING_SENDER_ID=...
# VITE_FIREBASE_APP_ID=...
# VITE_CLOUDINARY_CLOUD_NAME=...
# VITE_CLOUDINARY_API_KEY=...
# VITE_CLOUDINARY_API_SECRET_KEY=...
# VITE_CLOUDINARY_URL=...
# VITE_CLOUDINARY_UPLOAD_PRESET=...

# Start the development server
npm run dev
```

Navigate to the landing page and use the navigation buttons to explore each project.

---

*Built as a learning collection to progressively master React and its ecosystem.*