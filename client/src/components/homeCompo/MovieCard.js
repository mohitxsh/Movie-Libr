import { useFetch } from "../../data/useFetch";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { title } = props;
  //console.log(title);

  let url = "https://www.omdbapi.com/?apikey=" + API_KEY;

  if (open) {
    url += "&t=" + title;
  
  }
  const { data } = useFetch(url);
  console.log(data);
  return (
    <div>
      <div
        className=' py-1 flex flex-col justify-center sm:py-4 '
        onClick={handleOpen}>
        <div className='py-3 sm:max-w-xl sm:mx-auto'>
          <div className='bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
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
              <p className=' text-gray-400 max-h-40 overflow-y-hidden'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className='flex text-2xl font-bold text-a'>$83.90</div>
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
            className='w-96 overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card'
            data-movie-id={438631}>
            <div className='absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent' />
            <div
              className='relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info'
              data-lity=''
              href='https://www.youtube.com/embed/aSHs224Dge0'>
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
                    <p className='text-xs text-gray-100'>
                      {data.Actors}
                    </p>
                  </div>
                  <div className='flex flex-col overview'>
                    <div className='flex flex-col' />
                    <div className='text-xs text-gray-400 mb-2'>Overview:</div>
                    <p className='text-xs text-gray-100 mb-8'>
                      {data.Plot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className='absolute inset-0 transform w-full -translate-y-4'
              src={data.Poster}
              style={{ filter: "grayscale(0)" }}
            />
            <div className='poster__footer flex flex-row relative pb-10 space-x-4 z-10'>
              <a
                className='flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700'
                href='http://www.google.com/calendar/event?action=TEMPLATE&dates=20210915T010000Z%2F20210915T010000Z&text=Dune%20%2D%20Movie%20Premiere&location=http%3A%2F%2Fmoviedates.info&details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info'
                target='_blank'
                data-unsp-sanitized='clean'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <div className='text-sm text-white ml-2'>Add to list</div>
              </a>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieCard;
