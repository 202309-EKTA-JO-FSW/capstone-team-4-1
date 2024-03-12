
export default function ReplaceItems({ closePopup, onConfirmReplace, restaurantName }) {
    return(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto h-full w-full">
            <div className="relative flex justify-center p-5 top-20 
            items-center mx-auto border w-[550px] h-[420px] shadow-lg rounded-3xl bg-white
          ">
                <div className="flex flex-col space-between space-y-[2rem]"> 
                    <div className="flex flex-col items-center justify-center mb-[3rem]">
                        <div className="flex flex-row">
                            <span className="text-lg font-md">There are items in your basket from </span><span className="ml-2 text-xl font-bold px-1 bg-[#FDF3DC] rounded-md">{restaurantName} </span>
                        </div>
                        <div className="text-xl font-md mt-[3rem]">
                            <h3>Do you want to clear your basket?</h3>
                        </div>
                    </div>
                    <div className="flex flex-row space-between justify-center items-center space-x-[2rem]">

                        <div><button onClick={closePopup}
                            className="px-[4rem] py-3 rounded-3xl text-md font-bold text-[#FFC245] bg-gray-600 hover:bg-gray-800">No</button></div>

                        <div><button onClick={() => { onConfirmReplace(true); closePopup(); }}
                            className="px-[4rem] py-3 rounded-3xl text-md font-bold text-[#101B0B] bg-[#FFC245] hover:bg-[#e69b05]">Yes</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
