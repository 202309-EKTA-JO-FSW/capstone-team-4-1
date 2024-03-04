import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Restaurant from "@/app/components/navbar/restaurant";
import Rider from "@/app/components/navbar/rider";
export default function LandingPage() {
  return (
    <div className="relative bg-[#fff] overflow-hidden text-black">
        <Navbar />

        <div className="relative w-full h-[600px] overflow-hidden bg-black">
          <img className="absolute w-full h-[600px] top-0 left-0 z-0 mt-20 pt-10 bg-black opacity-50" src="/backgroundwelcome.png" alt="gifwelcome" />
          <div className=" absolute w-full h-[600px] flex items-center justify-center z-10">
            <h1 className="font-bold text-6xl text-white text-center pt-10 mt-20">Order food online in Jordan</h1>
          </div>
        </div>

        <svg className="relative -mt-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
          <path fill="#ffffff" fillOpacity="1" d="M0,40L60,43.3C120,47,240,53,360,53.3C480,53,600,43,720,36.7C840,31,960,29,1080,36.7C1200,43,1320,57,1380,62.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>

        <div className="flex items-center justify-center">
              <h1 className="font-bold text-4xl text-black text-center pt-10">Let's do it together</h1>
        </div>

        <div className="flex items-center justify-center">
              <h1 className="font-bold text-2xl text-black text-center pt-2">Join us!</h1>
        </div>

        <div className="flex justify-center space-x-10 text-black text-center mt-5 mb-10">     
            <div className="py-2 font-bold mr-20 pr-10"> 
              <img src="/rider.png" class="w-60 h-70 pt-10 mb-5 rounded-full mx-auto" alt="rider" />
              <h1 className="text-xl font-bold mb-3"><Rider /></h1>
              <p className="text-sm">Enjoy flexibility, freedom and competitive <br /> earnings by delivering through FoodDrop.</p>
              <button className="bg-[#FFC245] text-black text-center mx-auto mt-5 py-2 px-8 rounded-xl font-bold">Register here</button>
            </div>

            <div className="py-2 font-bold ml-20 pl-10"> 
              <img src="/restaurant.jpg" class="w-60 h-70 pt-10 mb-5 rounded-full mx-auto" alt="restaurnat" />
              <h1 className="text-xl font-bold mb-3"><Restaurant /></h1>
              <p className="text-sm">Grow with FoodDrop! Our technology <br /> base can help you boost sales and unlock new opportunities!</p>
              <button className="bg-[#FFC245] text-black text-center mx-auto mt-5 py-2 px-8 rounded-xl font-bold">Register here</button>
            </div>
      </div>

      <Footer />
    </div>
  );
}
