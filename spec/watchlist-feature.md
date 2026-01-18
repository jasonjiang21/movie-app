# Watchlist Feature Specification

## Overview

Add a watchlist feature that allows users to save their favorite movies and TV shows for later viewing. The watchlist persists across browser sessions using localStorage.

---

## Requirements

### Functional Requirements

1. **Add to Watchlist**
   - Users can add any movie or TV show to their watchlist
   - Add button appears on movie cards (hover state) and detail pages
   - Visual feedback when item is added (button state change)

2. **Remove from Watchlist**
   - Users can remove items from their watchlist
   - Remove option available on movie cards, detail pages, and watchlist page
   - Confirmation not required (simple toggle behavior)

3. **View Watchlist**
   - Dedicated watchlist page showing all saved items
   - Display movie poster, title, and rating
   - Separate sections for Movies and TV Shows
   - Empty state when no items saved

4. **Persistence**
   - Watchlist persists across browser sessions (localStorage)
   - Data loads on app initialization

5. **Visual Indicators**
   - Clear visual distinction for items already in watchlist
   - Watchlist icon in header showing item count (badge)

### Non-Functional Requirements

- No authentication required (local-only storage)
- Fast add/remove operations (instant UI feedback)
- Works offline for viewing saved list (actual movie data requires API)

---

## Design Approach

### Data Structure

```typescript
interface WatchlistItem {
  id: number;
  title: string;           // movie: title, tv: name
  poster_path: string;
  vote_average: number;
  category: 'movie' | 'tv';
  added_at: number;        // timestamp for sorting
}

interface WatchlistState {
  items: WatchlistItem[];
}
```

### localStorage Schema

```
Key: "movie-app-watchlist"
Value: JSON stringified array of WatchlistItem
```

### Component Architecture

```
src/
├── context/
│   └── watchlistContext.tsx    # New: Watchlist state management
├── pages/
│   └── Watchlist/
│       └── index.tsx           # New: Watchlist page
├── common/
│   ├── WatchlistButton/
│   │   └── index.tsx           # New: Reusable add/remove button
│   └── Header/
│       └── index.tsx           # Modified: Add watchlist nav link + badge
└── hooks/
    └── useWatchlist.ts         # New: Hook for watchlist operations
```

### User Flow

1. **Adding an Item:**
   ```
   User hovers on MovieCard → Clicks bookmark icon →
   Item added to context + localStorage → Button changes to "filled" state
   ```

2. **Viewing Watchlist:**
   ```
   User clicks "Watchlist" in header →
   Navigates to /watchlist → Sees saved items in grid
   ```

3. **Removing an Item:**
   ```
   User clicks filled bookmark icon →
   Item removed from context + localStorage → Button changes to "outline" state
   ```

---

## Tech Stack

Uses existing project dependencies (no new packages required):

| Technology | Purpose |
|------------|---------|
| **React Context** | State management (matches existing pattern) |
| **localStorage** | Data persistence |
| **TypeScript** | Type safety for watchlist data |
| **Tailwind CSS** | Styling (consistent with app) |
| **React Router** | New /watchlist route |
| **React Icons** | Bookmark icons (already installed) |
| **Framer Motion** | Animations (already installed) |

---

## Implementation Plan

### Phase 1: Core Infrastructure
**Goal:** Set up context and basic add/remove functionality

1. Create `WatchlistContext` with add/remove/check functions
2. Create `useWatchlist` hook for easy access
3. Add localStorage read/write logic
4. **Test:** Verify items persist after page refresh (check via browser DevTools)

### Phase 2: UI Components
**Goal:** Add watchlist button to movie cards and detail page

1. Create `WatchlistButton` component (toggle icon)
2. Add button to `MovieCard` component (top-right corner)
3. Add button to `Detail` page (next to title)
4. **Test:** Click buttons, verify icon state changes correctly

### Phase 3: Watchlist Page
**Goal:** Create dedicated page to view saved items

1. Create `/watchlist` route in `App.tsx`
2. Create `Watchlist` page component
3. Display items in grid (reuse MovieCard or create WatchlistCard)
4. Add empty state for no items
5. **Test:** Add items, navigate to watchlist, verify they appear

### Phase 4: Navigation & Polish
**Goal:** Header integration and final touches

1. Add "Watchlist" link to Header and Sidebar navigation
2. Add badge showing item count
3. Add animations for add/remove actions
4. **Test:** Full user flow from browsing to saving to viewing watchlist

---

## File Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| `src/context/watchlistContext.tsx` | New | Watchlist state management |
| `src/hooks/useWatchlist.ts` | New | Watchlist hook |
| `src/pages/Watchlist/index.tsx` | New | Watchlist page |
| `src/common/WatchlistButton/index.tsx` | New | Toggle button component |
| `src/common/MovieCard/index.tsx` | Modified | Add WatchlistButton |
| `src/pages/Detail/index.tsx` | Modified | Add WatchlistButton |
| `src/common/Header/index.tsx` | Modified | Add nav link + badge |
| `src/common/SideBar/index.tsx` | Modified | Add nav link |
| `src/constants/index.ts` | Modified | Add watchlist nav item |
| `src/App.tsx` | Modified | Add /watchlist route |

---

## API Considerations

- No backend API needed (localStorage only)
- When viewing watchlist, we store minimal data to avoid stale info
- "View Details" links to existing detail page which fetches fresh data from TMDB

---

## Future Enhancements (Out of Scope)

- Cloud sync with user accounts
- Multiple watchlists (e.g., "Watch Later", "Favorites")
- Sorting/filtering options
- Export/import watchlist
- Share watchlist with others
