# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
```

## Environment Variables

Create a `.env` file in the project root:
```
VITE_API_KEY=<your-tmdb-api-key>
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
```

Optional (for analytics/ads):
- `VITE_GA_MEASUREMENT_ID` - Google Analytics 4
- `VITE_GOOGLE_AD_CLIENT` / `VITE_GOOGLE_AD_SLOT` - Google Adsense

## Architecture

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- Redux Toolkit Query for API data fetching
- React Router v6 for routing
- Framer Motion for animations

### Project Structure
```
src/
├── pages/          # Route components (Home, Catalog, Detail, NotFound)
├── common/         # Reusable UI components (barrel exported via index.ts)
├── context/        # React Context providers (global state, theme)
├── services/       # API layer (TMDB.ts with RTK Query)
├── hooks/          # Custom hooks (useMotion, useOnClickOutside, useOnKeyPress)
├── utils/          # Config and helper functions
├── constants/      # Static data (nav links, theme options)
└── styles/         # Tailwind utility classes
```

### Data Flow
1. **TMDB API** provides all movie/TV data
2. **RTK Query** (`src/services/TMDB.ts`) manages fetching, caching, loading states
3. **React Context** handles UI state (video modal, sidebar, theme)
4. Pages consume data via `useGetShowsQuery` and `useGetShowQuery` hooks

### Key Patterns

**Path Alias**: Use `@/` to import from `src/` (configured in tsconfig.json)
```typescript
import { Header } from "@/common";
import { useGlobalContext } from "@/context/globalContext";
```

**Context Providers** (wrapped in main.tsx):
- `ThemeProvider` - Dark/light mode with localStorage persistence
- `GlobalContextProvider` - Video modal state, sidebar visibility

**Lazy Loading**: Pages are lazy-loaded via `React.lazy()` in App.tsx

**Component Exports**: Common components use barrel exports from `src/common/index.ts`

### Routes
- `/` - Home page with hero slider and movie sections
- `/:category` - Catalog page (movie or tv) with search and filtering
- `/:category/:id` - Detail page for specific movie/show

## Development Best Practices

### Testing
- Write tests for each new feature or component before moving to the next step
- Test incrementally: verify functionality works at each phase of implementation
- Manually test in the browser after each significant change
- Run `npm run build` to catch TypeScript errors before committing

### Git Commits
- Write descriptive commit messages that explain the "why" not just the "what"
- Use conventional format: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`
- Keep commits atomic: one logical change per commit
- Example: `feat: add watchlist context with localStorage persistence`

### Follow Existing Patterns
- **New components**: Place in `src/common/` with their own folder, export via `src/common/index.ts`
- **New pages**: Place in `src/pages/` with folder structure, lazy-load in `App.tsx`
- **New context**: Follow the pattern in `globalContext.tsx` - create provider + custom hook
- **New hooks**: Place in `src/hooks/` with `use` prefix
- **Styling**: Use Tailwind utility classes, follow existing responsive breakpoints

### Code Quality
- Run TypeScript checks: `npm run build` includes `tsc`
- Follow existing naming conventions (PascalCase for components, camelCase for functions)
- Use the `@/` path alias for imports from `src/`
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
