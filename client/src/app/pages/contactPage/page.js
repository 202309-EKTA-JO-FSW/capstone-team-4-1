"use client"
import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Footer from '@/app/components/footer/footer';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    emailjs.init("XiuAFl3Ivwu3_z99g");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_fa4oo5y";
    const templateId = "template_qiordo4";

    const templateParams = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    };

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, templateParams);
      setMessage("FoodDrop successfully received your email, thanks for reach us.");
      setMessageType('success');
      nameRef.current.value = '';
      emailRef.current.value = '';
      subjectRef.current.value = '';
      messageRef.current.value = '';
    } catch (error) {
      console.error("Failed to send the email:", error);
      setMessage("Failed to send the email. Please try again.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="relative w-full h-[380px] overflow-hidden bg-black">
        <img className="absolute w-full h-[500px] blur-sm top-0 left-0 z-0 mt-18 pt-10 bg-black opacity-50" src="/bgContactUs.png" alt="restaurant background" />
        <div className=" absolute w-full h-[600px] flex items-center justify-center z-10">
          <h1 className="font-bold text-6xl text-white text-center pt-5 mt-3">Get in Touch!</h1>
        </div>
      </div>
      
      <div className="flex mx-[10rem] mt-[4rem] flex-col justify-center items-center">
        <div className="w-full"> 
          <h2 className="text-2xl text-black font-bold mb-4 text-center">How can we help you?</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row space-between space-x-[3rem] w-full mt-10">
              <div className="mb-4 w-[800px]">
                <input ref={nameRef} placeholder="Your Name" type="text" id="name" className="mt-1 px-2 py-4 w-full  bg-gray-50 border border-gray-800 rounded-3xl w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
             
              </div>
              <div className="mb-4 w-[800px]">
                <input ref={emailRef} placeholder="Your Email" type="email" id="email" className="mt-1 px-2 py-4 w-full  bg-gray-50 border border-gray-800 rounded-3xl w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />

              </div>
              <div className="mb-4 w-[800px]">
                <input ref={subjectRef} placeholder="The subject" type="text" id="subject" className="mt-1 px-2 py-4 w-full  bg-gray-50 border border-gray-800 rounded-3xl w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
               
              </div>
            </div>
            <div className="mb-4">
              <textarea ref={messageRef} placeholder="Your Message" id="message" className="mt-1 px-2 py-4 w-full  bg-gray-50 border border-gray-800 rounded-3xl w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none" rows="4" />
             
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="w-[300px] bg-[#101B0B] hover:bg-green-800 text-[#FFC245] font-bold py-2 px-8 rounded-xl" disabled={loading}>Submit
              </button>
            </div>
          </form>
         
            {message && (
              <div className={`flex justify-center items-center text-white font-md text-center w-full mx-[2rem] py-4 rounded-3xl mt-4 ${messageType === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
                {message}
              </div>
            )}
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
