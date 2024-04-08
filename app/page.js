import Navbar from "./Components/Navbar";
import Weather from "./Components/Weather.jsx";
import Footer from "./Components/Footer";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Image src={'/bg1.avif'} alt='bg' layout="fill" objectFit="cover" className='absolute z-0'/>
      <main className="flex flex-col justify-center items-center min-h-screen bg-white">
        <Navbar />
        <Weather />
        <Footer />
      </main>
    </div>
  );
}
