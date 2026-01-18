import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";

import Image from "@/common/Image";
import { WatchlistItem } from "@/context/watchlistContext";
import { useWatchlist } from "@/context/watchlistContext";

interface WatchlistCardProps {
  item: WatchlistItem;
}

const WatchlistCard = ({ item }: WatchlistCardProps) => {
  const { removeItem } = useWatchlist();
  const { id, title, poster_path, vote_average, category } = item;

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(id, category);
  };

  return (
    <div className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]">
      <Link
        to={`/${category}/${id}`}
        className="dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden"
      >
        <Image
          height={250}
          width={170}
          src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title}
          className="object-cover rounded-lg drop-shadow-md shadow-md w-full h-full"
          effect="zoomIn"
        />

        <div className="absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 bg-[rgba(0,0,0,0.6)] transition-all duration-300 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-medium">View Details</span>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove from watchlist"
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-primary bg-white/90 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <BsHeartFill />
        </button>

        {vote_average > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {vote_average.toFixed(1)}
          </div>
        )}
      </Link>

      <h4 className="dark:text-gray-300 text-center cursor-default sm:text-base xs:text-[14.75px] text-[14px] font-medium">
        {title.length > 50 ? title.split(":")[0] : title}
      </h4>
    </div>
  );
};

export default WatchlistCard;
