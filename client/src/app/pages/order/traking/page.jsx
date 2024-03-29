"use client"

// import PreparingOrder from "@/app/components/preparingOrder";


export default function TrakingPopup({ closePopup, restaurantName }) {
    const handleNavigate = () => {
        
        if (closePopup) {
            window.location.href = '/pages/customer/restaurantList';
            closePopup();
        }
    
       
    };
    return(
        <div className="fixed inset-0 bg-gray-800 z-50 overflow-y-auto h-full w-full">
            <div className="relative flex justify-center mt-[4rem] p-5 top-20 
               items-center mx-auto border w-[650px] h-auto shadow-lg rounded-3xl bg-white   
            ">
                <button onClick={handleNavigate} className="absolute top-5 right-5 p-1 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200
                    xl:top-5 xl:right-5 xl:p-1
                    md:top-5 md:right-4 md:p-1
                    2xs:top-2 2xs:right-2 2xs:p-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-black transform transition-transform duration-200 ease-in-out hover:rotate-45 hover:text-[#FFC245]
                    xl:h-6 xl:w-6
                    md:h-5 md:w-5
                    2xs:h-4 2xs:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col space-between mt-[2rem] space-y-[2rem]"> 
                    <div className="flex flex-col items-center justify-center mb-[3rem]">
                        <div className="flex flex-row">
                            <span className="text-lg font-md">Your order is sent successfully to</span><span className="ml-2 text-xl font-bold px-1 bg-[#FDF3DC] rounded-md">{restaurantName} </span>
                        </div>
                        <div className="text-xl font-md mt-[3rem]">
                            <h3>Your order is preparing</h3>
                        </div>

                        <div>
                            {/* <PreparingOrder /> */}
                            <img className="pt-5 w-[300px] h-auto"
                            src="https://cdn.dribbble.com/users/2692366/screenshots/14120206/media/034b91493d23532a066e9cb376b4bcb6.gif" alt="preparingOrder" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
