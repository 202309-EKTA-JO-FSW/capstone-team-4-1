import Navbar from "./components/navbar/navbar";
import Footer from "../../components/footer/Footer";

export default function CustomerSignup() {
  return (
    <div className="relative bg-[#101B0B] overflow-hidden text-black">
        <Navbar />

        <div className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]">

          <img className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
          xl:mt-10 xl:pt-10 md:mt-8 md:pt-4 mt-4 pt-5
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
             src="/customerSignupBackground.png" alt="gifwelcome" />

          <div className="relative w-full  flex items-center justify-center z-10 
            xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px]">

            <h1 className="font-bold text-white text-left
              xl:text-4xl lg:text-2xl md:text-lg sm:text-md text-sm
               ">
                Join us today for a world of flavors delivered right <br />to your doorstep!</h1>
          </div>

        </div>

        <svg className="z-0 relative xl:-mt-16 lg:-mt-8 md:-mt-6 sm:-mt-4 2xs:-mt-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
        <path 
            fill="#101B0B" 
            fillOpacity="1" 
            d="M0,40L60,40C120,40,240,40,360,36C480,32,600,24,720,28C840,32,960,64,1080,68C1200,72,1320,64,1380,62L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
            transform="rotate(180 720 40)"
        ></path>
        </svg>

        <div className="mt-10 pt-10"></div>
        <div className="flex justify-center items-center mt-10 pt-10 mr-10 pr-10 -ml-10 -pl-10">
        <div className="flex absolute z-20 items-center justify-center p-4 mr-10 pr-10 -ml-10 -pl-10">
                <form className="relative mx-auto border w-full max-w-lg shadow-lg rounded-3xl bg-white p-6
                xl:w-[650px] xl:h-auto xl:rounded-3xl xl:shadow-lg
                md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm
                2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs
                ">
                <div className="text-center">
                    <h2 className="text-3xl font-medium text-black mb-10">Create Account</h2>
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="password"
                    id="password2"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    +962 <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="770000000"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-[412px] focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="text"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="text"
                    id="nationalID"
                    name="nationalID"
                    placeholder="National ID"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <input
                    type="text"
                    id="license"
                    name="license"
                    placeholder="License"
                    required
                    className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                    <button
                    type="submit"
                    className="mt-4 bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black font-medium w-full rounded-md px-4 py-2"
                    >
                    Open Account
                    </button>
                </div>
                </form>
            </div>
            </div>
            <div className="grid grid-cols-3 bg-[#101B0B] w-full -mt-10 -mb-10">
                {/* Two empty divs for the first two columns */}
                <div></div>
                <div></div>
                
                <div className="flex justify-center items-center relative ">
                    <p className="text-white text-right p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    </p>
                </div>
            </div>


      <Footer />
    </div>
  );
}