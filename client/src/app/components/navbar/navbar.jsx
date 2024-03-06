import Link from 'next/link';
import Customer from "./customer";
import Login from "./login";

function Navbar() {
  return (
      <div className="fixed top-0 left-0 w-full z-10">
        <div className="flex items-center space-x-2 bg-[#101B0B] sticky">
          <img src="/logo.png" className="w-62 h-20 pl-20 pt-10 mb-5" alt="logo" />
          <div className="flex justify-end space-x-8 text-[#FFC245] w-full pr-20 my-5">
            <div className="py-2 px-4 font-bold"><Login /></div>
            <div className="bg-[#FFC245] text-black flex justify-center py-2 px-4 rounded-xl font-bold"><Customer /></div>
            <Link href="/pages/customer/restaurantList">
                Customer
            </Link>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
          <path fill="#101B0B" fillOpacity="1" d="M0,40L60,40C120,40,240,40,360,36C480,32,600,24,720,28C840,32,960,64,1080,68C1200,72,1320,64,1380,62L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
    
    
  );
}

export default Navbar;
