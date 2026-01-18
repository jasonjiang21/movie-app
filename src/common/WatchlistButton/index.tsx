import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useWatchlist } from "@/context/watchlistContext";
import { cn } from "@/utils/helper";

interface WatchlistButtonProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  category: "movie" | "tv";
  className?: string;
  size?: "sm" | "md";
}

const WatchlistButton = ({
  id,
  title,
  poster_path,
  vote_average,
  category,
  className,
  size = "sm",
}: WatchlistButtonProps) => {
  const { addItem, removeItem, isInWatchlist } = useWatchlist();
  const isAdded = isInWatchlist(id, category);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdded) {
      removeItem(id, category);
    } else {
      addItem({ id, title, poster_path, vote_average, category });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isAdded ? "Remove from watchlist" : "Add to watchlist"}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200",
        "hover:scale-110 active:scale-95",
        size === "sm" && "w-8 h-8 text-[16px]",
        size === "md" && "w-10 h-10 text-[20px]",
        isAdded
          ? "text-primary bg-white/90 dark:bg-black/70"
          : "text-white bg-black/50 hover:bg-black/70",
        className
      )}
    >
      {isAdded ? <BsHeartFill /> : <BsHeart />}
    </button>
  );
};

export default WatchlistButton;
