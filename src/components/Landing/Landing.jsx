import { Button } from "@/components/ui/button";
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <>

            <main className="min-h-screen bg-gradient-to-b from-orange-200 via-yellow-100 to-white flex flex-col items-center">
                <DashboardNavBar />
                {/* Container for the 5 elements, centered and positioned in the top half */}
                <div
                    className="w-full md:w-[696px] h-auto md:h-[459px] mt-[50px] md:mt-[100px] flex flex-col items-center justify-center py-8"
                >
                    {/* New - Work in progress button */}
                    <div
                        className="flex items-center justify-center py-2 px-4 gap-[10px] rounded-md bg-gray-50 text-gray-600 text-sm font-poppins font-medium mb-4"
                    >
                        <span>✨New - Work in progress</span>
                    </div>

                    {/* Meal Management for Busy Bee title */}
                    <h1
                        className="text-[32px] sm:text-[40px] md:text-[56px] font-poppins font-semibold leading-none text-black text-center w-full md:w-[641px] h-auto md:h-[168px] mb-4"
                    >
                        Meal Management for Busy Bee
                    </h1>

                    <p
                        className="text-[16px] md:text-[20px] font-poppins font-medium leading-none text-gray-600 text-center w-full md:w-[696px] h-auto md:h-[90px] mb-4"
                    >
                        NomNomBoard is your new favorite food companion — a meal tracker that
                        makes planning, prepping, and reflecting on your meals fun and visual.
                    </p>

                    <Link to="/sign-up">
                      <Button
                          className="py-2 px-4 gap-[8px] rounded-[6px] border border-black bg-black text-white font-poppins font-medium mb-4"
                      >
                          Get Started - Free forever →
                      </Button>
                    </Link>

                    <p
                        className="text-[12px] md:text-[14px] font-poppins font-medium leading-none text-gray-500 text-center w-full md:w-[216px] h-auto md:h-[42px]"
                    >
                        🔥Yes, it’s free forever. No credit card required
                    </p>
                </div>

                {/* Placeholder for the screenshot in the bottom half */}
                <div className="w-full md:w-[696px] h-[50vh] mt-auto mb-8 flex items-center justify-center">
                    {/* Replace this with our screenshot later */}
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                        <p className="text-gray-600">Screenshot Placeholder</p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-auto text-gray-500 text-sm text-center w-full py-4">
                    With love, NomNomTeam © 2025
                </footer>
            </main>
        </>
    );
};

export default Landing;