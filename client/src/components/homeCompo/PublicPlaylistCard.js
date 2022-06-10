import React, { useContext, useLayoutEffect } from "react";
import PlaylistContext from "../../context/playlist/playlistContext";
import { useParams } from "react-router-dom";

function PublicPlaylistCard() {
  const playlistContext = useContext(PlaylistContext);
  const { playlist, getPublicPlaylist } = playlistContext;
  const [playlistData, setPlaylistData] = React.useState([]);
  const { userid } = useParams();
  useLayoutEffect(() => {
    getPublicPlaylist(userid);
  }, []);
  useLayoutEffect(() => {
    setPlaylistData(playlist);
  }, [playlist]);
  console.log("playlistdata");
  console.log(playlistData);
  console.log("playlist");
  console.log(playlist);
  return (
    <div>
      {playlistData.map((p) => {
        if (p.private === true) return <div></div>;
        else
          return (
            <div>
              <div>
                <div className='ml-24 mt-8 flex flex-col items-start w-full pt-0 mb-8 text-left  lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0'>
                  <h1 className='mb-4 text-2xl font-black tracking-tighter text-black  md:text-2xl title-font'>
                    {p.name}{" "}
                  </h1>
                </div>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {p.movieid.map((item) => {
                  return (
                    <div>
                      <div className=' py-1 flex flex-col justify-center sm:py-4 mb-16'>
                        <div className='py-3 sm:max-w-xl sm:mx-auto'>
                          <div className='hover:-translate-y-2 transition ease-in-out duration-500 hover:shadow-2xl bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
                            <div className='h-42 overflow-visible w-1/2'>
                              <img
                                className='rounded-3xl shadow-lg'
                                src={item.poster}
                                alt='movie poster'
                              />
                            </div>
                            <div className='flex flex-col w-1/2  space-y-4'>
                              <div className='flex justify-between items-start'>
                                <h2 className='text-3xl font-bold'>
                                  {item.title}
                                </h2>
                              </div>
                              <div>
                                <div className='text-sm text-gray-400'>
                                  {item.actors}
                                </div>
                                <div className='text-lg text-gray-800'>
                                  {item.release}
                                </div>
                              </div>
                              <div className='flex text-xl font-bold text-a'>
                                IMDb Rating: {item.imdbRating}
                              </div>
                              <div className='flex text-xl font-bold text-a'>
                                Runtime: {item.runtime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
      })}
    </div>
  );
}

export default PublicPlaylistCard;
