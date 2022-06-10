import React, { useContext } from "react";
import PublicPlaylistCard from "../components/homeCompo/PublicPlaylistCard";

function PublicPlaylist() {
  return (
    <>
      <section className='text-blueGray-700 bg-gradient-to-b from-blue-100 to-[#F3F4F6]'>
        <div className="<div className='container flex flex-col items-start px-5 pt-16 mx-auto  md:flex-row lg:px-28'>">
          <div className='flex flex-col items-start w-full pt-0 mb-16 text-left  lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0'>
            <h1 className='ml-16 mb-4 text-2xl font-black tracking-tighter text-black  md:text-5xl title-font'>
              {" "}
              Public Playlist
            </h1>
          </div>
        </div>
      </section>
      <div>
        <PublicPlaylistCard />
      </div>
    </>
  );
}

export default PublicPlaylist;
