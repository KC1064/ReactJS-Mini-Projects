
import React from 'react';
// import loaderGIF from 'src/assets/loaderGIF.gif'; 
import loaderGIF from './assets/loaderGIF.gif'; 


const Loader = () => {
  return <img src={loaderGIF} alt="Loading..." className='h-[300px] w-[300px]'/>;
};

export default Loader;
