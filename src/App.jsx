import { useContext } from "react";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./contexts/UserContext";

// this is how you import shadcn ui https://ui.shadcn.com/docs/components/button
// is you want to use shadcn components, you need to follow the docs to import them
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster/toaster";
import { useToast } from "@/components/ui/toaster/use-toast"; 

function App() {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const handleTestToast = () => {
    console.log("Button clicked!");
    toast({
      title: "Nom Nom Board", 
      description: "This is a test for our meal planning app!"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8">
        {/* Example ShadCN Button - you can move this to a specific component later */}
        <Button variant="default" className="mb-4" onClick={handleTestToast}>
          Welcome to Nom Nom Board
        </Button>

        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Landing />}
          />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}


export default App;
