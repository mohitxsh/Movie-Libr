import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  const { name, email, password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login({
      name,
      email,
      password,
    });
  };
  return (
    <>
      <header className='relative flex items-center justify-center h-screen mb-12 overflow-hidden'>
        <div className='relative z-30 p-5 text-2xl text-white bg-white bg-opacity-20 rounded-xl backdrop-blur-lg'>
          <div className='flex items-center justify-center'>
            <div className='w-full max-w-md'>
              <form className='bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4'>
                {/* @csrf */}
                <div className='text-gray-600 font-medium text-2xl flex justify-center py-2 mb-4'>
                  Login to discover epic movies
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-normal mb-2'
                    htmlFor='username'>
                    Email
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline'
                    name='email'
                    v-model='form.email'
                    type='email'
                    required
                    placeholder='johndoe@email.com'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    className='block text-gray-700 text-sm font-normal mb-2'
                    htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    v-model='form.password'
                    type='password'
                    placeholder='••••••••'
                    name='password'
                    required
                    autoComplete='current-password'
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className='mt-0 mb-5'>
                  <button
                    onClick={onSubmit}
                    className='bg-blue-500 w-full py-3 rounded-xl text-white text-sm shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
                    Login
                  </button>
                </div>
                <div className='text-sm font-medium text-gray-500 '>
                  Not registered?{" "}
                  <a
                    href='/register'
                    className='text-blue-700 hover:underline dark:text-blue-500'>
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <video
          autoPlay
          loop
          muted
          className='absolute z-10 w-auto min-w-full min-h-full max-w-none'>
          <source
            src='https://media-us-westslateappcom.s3.us-west-1.amazonaws.com/madcowfilms/production/clips/514ebae1-ebbb-4477-addd-d52a30cd28c1-1280x720.2500.webm'
            type='video/mp4'
          />
          Your browser does not support the video tag.
        </video>
      </header>
    </>
  );
};

export default Login;
