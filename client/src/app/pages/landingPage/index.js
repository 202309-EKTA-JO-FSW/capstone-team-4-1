import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="relative bg-[#fff] overflow-hidden text-black">
      <div
        className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
      >
        <img
          className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
          xl:mt-10 xl:pt-10 md:mt-8 md:pt-4 mt-4 pt-5
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
          src="/backgroundwelcome.png"
          alt="gifwelcome"
        />

        <div
          className="absolute w-full  flex items-center justify-center z-10 
            xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px]"
        >
          <h1
            className="font-bold text-white text-center
              xl:text-6xl lg:text-4xl md:text-xl sm:text-lg text-md
               xl:pt-10 lg:pt-4 sm:pt-2 pt-4 xl:mt-10 lg:mt-10 sm:mt-6 mt-4"
          >
            Order food online in Jordan
          </h1>
        </div>
      </div>

      <svg
        className="relative xl:-mt-12 lg:-mt-8 md:-mt-6 sm:-mt-4 2xs:-mt-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,40L60,43.3C120,47,240,53,360,53.3C480,53,600,43,720,36.7C840,31,960,29,1080,36.7C1200,43,1320,57,1380,62.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
        ></path>
      </svg>

      <div className="flex items-center justify-center">
        <h1
          className="font-bold text-black text-center
              xl:text-4xl xl:pt-10
              md:text-2xl md:pt-8
              sm:text-xl sm:pt-6
              2xs:text-lg 2xs:pt-4
              "
        >
          Let's do it together
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <h1
          className="font-bold text-black text-center
               xl:text-2xl xl:pt-2
               md:text-xl md:pt-1
               sm:text-lg sm:pt-1
               2xs:text-sm 2xs:pt-1
               "
        >
          Join us!
        </h1>
      </div>

      <div
        className="flex justify-center text-black text-center
         xl:space-x-10 xl:mt-5 xl:mb-10
         md:space-x-8 md:mt-4 md:mb-8
         sm:space-x-6 sm:mt-3 sm:mb-6
         2xs:space-x-2 2xs:mt-1 2xs:mb-2
         "
      >
        <div
          className="font-bold
            xl:py-2 xl:mr-10 xl:pr-10
            md:py-2 md:mr-8 md:pr-8
            sm:py-1 sm:mr-6 sm:pr-6
            2xs:py-1 2xs:mr-2 2xs:pr-2
            "
        >
          <img
            src="/rider.png"
            className="rounded-full mx-auto
              xl:w-60 xl:h-70 xl:pt-10 xl:mb-5
              md:w-[150px] md:h-auto md:pt-8 md:mb-4
              sm:w-[100px] sm:h-auto sm:pt-4 sm:mb-2
              2xs:w-[100px] 2xs:h-auto 2xs:pt-2 2xs:mb-1
              "
            alt="rider"
          />

          <h1
            className="font-bold
              xl:text-xl xl:mb-3
              md:text-lg md:mb-1
              2xs:text-md 2xs:mb-1
              "
          >
            Become a rider
          </h1>

          <p
            className="
              xl:text-sm md:text-[12px] 2xs:text-[6px] 
              xl:mx-10 md:mx-6 2xs:mx-4
              
              "
          >
            Enjoy unmatched, unparalleled flexibility, freedom, <br />
            and highly competitive earnings <br />
            by delivering through FoodDrop today.
          </p>
          <button
            className="bg-[#FFC245] hover:bg-[#B92719] text-black text-center mx-auto rounded-xl font-bold border-transparent hover:border-black
              xl:mt-5 xl:py-2 xl:px-8 xl:border-2 xl:text-md
              md:mt-5 md:py-2 md:px-4 md:border-1 md:text-sm
              2xs:mt-2 2xs:py-1 2xs:px-2 2xs:border-1 2xs:text-[8px]
              "
          >
            Register here
          </button>
        </div>

        <div
          className="font-bold
            xl:py-2 xl:ml-10 xl:pl-10
            md:py-2 md:ml-8 md:pl-8
            sm:py-1 sm:ml-6 sm:pl-6
            2xs:py-1 2xs:ml-2 2xs:pl-2"
        >
          <img
            src="/restaurant.jpg"
            className="rounded-full mx-auto
              xl:w-60 xl:h-70 xl:pt-10 xl:mb-5
              md:w-[150px] md:h-auto md:pt-8 md:mb-4
              sm:w-[100px] sm:h-auto sm:pt-4 sm:mb-2
              2xs:w-[100px] 2xs:h-auto 2xs:pt-2 2xs:mb-1
              "
            alt="restaurnat"
          />

          <h1
            className="font-bold
              xl:text-xl xl:mb-3
              md:text-lg md:mb-1
              2xs:text-md 2xs:mb-1
               "
          >
            Become a partner
          </h1>

          <p
            className="
                xl:text-sm md:text-xs 2xs:text-[6px]
                xl:px-10 md:px-5 2xs:px-2
                break-words
                "
          >
            Grow with FoodDrop! Embrace our cutting-edge <br />
            technology to boost your sales <br />
            and explore new opportunities now!
          </p>

          <button
            className="bg-[#FFC245] hover:bg-[#B92719] text-black text-center mx-auto rounded-xl font-bold border-transparent hover:border-black
              xl:mt-5 xl:py-2 xl:px-8 xl:border-2 xl:text-md
              md:mt-5 md:py-2 md:px-4 md:border-1 md:text-sm
              2xs:mt-2 2xs:py-1 2xs:px-2 2xs:border-1 2xs:text-[8px]
              "
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}
