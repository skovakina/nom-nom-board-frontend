import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster/use-toast"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const MealForm = ({ onAddMeal }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
      name: "",
      note: "",
      portions: 1,
      image: "",
    });
  
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setFormData({
        ...formData,
        [name]: name === "portions" ? parseInt(value) || 1 : value,
      });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!formData.name) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Meal name is required.",
          });
          return;
        }
        onAddMeal(formData);
        toast({
          title: "Meal Created",
          description: `${formData.name} has been added to your fridge!`,
        });
        setFormData({ name: "", note: "", portions: 1, image: "" });
    };

    return (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Create Meal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of your meal"
                />
              </div>
              <div>
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="What makes it special"
                />
              </div>
              <div>
                <Label htmlFor="portions">Portions</Label>
                <Input
                  id="portions"
                  name="portions"
                  type="number"
                  value={formData.portions}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="URL"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFormData({ name: "", note: "", portions: 1, image: "" })
                  }
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      );
};


export default MealForm;