import React, { useContext, useLayoutEffect } from "react";
import WatchlistContext from "../../context/watchlist/watchlistContext";

function WatchlistCard() {
  const watchlistContext = useContext(WatchlistContext);
  const { watchlist, getWatchlist, deleteWatchlist } = watchlistContext;

  useLayoutEffect(() => {
    getWatchlist();
  });

  const onDelete = (e) => {
    console.log(e);
    deleteWatchlist(watchlist[e.target.getAttribute("data-id")]._id);
  };

  const renderedResults = watchlist.map((w, index) => {
    return (
      <div>
        <div className=' py-1 flex flex-col justify-center sm:py-4'>
          <div className='py-3 sm:max-w-xl sm:mx-auto'>
            <div className='hover:-translate-y-2 transition ease-in-out duration-500 hover:shadow-2xl bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
              <div className='h-42 overflow-visible w-1/2'>
                <img
                  className='rounded-3xl shadow-lg'
                  src={w.poster}
                  alt='movie poster'
                />
              </div>
              <div className='flex flex-col w-1/2  space-y-4'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-3xl font-bold'>{w.t}</h2>
                </div>
                <div>
                  <div className='text-sm text-gray-400'>{w.actors}</div>
                  <div className='text-lg text-gray-800'>{w.year}</div>
                </div>
                <p className=' text-gray-400 max-h-40 overflow-y-hidden'>
                  {w.plot}
                </p>
                <div className='flex text-2xl font-bold text-a'>
                  IMDb Rating: {w.i}
                </div>
                <div className='flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700'>
                  <div
                    className='text-sm text-white ml-2'
                    onClick={onDelete}
                    data-id={index}>
                    Delete from Watchlist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {watchlist.length ? renderedResults : <div className="mb-8 lg:text-base text-sm leading-relaxed text-left text-gray-500 flex flex-row justify-center items-center">No watchlist to show!</div>}
    </div>
  );
}

export default WatchlistCard;
