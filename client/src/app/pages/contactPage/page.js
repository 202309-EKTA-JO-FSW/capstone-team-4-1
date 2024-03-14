"use client"
import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Footer from '@/app/components/footer/footer';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef(); // Assuming you want to keep using the subject field
  const messageRef = useRef(); // Assuming you want to keep the message field

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
      alert("Email successfully sent. Check inbox.");
      // Clear the form if needed
      nameRef.current.value = '';
      emailRef.current.value = '';
      subjectRef.current.value = '';
      messageRef.current.value = '';
    } catch (error) {
      console.error("Failed to send the email:", error);
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
          <h2 className="text-2xl text-black font-bold mb-4 text-center">How we can help you?</h2>
          {/* {formStatus && (
            <div className={`mb-4 p-3 ${formStatus.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'} rounded-md`}>
              {formStatus.message}
            </div>
          )} */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row space-between space-x-[3rem] w-full mt-10">
              <div className="mb-4 w-[800px]">
                <input ref={nameRef} placeholder="Your Name" type="text" id="name" className="mt-1 px-2 py-4 w-full border-gray-700 rounded-md focus:border-gray-700 focus:ring-0" />
                {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
              </div>
              <div className="mb-4 w-[800px]">
                <input ref={emailRef} placeholder="Your Email" type="email" id="email" className="mt-1 px-2 py-4 w-full border-gray-700 rounded-md focus:border-gray-700 focus:ring-0" />
                {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>} */}
              </div>
              <div className="mb-4 w-[800px]">
                <input ref={subjectRef} placeholder="The subject" type="text" id="subject" className="mt-1 px-2 py-4 w-full border-gray-700 rounded-md focus:border-gray-700 focus:ring-0" />
                {/* {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>} */}
              </div>
            </div>
            <div className="mb-4">
              <textarea ref={messageRef} placeholder="Your Message" id="message" className="mt-1 px-2 py-4 w-full border-gray-700 rounded-md focus:border-gray-700 focus:ring-0" rows="4" />
              {/* {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>} */}
            </div>
            <button type="submit" className="bg-[#101B0B] hover:bg-green-800 text-[#FFC245] font-bold py-2 px-8 rounded-xl" disabled={loading}>Submit
              {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
