"use client"
import Location from "../customerSignup/components/location";
import React, { useState } from 'react';
import { Edit, SimpleForm } from 'react-admin';
import CuisineInput from "./components/cuisine";
export default function RestaurantSignup() {
    const [cuisines, setCuisines] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically gather your form data, including the cuisines state, and send it to your backend
        console.log("Form data", { cuisines });
      };
  return (
    <div className="relative bg-[#101B0B] overflow-hidden text-black">

        <div className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]">

          <img className="absolute top-0 left-0 z-0 bg-black opacity-20 w-full
          xl:mt-5 xl:pt-5 md:mt-8 md:pt-4 mt-4 pt-5
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
             src="/restuarantSignipBg.png" alt="gifwelcome" />

          <div className="relative w-full  flex items-center justify-center z-10 
            xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px]">

            <h1 className="font-bold text-white text-left
              xl:text-4xl lg:text-2xl md:text-lg sm:text-md text-sm
               ">
                Join us and serve your flavors to food lovers everywhere!</h1>
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

        <div className="xl:mt-[8.5rem] xl:pt-[6.5rem]
        lg:mt-[4.5rem] lg:pt-[4.5rem]
        md:mt-[8.5rem] md:pt-[8.5rem]
        2xs:mt-[8.5rem] 2xs:pt-[8.5rem]
        "></div>

        <div className="flex justify-center items-center xl:mt-[3.5rem] xl:pt-[3.5rem] xl:mr-[6.5rem] xl:pr-[8.5rem]
        lg:mt-[6.5rem] lg:pt-[6.5rem] lg:mr-[2.5rem] lg:pr-[2.5rem]
        md:mt-[4.5rem] md:pt-[4.5rem] md:mr-[2.5rem] md:pr-[2.5rem]
        2xs:mt-[4.5rem] 2xs:pt-[4.5rem] 2xs:mr-[2.5rem] 2xs:pr-[2.5rem]
        ">
        <div className="flex absolute z-20 items-center justify-center p-4 xl:mr-[6.5rem] xl:pr-[6.5rem]
        lg:mr-[4.5rem] lg:pr-[4.5rem]
        md:mr-[2rem] md:pr-[2rem]
        2xs:mr-[1.5rem] 2xs:pr-[1.5rem]
        ">
          <form className="relative mx-auto border shadow-lg rounded-3xl bg-white p-8
            xl:w-[550px] xl:h-auto xl:rounded-3xl xl:shadow-lg
            lg:w-[400px] lg:h-auto lg:rounded-3xl lg:shadow-lg
            md:w-[300px] md:h-auto md:rounded-2xl md:shadow-sm
            2xs:w-[200px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs
          ">
            <div className="text-center mb-4">
              <h2 className=" font-medium text-black 
              xl:text-3xl xl:mb-10
              lg:text-2xl lg:mb-10
              md:text-xl md:mb-8
              2xs:text-md 2xs:mb-5
              ">Become a partner</h2>
              <label htmlFor="title" className="block text-left">Title<span className="text-red-900"> *</span>:</label>
              <input type="text" id="title" name="title" placeholder="Restaurant Name" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              
              <label htmlFor="email" className="block text-left mt-4">Email<span className="text-red-900"> *</span>:</label>
              <input type="email" id="email" name="email" placeholder="example@example.com" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              
              <label htmlFor="password" className="block text-left mt-4">Password<span className="text-red-900"> *</span>:</label>
              <input type="password" id="password" name="password" placeholder="Password123" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              
              <label htmlFor="password2" className="block text-left mt-4">Repeat Password<span className="text-red-900"> *</span>:</label>
              <input type="password" id="password2" name="repeatPassword" placeholder="Password123" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              
              <label htmlFor="phone" className="block text-left mt-4">Phone<span className="text-red-900"> *</span>:</label>
              <div className="flex w-full">
                <span className="bg-gray-50 border-b border-gray-300 px-3 py-2">+962</span>
                <input type="tel" id="phone" name="phone" placeholder="770000000" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              </div>
              
              <label htmlFor="restaurantImg" className="block text-left mt-4">Profile Picture:</label>
              <input 
                type="file" 
                id="restaurantImg" 
                name="restaurantImg" 
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" 
                accept="image/ *" 
              />
              
              <label htmlFor="license" className="block text-left">License<span className="text-red-900"> *</span>:</label>
              <input type="text" id="license" name="license" placeholder="XXX#1234" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
            
              <label htmlFor="street" className="block text-left">Street Name<span className="text-red-900"> *</span>:</label>
              <input type="text" id="street" name="street" placeholder="St. Name - City - Country" required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>

              <label htmlFor="buildingNumber" className="block text-left mt-4">Building Number<span className="text-red-900"> *</span>:</label>
              <input type="text" id="buildingNumber" name="buildingNumber" placeholder="123" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              
              <label htmlFor="area" className="block text-left mt-4">Area<span className="text-red-900"> *</span>:</label>
              <input type="text" id="area" name="area" placeholder="Eg., Amman" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>


              
                <label htmlFor="deliveryTime" className="block text-left pt-4">
                    Delivery Time<span className="text-red-900"> *</span>:
                </label>
                <input 
                type="number" 
                id="deliveryTime" 
                name="deliveryTime" 
                placeholder="Average delivery time in minutes" 
                required 
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                />

                <label htmlFor="deliveryFee" className="block text-left pt-4">
                    Delivery Fee<span className="text-red-900"> *</span>:
                </label>
                <input 
                type="number" 
                id="deliveryFee" 
                name="deliveryFee" 
                placeholder="Delivery fee in JOD" 
                required 
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                />
                <CuisineInput cuisines={cuisines} setCuisines={setCuisines} />

              {/* <Location /> */}
              <button type="submit" className="mt-4 bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black font-medium w-full rounded-md px-4 py-2">
                Open Account
              </button>
            </div>
          </form>
        </div>
      </div>






            <div className="grid grid-cols-3 bg-[#101B0B] w-full -mt-10 -pt-10">  
                <div></div>
                <div></div>
                
                <div className="flex flex-col justify-left items-left relative text-white -mt-10 -pt-10 pr-10 -ml-[5rem]">
                  <div className="text-2xl -mt-10 -pt-10 mb-2 font-bold"><p>Welcome to FoodDrop!</p></div>
                    <div className="py-4 pr-10"><p>
                          Embrace the ease of online food delivery with FoodDrop—a bustling 
                          marketplace that brings your culinary creations directly to food enthusiasts' doors. 
                          Join our platform and expand your reach beyond the confines of your restaurant.<br /><br />

                          By partnering with FoodDrop, you tap into a diverse community eager to explore 
                          your menu. Signing up is your gateway to effortless, efficient order management
                           and delivery services that cater to every craving, anytime. Whether it's a sumptuous 
                           feast for a family gathering, a quick office lunch, or a late-night indulgence, FoodDrop
                            is your reliable ally in delivering delight and satisfying hunger, one meal at a time.
                    </p>
                    </div>
                    <div className="pt-4 pr-5 font-bold mb-10 pb-10"><p>Let’s make each dish an experience to remember.<br />
                    Sign up now and start serving your signature flavors through FoodDrop!</p></div>
                </div>
            </div>

      <div className="mt-[10rem] pt-[10rem] mb-[5rem] bg-[#101B0B]">

      </div>
    </div>
  );
}
