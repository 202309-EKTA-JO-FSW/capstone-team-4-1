import React from "react"
import Link from "next/link"

const Footer = () => {
  const teamMembers = [
    {
      name: "Dana Omar",
      github: "https://github.com/Dana-MO",
      linkedin: "https://www.linkedin.com/in/dana-omar-ko",
    },
    {
      name: "Hadeel Obaid",
      github: "https://github.com/Hadeel-Ali-Obaid",
      linkedin: "https://www.linkedin.com/in/hadeel-obaid-254011279/",
    },
    {
      name: "Mahmoud Rumaneh",
      github: "https://github.com/MahmoudRumaneh",
      linkedin: "https://www.linkedin.com/in/mahmoud-rumaneh-b40537209/",
    },
    {
      name: "Omar Masoud",
      github: "https://github.com/OmarMasoud3",
      linkedin: "https://www.linkedin.com/in/omar-masoud-444384204/",
    },
    {
      name: "Mohammad Elamaireh",
      github: "https://github.com/samxsam21",
      linkedin: "https://www.linkedin.com/in/mohammad-elamaireh-63b3a5257/",
    }
  ]

  return (
    <footer className="relative top-0 left-0 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
        <path fill="#101B0B" fillOpacity="1" d="M0,40L60,43.3C120,47,240,53,360,53.3C480,53,600,43,720,36.7C840,31,960,29,1080,36.7C1200,43,1320,57,1380,62.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
      </svg>
      <div className="bg-[#101B0B] top-0 left-0 w-full px-4 py-5 sm:px-6 lg:px-8">
        <div className="logo">
          <Link href={`/Home`}>
            <img src="/logo.png" alt="logo" className="w-62 h-20 pt-4 mb-5"></img>
          </Link>
        </div>
        <div className="lg:flex lg:items-start lg:gap-8 ">
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <p className="text-white mt-4">
              🛵 Embark on a journey of culinary delights with FoodDrop,
               your premier choice for savoring the flavors of the world! 🍽️ 
               Taste the adventure from the comfort of your home as we bring gourmet experiences
                right to your doorstep. Explore, indulge, and enhance your dining moments with us –
                 where every dish has a tale to tell. 🥡✨
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className=" text-white font-medium">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    About us
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Company Review
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-white ">Meet The Team</p>

              <ul className="mt-6 space-y-4 text-sm">
                <div>
                  <div className=" space-y-4">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="col-span-2 flex justify-start gap-3 "
                      >
                        <a
                          href="#"
                          target="_blank"
                          className="container w-40 text-white transition hover:opacity-75"
                        >
                          {member.name}
                        </a>

                        <li className="">
                          <a
                            href={member.github}
                            target="_blank"
                            className="text-white transition hover:opacity-75"
                          >
                            <span className="sr-only">GitHub</span>

                            <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>

                        <li>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            className="text-white transition hover:opacity-75"
                          >
                            <span className="sr-only">Linkedin</span>

                            <svg
                              className="h-6 w-6"
                              viewBox="0 0 50 50"
                              fill="currentColor"
                            >
                              <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z"></path>
                            </svg>
                          </a>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; 2024. FoodDrop. All rights reserved.
            </p>

            <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer
