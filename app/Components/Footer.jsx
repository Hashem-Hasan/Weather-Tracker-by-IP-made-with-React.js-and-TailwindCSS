import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1d1d1d]  shadow absolute bottom-0 w-full z-10">
      <div className="w-full p-4 md:flex md:flex-col md:items-center md:justify-center">
        
          <h1 className='text-sm text-center'>© 2024 SkyScan Weather Tracker™. Powered by <a href='https://www.hashem.top/' className=" hover:font-extrabold transition-all">Hashem.top</a></h1>
          <h1 className='bold text-center'>All Rights Reserved.</h1>  
      </div>
    </footer>
  );
};

export default Footer;
