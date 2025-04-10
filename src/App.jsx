import { useContext } from "react";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";
import { UserContext } from "./contexts/UserContext";

import { Button } from "@/components/ui/button";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};
function App() {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <>
      <NavBar />
      {/* this is shadcn button. it has styles from tailwind */}
      <Button variant="outline">Click me</Button>

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
