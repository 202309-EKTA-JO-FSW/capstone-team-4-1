// import LoginSuccessAnimation from "@/app/components/loginSuccessAnimation"

const LoginSucessfully = () => {
    return(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto h-full w-full">
        <div
          className="relative flex justify-center items-center mx-auto -mt-6 mb-0   
           xl:w-[650px] xl:h-[530px] xl:-px-5
           md:top-20 md:w-[400px] md:h-[420px]
            2xs:top-20 2xs:w-[250px] 2xs:h-[340px]
      "
        >
            <img className="rounded-3xl"
             src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif" alt="loginSuccess" />
        </div>
        </div>
        
    )
}
export default LoginSucessfully