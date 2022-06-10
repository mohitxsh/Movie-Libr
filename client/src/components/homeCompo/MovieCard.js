import { useFetch } from "../../data/useFetch";
import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import WatchlistContext from "../../context/watchlist/watchlistContext";
import PlaylistContext from "../../context/playlist/playlistContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const [playlistText, setPlaylistText] = React.useState("");
  const onChangePlaylistText = (e) => {
    setPlaylistText(e.target.value);
  };
  console.log(playlistText);
  const [watchlistText, setWatchlistText] = useState("Add to Watchlist");
  const [playlistNameText, setPlaylistNameText] = useState("Add to Playlist");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setWatchlistText("Add to Watchlist");
    setOpen(false);
  };
  const [playlistopen, setPlaylistopen] = React.useState(false);
  const handlePlaylistOpen = () => setPlaylistopen(true);
  const handlePlaylistClose = () => setPlaylistopen(false);

  const { title } = props;
  //console.log(title);
  //context
  const watchlistContext = useContext(WatchlistContext);
  const { addWatchlist } = watchlistContext;

  const playlistContext = useContext(PlaylistContext);
  const { addPlaylist } = playlistContext;

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
  const [checked, setChecked] = React.useState(true);
  const handleChecked = () => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  const onPlaylistSubmit = (e) => {
    e.preventDefault();
    setPlaylistNameText("Added to Playlist");
    addPlaylist({
      name: playlistText,
      private: checked,
      movieid: [
        {
          imdbID: data.imdbID,
          title: data.Title,
          poster: data.Poster,
          imdbRating: data.imdbRating,
          runtime: data.Runtime,
          actors: data.Actors,
          release: data.Released,
        },
      ],
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
            <div className='poster__footer flex flex-row relative pb-10 space-x-4 z-10 mr-3'>
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
              <a
                className='flex items-center py-2 px-4 rounded-full mx-auto text-white bg-blue-500 hover:bg-blue-700'
                data-unsp-sanitized='clean'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 640 512'
                  className='h-6 w-6 fill-white'>
                  <path d='M352 432c0 8.836-7.164 16-16 16H176c-8.838 0-16-7.164-16-16L160 128H48C21.49 128 .0003 149.5 .0003 176v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48L512 384h-160L352 432zM104 439c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V439zM104 335c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V335zM104 231c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30C56 196 60.03 192 65 192h30c4.969 0 9 4.031 9 9V231zM408 409c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9v30c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9V409zM591.1 0H239.1C213.5 0 191.1 21.49 191.1 48v256c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-256C640 21.49 618.5 0 591.1 0zM303.1 64c17.68 0 32 14.33 32 32s-14.32 32-32 32C286.3 128 271.1 113.7 271.1 96S286.3 64 303.1 64zM574.1 279.6C571.3 284.8 565.9 288 560 288H271.1C265.1 288 260.5 284.6 257.7 279.3C255 273.9 255.5 267.4 259.1 262.6l70-96C332.1 162.4 336.9 160 341.1 160c5.11 0 9.914 2.441 12.93 6.574l22.35 30.66l62.74-94.11C442.1 98.67 447.1 96 453.3 96c5.348 0 10.34 2.672 13.31 7.125l106.7 160C576.6 268 576.9 274.3 574.1 279.6z' />
                </svg>
                <div
                  className='text-sm text-white ml-2'
                  onClick={handlePlaylistOpen}>
                  Add to Playlist
                </div>
              </a>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={playlistopen}
        onClose={handlePlaylistClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl'>
            <h4 className='w-full text-4xl font-medium leading-snug'>
              Create Playlist
            </h4>
            <div
              class='mt-4 bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700'
              role='alert'>
              Type an existing playlist name to add this movie to an existing
              playlist or type a new name to create a new playlist
            </div>
            <form className='relative w-full mt-6 space-y-8'>
              <div className='relative'>
                <label className='absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white'>
                  Playlist Name
                </label>
                <input
                  type='text'
                  className='block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black'
                  placeholder='Can be anything'
                  onChange={onChangePlaylistText}
                  value={playlistText}
                />
              </div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={checked} />}
                  label='Private'
                  onClick={handleChecked}
                />
              </FormGroup>
              <div className='relative'>
                <button
                  className='inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease'
                  onClick={onPlaylistSubmit}>
                  {playlistNameText}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieCard;
