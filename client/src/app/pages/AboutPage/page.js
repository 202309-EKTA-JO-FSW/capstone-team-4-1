import React from 'react';
import Footer from '@/app/components/footer/footer';


const AboutPage = () => {
  return (
      <div className="relative bg-[#fff] overflow-hidden text-black">
      <div
        className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
      >
        <img
          className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
          src="/aboutUsBg.png"
          alt="gifwelcome"
        />

          <div className="flex absolute bottom-0 mb-4 w-full justify-center z-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon className="text-white w-6 h-6 mx-2" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon className="text-white w-6 h-6 mx-2" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon className="text-white w-6 h-6 mx-2" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedInIcon className="text-white w-6 h-6 mx-2" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YouTubeIcon className="text-white w-6 h-6 mx-2" /></a>
          </div>

        <div className="xl:mt-[2rem] xl:ml-[4rem]">
          <img className="absolute xl:w-[200px] xl:h-auto" 
          src="/logo.png"
          alt=""
          />
        </div>

        <div
          className="absolute w-full  flex items-center justify-center z-10 
            xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px]"
        >
          <h1
            className="font-bold text-white text-center
              xl:text-6xl lg:text-4xl md:text-xl sm:text-lg text-md
               xl:pt-10 lg:pt-4 sm:pt-2 pt-4 xl:mt-10 lg:mt-10 sm:mt-6 mt-4
               xl:px-[10rem]
               "
          >
          Our vision is easy citywide access to Jordan's best dining
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
      <Footer />
      </div>
  )
}

export default AboutPage;
