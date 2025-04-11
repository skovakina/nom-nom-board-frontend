import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthLayout from "../layouts/AuthLayout";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center justify-center mt-10">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter you credentials to continue
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                  {message && (
                    <p className="text-sm text-red-500 text-center">
                      {message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center text-sm mt-2">
                  Don&apos;t have an account?{" "}
                  <Link to="/sign-up" className="underline underline-offset-4">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden md:block">
              <img
                src="/images/1.png"
                alt="A relaxed person doing yoga"
                className="w-full h-[50vh] object-cover rounded-lg dark:brightness-[0.2] dark:grayscale"
              />
              <div className="p-4">
                <p className="text-sm text-center mb-3">
                  "This meal tracker has truly been a game-changer! It took the
                  hassle of meal planning off my shoulders, so I finally have
                  time to focus on the things I love."
                </p>
                <p className="text-sm font-semibold text-center">
                  - DestressedUser12
                </p>
                <p className="flex justify-center items-center">
                  <span className="text-yellow-500">★★★★★</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default SignInForm;
