import { useFetch } from "../../data/useFetch";
import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import WatchlistContext from "../../context/watchlist/watchlistContext";

const API_KEY = "54ad1ace";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

const MovieCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const [watchlistText, setWatchlistText] = useState("Add to Watchlist");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setWatchlistText("Add to Watchlist");
    setOpen(false);
  };
  const { title } = props;
  //console.log(title);
  //context
  const watchlistContext = useContext(WatchlistContext);
  const { addWatchlist } = watchlistContext;

  let url = "https://www.omdbapi.com/?apikey=" + API_KEY;

  if (open) {
    url += "&t=" + title;
  }
  const { loading, data } = useFetch(url);
  console.log(data);

  const onSubmit = (e) => {
    e.preventDefault();
    setWatchlistText("Added to Watchlist");
    !loading &&
      addWatchlist({
        i: data.imdbRating,
        poster: data.Poster,
        plot: data.Plot,
        actors: data.Actors,
        t: data.Title,
        year: data.Released,
      });
  };
  return (
    <div>
      <div
        className='m-10 py-1 flex flex-col justify-center sm:py-4 '
        onClick={handleOpen}>
        <div className='py-3 sm:max-w-xl sm:mx-auto'>
          <div className='hover:-translate-y-2 transition ease-in-out duration-500 hover:shadow-2xl bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
            <div className='h-48 overflow-visible w-1/2'>
              <img
                className='rounded-3xl shadow-lg'
                src={props.imgUrl}
                alt=''
              />
            </div>
            <div className='flex flex-col w-1/2 space-y-4'>
              <div className='flex justify-between items-start'>
                <h2 className='text-3xl font-bold'>{props.title}</h2>
              </div>
              <div>
                <div className='text-sm text-gray-400'>{props.type}</div>
                <div className='text-lg text-gray-800'>{props.year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div
            className='w-96 overflow-hidden rounded-xl relative transform shadow-lg hover:shadow-2xl movie-item text-white movie-card'
            data-movie-id={438631}>
            <div className='absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent' />
            <div className='relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info'>
              <div className='poster__info align-self-end w-full'>
                <div className='h-32' />
                <div className='space-y-6 detail_info'>
                  <div className='flex flex-col space-y-2 inner'>
                    <h3
                      className='text-2xl font-bold text-white'
                      data-unsp-sanitized='clean'>
                      {data.Title}
                    </h3>
                    <div className='mb-0 text-lg text-gray-400'>
                      {data.Genre}
                    </div>
                  </div>
                  <div className='flex flex-row justify-between datos'>
                    <div className='flex flex-col datos_col'>
                      <div className='popularity'>{data.imdbRating}</div>
                      <div className='text-sm text-gray-400'>IMDb Rating:</div>
                    </div>
                    <div className='flex flex-col datos_col'>
                      <div className='release'>{data.Released}</div>
                      <div className='text-sm text-gray-400'>Release date:</div>
                    </div>
                    <div className='flex flex-col datos_col'>
                      <div className='release'>{data.Runtime}</div>
                      <div className='text-sm text-gray-400'>Runtime:</div>
                    </div>
                  </div>

                  <div className='flex flex-col overview'>
                    <div className='flex flex-col' />
                    <div className='text-xs text-gray-400 mb-2'>Actors:</div>
                    <p className='text-xs text-gray-100'>{data.Actors}</p>
                  </div>
                  <div className='flex flex-col overview'>
                    <div className='flex flex-col' />
                    <div className='text-xs text-gray-400 mb-2'>Overview:</div>
                    <p className='text-xs text-gray-100 mb-8'>{data.Plot}</p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className='absolute inset-0 transform w-full -translate-y-4'
              src={data.Poster}
              style={{ filter: "grayscale(0)" }}
            />
            <div className='poster__footer flex flex-row relative pb-10 space-x-4 z-10 mr-5'>
              <a
                className='flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700'
                data-unsp-sanitized='clean'>
                <svg
                  className='h-6 w-6 fill-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 640 512'>
                  <path d='M75.23 33.4L320 63.1L564.8 33.4C571.5 32.56 578 36.06 581.1 42.12L622.8 125.5C631.7 143.4 622.2 165.1 602.9 170.6L439.6 217.3C425.7 221.2 410.8 215.4 403.4 202.1L320 63.1L236.6 202.1C229.2 215.4 214.3 221.2 200.4 217.3L37.07 170.6C17.81 165.1 8.283 143.4 17.24 125.5L58.94 42.12C61.97 36.06 68.5 32.56 75.23 33.4H75.23zM321.1 128L375.9 219.4C390.8 244.2 420.5 255.1 448.4 248L576 211.6V378.5C576 400.5 561 419.7 539.6 425.1L335.5 476.1C325.3 478.7 314.7 478.7 304.5 476.1L100.4 425.1C78.99 419.7 64 400.5 64 378.5V211.6L191.6 248C219.5 255.1 249.2 244.2 264.1 219.4L318.9 128H321.1z' />
                </svg>
                <div className='text-sm text-white ml-2' onClick={onSubmit}>
                  {watchlistText}
                </div>
              </a>
             
            </div>
          </div>
        </Box>
      </Modal>
      
    </div>
  );
};

export default MovieCard;
