import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../ui/button";

const DashboardNavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <nav
      className={`${
        user ? "bg-[#E6E6E6]" : "bg-[#FFFFFF]"
      } top-0 p-4 w-full mx-auto rounded-lg m-4`}
    >
      <ul className="flex justify-between items-center w-full">
        <li
          className={`${
            !user
              ? "text-left md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
              : "text-left"
          }`}
        >
          🍕 NomNomBoard
        </li>

        <div className="flex gap-4 ml-auto">
          {user ? (
            <>
              <li>
                <Button variant="outline">
                  <Settings />
                  <Link to="/settings">Settings</Link>
                </Button>
              </li>
              <li>
                <Button variant="outline">
                  <LogOut />
                  <Link to="/" onClick={handleSignOut}>
                    Log Out
                  </Link>
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button variant="outline">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default DashboardNavBar;
