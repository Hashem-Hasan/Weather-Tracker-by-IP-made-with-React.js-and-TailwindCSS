'use client';
import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className='flex flex-row h-20 w-full bg-[#1ed2ff] shadow-lg z-20 fixed left-0 top-0'>
      <div className='flex justify-center items-center h-full w-full'>
        <Image src={'/logo.png'} alt='logo' width={200} height={200} />
      </div>
    </nav>
  );
};

export default Navbar;
