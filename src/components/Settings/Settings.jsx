import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import MainLayout from "../layouts/MainLayout";
import Header from "../Dashboard/Header";
import DashboardNavBar from "../DashboardNavBar/DashboardNavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);

  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL;
        const res = await fetch(`${backendUrl}/users/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
  
        const data = await res.json();
        // If your backend wraps the user object in a "user" key:
        const freshUser = data.user || data;
  
        setUser(freshUser);
        setFormData({
          username: freshUser.username || "",
          email: freshUser.email || "",
          bio: freshUser.bio || "",
          avatar: freshUser.avatar || "",
        });
      } catch (err) {
        console.error("Error loading user info:", err);
      }
    };
  
    if (user?._id) {
      fetchUserData();
    }
  }, [user?._id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL;
      const response = await fetch(`${backendUrl}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser); 
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <MainLayout>
      <DashboardNavBar />
      <Header />

      <div className="p-2 flex  gap-3 overflow-scroll rounded-xl bg-neutral-100 w-full ">
        <div className="max-w-6xl m-6 ">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 mb-6">
            Manage your account settings and set e-mail preferences.
          </p>

          <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-4 pb-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    You can <span className="text-blue-500">@mention</span>{" "}
                    other users and organizations to link to them.
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="avatar">Avatar</Label>
                  <Input
                    id="avatar"
                    name="avatar"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button type="submit">Update profile</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
