import LoginSuccessAnimation from "@/app/components/loginSuccessAnimation"

const LoginSucessfully = () => {
    return(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto h-full w-full">
        <div
          className="relative flex justify-center items-center mx-auto border w-[650px] h-[520px] shadow-lg rounded-3xl bg-white
      xl:top-20 xl:p-5 xl:w-[650px] xl:h-[520px] xl:rounded-3xl xl:shadow-lg
      md:top-20 md:p-3 md:w-[400px] md:h-[420px] md:rounded-2xl md:shadow-sm
      2xs:top-20 2xs:p-1 2xs:w-[250px] 2xs:h-[340px] 2xs:rounded-xl 2xs:shadow-xs
      "
        >
            <LoginSuccessAnimation />
        </div>
        </div>
        
    )
}
export default LoginSucessfully