import React, { useContext, useEffect } from "react";
import WatchlistContext from "../../context/watchlist/watchlistContext";

function WatchlistCard() {
  const watchlistContext = useContext(WatchlistContext);
  const { watchlist, getWatchlist } = watchlistContext;
  useEffect(() => {
    getWatchlist();
  }, []);
  const renderedResults = watchlist.map((w) => {
    return (
      <div>
        <div className=' py-1 flex flex-col justify-center sm:py-4 '>
          <div className='py-3 sm:max-w-xl sm:mx-auto'>
            <div className='hover:-translate-y-2 transition ease-in-out duration-500 hover:shadow-2xl bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
              <div className='h-48 overflow-visible w-1/2'>
                <img className='rounded-3xl shadow-lg' src={w.poster} alt='' />
              </div>
              <div className='flex flex-col w-1/2 space-y-4'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-3xl font-bold'>{w.t}</h2>
                </div>
                <div>
                  <div className='text-sm text-gray-400'>Movie</div>
                  <div className='text-lg text-gray-800'>{w.year}</div>
                </div>
                <p className=' text-gray-400 max-h-40 overflow-y-hidden'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className='flex text-2xl font-bold text-a'>$83.90</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{renderedResults}</div>;
}

export default WatchlistCard;
