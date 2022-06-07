import { useFetch } from "../../data/useFetch";
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
const API_KEY = "54ad1ace";

const Search = (props) => {
  const [term, setTerm] = useState("");
  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };
  let url = "https://www.omdbapi.com/?apikey=" + API_KEY;

  let isSearch = false;

  if (term !== "") {
    url += "&s=" + term;
    isSearch = true;
  } else {
    isSearch = false;
  }

  const { data } = useFetch(url);

const renderedResults = data['Search']?.map((d) => {
  return(
    <MovieCard key = {d.imdbID} imgUrl = {d.Poster} title = {d.Title} type = {d.Type} year = {d.Year} />
  );
})

  return (
    <div>
      <div className=' flex flex-col justify-center'>
        <div className='relative p-1 w-full sm:max-w-2xl sm:mx-auto'>
          <div className='overflow-hidden z-0 rounded-full relative p-3'>
            <form className='relative flex z-50 bg-white rounded-full'>
              <input
                type='text'
                placeholder='enter your search here'
                className='rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none'
                value={term}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </form>
            <div className='glow glow-1 z-10 bg-pink-400 absolute' />
            <div className='glow glow-2 z-20 bg-purple-400 absolute' />
            <div className='glow glow-3 z-30 bg-yellow-400 absolute' />
            <div className='glow glow-4 z-40 bg-blue-400 absolute' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;
