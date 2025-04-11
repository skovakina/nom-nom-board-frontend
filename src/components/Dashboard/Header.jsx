import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex flex-col gap-3 m-6">
      <h1 className="text-3xl font-bold">Good Morning, {user.username}!</h1>
      <p className="text-muted-foreground max-w-md">
        Your week just got easier. Check out your meal plan, prep for the days
        ahead, and keep your favorites close. Let&#39;s make healthy (or tasty)
        choices simple and stress-free!
      </p>
    </header>
  );
};

export default Header;
