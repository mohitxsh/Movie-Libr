import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import MovieCard from "../components/homeCompo/MovieCard";
import Search from "../components/homeCompo/Search";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  const { isAuthenticated, logout, user } = authContext;
  const onLogout = () => {
    logout();
  };
  const userName = <div>Hello, {user && user.name}.</div>;
  return (
    <>
      <section className='text-blueGray-700 bg-white mt-4'>
        <div className='container flex flex-col items-start px-5 pt-16 mx-auto  md:flex-row lg:px-28'>
          <div className='flex flex-col items-start w-full pt-0 mb-16 text-left  lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0'>
            <h1 className='mb-4 text-2xl font-black tracking-tighter text-black  md:text-5xl title-font'>
              {" "}
              {userName}
              <div className='text-gray-400'>Welcome back!</div>
            </h1>
            <p className='mb-8 lg:text-base text-sm leading-relaxed text-left text-gray-500'>
              {" "}
              Discover epic movies. Create your own lists. Share with your
              friends. It's all here!{" "}
            </p>
          </div>
          <button
            onClick={onLogout}
            type='button'
            className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
            Logout
          </button>
        </div>
      </section>
      <Search />
    </>
  );
};

export default Home;
