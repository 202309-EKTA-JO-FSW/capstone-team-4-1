import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import HomePage from "./pages/landingPage/index";
export function Home() {
  return (
    <main className="">
      <div className="relative bg-[#fff] overflow-hidden text-black">
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    </main>
  );
}

export default Home;
