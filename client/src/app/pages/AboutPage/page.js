import React from 'react';
import Footer from '@/app/components/footer/footer';
const AboutPage = () => {
  return (
      <div className="relative bg-[#fff] overflow-hidden text-black">
      <div
        className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px] mb-8"
      >
        <img
          className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px] mb-8"
          src="/aboutUsBg.png"
          alt="gifwelcome"
        />

          <div className="flex flex-row absolute z-20 justify-between px-4 xl:mt-[9rem] xl:ml-[2rem] space-x-4 opacity-70">
            <div>
              <a href="https://www.instagram.com/fooddrop.jo?igsh=dXNha3l2NjZ2bDhh" target="_blank" rel="noopener noreferrer">
              <svg fill="#ffff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"/>
              </svg>
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/profile.php?id=61557403350054&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <svg fill="#ffff" width="20px" height="20px" viewBox="-7 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-facebook"><path d='M2.046 3.865v2.748H.032v3.36h2.014v9.986H6.18V9.974h2.775s.26-1.611.386-3.373H6.197V4.303c0-.343.45-.805.896-.805h2.254V0H6.283c-4.34 0-4.237 3.363-4.237 3.865z' /></svg>
              </a>
            </div>
            <div>
              <a href="mailto:fooddrop.jo@gmail.com" target="_blank" rel="noopener noreferrer">
              <svg fill="#ffff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M19,4 C20.6568542,4 22,5.34314575 22,7 L22,17 C22,18.6568542 20.6568542,20 19,20 L5,20 C3.34314575,20 2,18.6568542 2,17 L2,7 C2,5.34314575 3.34314575,4 5,4 L19,4 Z M20,7.328 L12.6585046,13.7525767 C12.3128975,14.054983 11.8110564,14.0801835 11.4394103,13.8281783 L11.3414954,13.7525767 L4,7.329 L4,17 C4,17.5522847 4.44771525,18 5,18 L19,18 C19.5522847,18 20,17.5522847 20,17 L20,7.328 Z M18.48,6 L5.518,6 L12,11.6712318 L18.48,6 Z"/>
              </svg>
              </a>
            </div>
           
          </div>
          <div className="border-t border-gray-100 mt-[3.5rem] mx-[4rem] obacity-70"></div>


        <div
          className="absolute w-full flex items-center justify-center z-10"
        >
          <h1
            className="font-bold text-white text-center
              xl:text-6xl lg:text-4xl md:text-xl sm:text-lg text-md
               xl:pt-[7rem] lg:pt-4 sm:pt-2 pt-4 xl:mt-10 lg:mt-10 sm:mt-6 mt-4
               xl:px-[10rem]
               "
          >
          Our vision is easy citywide access to Jordan's best dining
          </h1>
        </div>
      </div>

      <svg 
      className="relative xl:-mt-[6rem] lg:-mt-8 md:-mt-6 sm:-mt-4 2xs:-mt-4"
      xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 1440 80">
        <path fill="#ffffff" fillOpacity="1" d="M0,64L120,54.7C240,45,480,27,720,25.3C960,24,1200,40,1320,48L1440,56L1440,80L1320,80C1200,80,960,80,720,80C480,80,240,80,120,80L0,80Z"></path>
      </svg>

      <div className="flex flex-row justify-center mt-[5rem] items-center space-between space-x-[4rem]">
        <div><img src="/teampicture.jpg" alt="teampicture" 
          className="rounded-full w-[250px] h-[250px] shadow-lg"
          />
        </div>
        <div>
          <div>
            <h1 className="font-bold text-2xl text-black text-left mb-3">We are FoodDrop</h1>
          </div>
          <div>
            <h1 className="font-md text-gray-700 text-left text-sm">We're a startup based in Jordan, a tech company<br />at the forefront of innovation. We're dedicated to <br />crafting innovative solutions that bridge the gap <br />between customers, businesses, and delivery services. <br />Our core mission is to achieve rapid growth while<br />ensuring our solutions have a positive, sustainable impact<br />on our local communities and ecosystems.</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-[8rem] items-center space-between space-x-[4rem]">
        <div className="bg-black rounded-full shadow-xl"><img src="/bgAboutGrowing.png" alt="bgAboutGrowing" 
          className=" w-[250px] h-[250px] rounded-full opacity-70"
          />
        </div>
        <div>
          <div>
            <h1 className="font-bold text-2xl text-black text-left mb-3">Our Mission and Values</h1>
          </div>
          <div>
            <h1 className="font-md text-left text-gray-700 text-sm">At FoodDrop, we're more than just a food delivery service.<br /> We are a community of innovators, thinkers, and creators<br />united by a common goal: to revolutionize the way<br />food is delivered. Our mission is to bridge the gap<br />between customers, businesses, and delivery services,<br />creating a seamless,enjoyable food delivery experience<br />for everyone involved.
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-[8rem] space-between space-x-[4rem]">
        <div className="bg-black rounded-full shadow-xl"><img src="/bgFuture.png" alt="bgFuture" 
          className=" w-[250px] h-[250px] rounded-full opacity-70"
          />
        </div>
        <div>
          <div>
            <h1 className="font-bold text-2xl text-black text-left mb-3">Future Vision</h1>
          </div>
          <div>
            <h1 className="font-md text-gray-700 text-left text-sm">Looking ahead, FoodDrop is poised for rapid growth. Our <br />vision for the future is ambitious, yet firmly within<br />our reach. We see FoodDrop expanding beyond Jordan,<br />becoming a leading name in food delivery across the Middle<br />East and beyond. But our vision doesn't stop at<br />geographic expansion; we're also looking to diversify our<br />services. This includes catering to a wider variety<br />of dietary needs, offering more personalized ordering<br />experiences, and integrating advanced technologies<br />like AI and machine learning to predict customer<br />preferences and improve delivery efficiency.
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-[8rem]"><h1 className="font-bold text-2xl text-black text-center mb-5">Meet Our Team</h1></div>
      <div className="flex flex-row justify-center items-center space-between space-x-[4rem] mt-[2rem] mb-[3rem]">
        
        
        <div className="flex flex-col">
          <h2 className="font-bold text-center text-gray-700 text-lg">Mahmoud Rumaneh</h2>
          <h2 className="font-bold text-center text-gray-700 text-lg">Software Engineer</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-center text-gray-700 text-lg">Hadeel Obaid</h2>
          <h2 className="font-bold text-center text-gray-700 text-lg">Software Engineer</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-center text-gray-700 text-lg">Dana Omar</h2>
          <h2 className="font-bold text-center text-gray-700 text-lg">Software Engineer</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-center text-gray-700 text-lg">Omar Masoud</h2>
          <h2 className="font-bold text-center text-gray-700 text-lg">Software Engineer</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-center text-gray-700 text-lg">Mohammad Elamaireh</h2>
          <h2 className="font-bold text-center text-gray-700 text-lg">Software Engineer</h2>
        </div>
      </div>

      <Footer />
      </div>
  )
}

export default AboutPage;
