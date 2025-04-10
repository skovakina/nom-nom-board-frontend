import { Button } from "@/components/ui/button";
import DashboardNavBar from "../DashboardNavBar/DashboardNavBar";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="width-full bg-gradient-to-b from-orange-200 via-yellow-100 to-white flex flex-col items-center">
      <div className="w-full max-w-[90%]">
        <DashboardNavBar />
        <main className=" min-h-screen  flex flex-col items-center">
          <div className="w-full md:w-[696px] h-auto md:h-[459px] mt-[50px] md:mt-[100px] flex flex-col items-center justify-center py-8">
            <Button variant="secondary" className="mb-4">
              <Link to="/sign-up">✨New - Work in progress</Link>
            </Button>

            <h1 className="text-[32px] sm:text-[40px] md:text-[56px] font-poppins font-semibold leading-none text-black text-center w-full md:w-[641px] h-auto md:h-[168px] mb-4">
              Meal Management for Busy Bee
            </h1>

            <p className="text-[16px] md:text-[20px] font-poppins font-medium leading-none text-gray-600 text-center w-full md:w-[696px] h-auto md:h-[90px] mb-4">
              NomNomBoard is your new favorite food companion — a meal tracker
              that makes planning, prepping, and reflecting on your meals fun
              and visual.
            </p>

            <Button variant="default" className="mb-4">
              <Link to="/sign-up">Get Started - Free forever →</Link>
            </Button>

            <p className="text-[12px] md:text-[14px] font-poppins font-medium leading-none text-gray-500 text-center w-full md:w-[216px] h-auto md:h-[42px]">
              🔥Yes, it’s free forever. No credit card required
            </p>
          </div>

          <div className="w-full md:w-[696px] h-[50vh] mt-auto mb-8 flex items-center justify-center">
            {/* Replace this with our screenshot later */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
              <img
                src="/images/dashboard.png"
                alt="Screenshot of dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto text-gray-500 text-sm text-center w-full py-4">
            With love, NomNomTeam © 2025
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Landing;
