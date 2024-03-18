"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/app/components/footer/footer";
import Location from "./components/location";

export default function CustomerSignup() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
    location: '',
    street: '',
    buildingNo: '',
    avatar: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.addEventListener("input", () => {
        setFormSubmitted(false);
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("This is the form:", formData);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    const phoneRegex = /^(78|77|79)\d{7}$/;

    if (!passwordRegex.test(formData.password)) {
      setErrors({ password: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
      return;
    } else if (formData.password !== formData.repeatPassword) {
      setErrors({ repeatPassword: "Passwords must match." });
    }

    if (!phoneRegex.test(formData.phone)) {
      setErrors({ phone: "Please enter a valid phone number."})
    }

    try {
      const response = await fetch(`http://localhost:3001/user/customer/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
  
        
    if (response.ok) {
      setFormSubmitted(true);
      console.log('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        location: '',
        street: '',
        buildingNo: '',
        avatar: ''
      });
    } else {
      setErrors(response.errors.reduce((acc, error) => ({ ...acc, [error.param]: error.msg }), {}));
      console.error('Failed to submit form');
    }
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative bg-[#101B0B] overflow-hidden text-black">
      <div className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]">
        <img className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
          xl:mt-6 xl:pt-6 md:mt-8 md:pt-4 mt-4 pt-5
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

      <div className="xl:mt-[6.5rem] xl:pt-[6.5rem]
        lg:mt-[4.5rem] lg:pt-[4.5rem]
        md:mt-[8.5rem] md:pt-[8.5rem]
        2xs:mt-[8.5rem] 2xs:pt-[8.5rem]"></div>

      <div className="flex justify-center items-center xl:mt-[3.5rem] xl:pt-[3.5rem] xl:mr-[4.5rem] xl:pr-[4.5rem]
        lg:mt-[6.5rem] lg:pt-[6.5rem] lg:mr-[2.5rem] lg:pr-[2.5rem]
        md:mt-[4.5rem] md:pt-[4.5rem] md:mr-[2.5rem] md:pr-[2.5rem]
        2xs:mt-[4.5rem] 2xs:pt-[4.5rem] 2xs:mr-[2.5rem] 2xs:pr-[2.5rem]
        ">
        <div className="flex absolute z-20 items-center justify-center p-4 xl:mr-[6.5rem] xl:pr-[6.5rem]
        lg:mr-[4.5rem] lg:pr-[4.5rem]
        md:mr-[2rem] md:pr-[2rem]
        2xs:mr-[1.5rem] 2xs:pr-[1.5rem]
        ">
          <form onSubmit={handleSubmit} className="relative mx-auto border shadow-lg rounded-3xl bg-white p-8
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
              ">Create Account</h2>
              <div className="flex justify-center">{formSubmitted && <p className="text-[#FFC245] text-lg">Account created successfully!</p>}</div>
              <label htmlFor="firstName" className="block text-left">First Name<span className="text-red-900"> *</span>:</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}

              <label htmlFor="lastName" className="block text-left mt-4">Last Name<span className="text-red-900"> *</span>:</label>
              <input type="text" id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}

              <label htmlFor="email" className="block text-left mt-4">Email<span className="text-red-900"> *</span>:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@example.com" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              {errors.email && <span className="text-red-500">{errors.email}</span>}

              <label htmlFor="password" className="block text-left mt-4">Password<span className="text-red-900"> *</span>:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password123" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              {errors.password && <span className="text-red-500">{errors.password}</span>}

              <label htmlFor="repeatPassword" className="block text-left mt-4">Repeat Password<span className="text-red-900"> *</span>:</label>
              <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required placeholder="Password123" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              {errors.repeatPassword && <span className="text-red-500">{errors.repeatPassword}</span>}

              <label htmlFor="phone" className="block text-left mt-4">Phone<span className="text-red-900"> *</span>:</label>
              <div className="flex w-full">
                <span className="bg-gray-50 border-b border-gray-300 px-3 py-2">+962</span>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="770000000" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
              </div>
              {errors.phone && <span className="text-red-500">{errors.phone}</span>}

              <Location />
              
              <label htmlFor="street" className="block text-left mt-4">Street Name:</label>
              <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required placeholder="123 Main St" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              {errors.street && <span className="text-red-500">{errors.street}</span>}
              
              <label htmlFor="buildingNo" className="block text-left mt-4">Building Number:</label>
              <input type="text" id="buildingNo" name="buildingNo" value={formData.buildingNo} onChange={handleChange} required placeholder="123" className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
              {errors.buildingNo && <span className="text-red-500">{errors.buildingNo}</span>}
              
              <label htmlFor="avatar" className="block text-left mt-4">Profile Picture:</label>
              <input 
                type="file" 
                id="avatar" 
                name="avatar"
                accept="image/*"
                // value={formData.avatar}
                // onChange={handleChange}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({
                    ...formData,
                    avatar: file,
                  });
                }}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" 
              />
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

        <div className="flex flex-col justify-left items-left relative text-white -mt-10 -pt-10 pr-10 -ml-10">
          <div className="text-2xl -mt-10 -pt-10 mb-2 font-bold"><p>Welcome to FoodDrop!</p></div>
          <div className="py-4 pr-10"><p>
            where your cravings meet convenience!
            Join our community today and embark on a journey of culinary discovery,
            right from the comfort of your home.<br /><br /> With FoodDrop, you gain access to'
            a wide array of restaurants and cuisines, ensuring that no matter
            what your taste buds are yearning for, we've got you covered.
            Signing up is the first step towards enjoying fast, reliable,
            and hassle-free food delivery. Be it a cozy family dinner,
            a quick lunch at the office, or those late-night snacks,
            FoodDrop is here to cater to every appetite.
          </p>
          </div>
          <div className="pt-4 pr-5 font-bold mb-10 pb-10"><p>Let’s make every meal memorable.<br />
            Sign up now and start exploring the flavors that await you!</p></div>
        </div>
      </div>

      <div className="mt-10 pt-10 bg-[#101B0B]">
        <Footer />
      </div>
    </div>
  );
}
