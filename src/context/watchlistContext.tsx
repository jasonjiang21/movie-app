import React, { useCallback, useContext, useState, useEffect } from "react";

export interface WatchlistItem {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  category: "movie" | "tv";
  added_at: number;
}

interface WatchlistContextType {
  items: WatchlistItem[];
  addItem: (item: Omit<WatchlistItem, "added_at">) => void;
  removeItem: (id: number, category: "movie" | "tv") => void;
  isInWatchlist: (id: number, category: "movie" | "tv") => boolean;
  itemCount: number;
}

const STORAGE_KEY = "movie-app-watchlist";

const getStoredWatchlist = (): WatchlistItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveWatchlist = (items: WatchlistItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const context = React.createContext<WatchlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  isInWatchlist: () => false,
  itemCount: 0,
});

interface Props {
  children: React.ReactNode;
}

const WatchlistProvider = ({ children }: Props) => {
  const [items, setItems] = useState<WatchlistItem[]>(() => getStoredWatchlist());

  useEffect(() => {
    saveWatchlist(items);
  }, [items]);

  const addItem = useCallback((item: Omit<WatchlistItem, "added_at">) => {
    setItems((prev) => {
      const exists = prev.some(
        (i) => i.id === item.id && i.category === item.category
      );
      if (exists) return prev;
      return [...prev, { ...item, added_at: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((id: number, category: "movie" | "tv") => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.category === category))
    );
  }, []);

  const isInWatchlist = useCallback(
    (id: number, category: "movie" | "tv") => {
      return items.some((item) => item.id === id && item.category === category);
    },
    [items]
  );

  return (
    <context.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWatchlist,
        itemCount: items.length,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
