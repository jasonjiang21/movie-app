import { Link } from "react-router-dom";
import { BsHeartbreak } from "react-icons/bs";
import { m } from "framer-motion";

import { useWatchlist, WatchlistItem } from "@/context/watchlistContext";
import { useMotion } from "@/hooks/useMotion";
import { smallMaxWidth, mainHeading } from "@/styles";
import { cn } from "@/utils/helper";
import WatchlistCard from "./WatchlistCard";

const Watchlist = () => {
  const { items } = useWatchlist();
  const { fadeDown, staggerContainer } = useMotion();

  const movies = items.filter((item) => item.category === "movie");
  const tvShows = items.filter((item) => item.category === "tv");

  return (
    <section className="min-h-screen pt-24 pb-8">
      <div className={smallMaxWidth}>
        <m.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="show"
        >
          <m.h1
            variants={fadeDown}
            className={cn(mainHeading, "mb-8 text-center mx-auto")}
          >
            My Watchlist
          </m.h1>

          {items.length === 0 ? (
            <m.div
              variants={fadeDown}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <BsHeartbreak className="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Your watchlist is empty
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                Start adding movies and TV shows to keep track of what you want to watch
              </p>
              <Link
                to="/"
                className="px-6 py-2 bg-primary text-white rounded-full hover:-translate-y-1 transition-all duration-300"
              >
                Browse Movies
              </Link>
            </m.div>
          ) : (
            <>
              {movies.length > 0 && (
                <m.div variants={fadeDown} className="mb-10">
                  <h2 className="text-xl font-bold dark:text-gray-200 text-gray-800 mb-4">
                    Movies ({movies.length})
                  </h2>
                  <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center sm:justify-start">
                    {movies.map((item: WatchlistItem) => (
                      <WatchlistCard key={`movie-${item.id}`} item={item} />
                    ))}
                  </div>
                </m.div>
              )}

              {tvShows.length > 0 && (
                <m.div variants={fadeDown}>
                  <h2 className="text-xl font-bold dark:text-gray-200 text-gray-800 mb-4">
                    TV Shows ({tvShows.length})
                  </h2>
                  <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center sm:justify-start">
                    {tvShows.map((item: WatchlistItem) => (
                      <WatchlistCard key={`tv-${item.id}`} item={item} />
                    ))}
                  </div>
                </m.div>
              )}
            </>
          )}
        </m.div>
      </div>
    </section>
  );
};

export default Watchlist;
