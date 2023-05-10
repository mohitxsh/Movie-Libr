import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import Search from "../components/homeCompo/Search";
import { Link } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const { logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const userName = <div>Hello, {user && user.name}.</div>;

  return (
    <>
      <section className="w-screen text-blueGray-700 bg-gradient-to-b from-blue-100 to-[#F3F4F6]">
        <div className="container flex flex-col items-start px-5 pt-16 mx-auto  md:flex-row lg:px-28">
          <div className="flex flex-col items-start w-full pt-0 mb-16 text-left  lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0">
            <h1 className="mb-4 text-2xl font-black tracking-tighter text-black  md:text-5xl title-font">
              {" "}
              {userName}
              <div className="text-gray-400">Welcome back!</div>
            </h1>
            <p className="mb-8 lg:text-base text-sm leading-relaxed text-left text-gray-500">
              {" "}
              Discover epic movies. Create your own lists. Share with your
              friends. It's all here!{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Link to="/Playlist">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-cyan-500 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Playlist
              </button>
            </Link>
            <button
              onClick={onLogout}
              type="button"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
      <Search />
    </>
  );
};

export default Home;
