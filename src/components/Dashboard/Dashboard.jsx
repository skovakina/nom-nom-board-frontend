import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { index } from '../../services/userService';
import MealForm from '../MealForm/MealForm';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([
    { name: "Baked potato", note: "With cheese & parsley", portions: 2 }
  ]);
  const [days, setDays] = useState(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US" , {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      return {
        date: formattedDate,
        meals: { breakfast: null, lunch: null, dinner: null },
      };
    });
  });

  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleAddMeal = (newMeal) => {
    setMeals([...meals, newMeal]);
  };

  const handleAssignMeal = (dayIndex, slot) => {
    setDays((prevDays) =>
      prevDays.map((day, index) =>
        index === dayIndex
          ? { ...day, 
              meals: { 
                ...day.meals, 
                [slot]: selectedMeal ? selectedMeal : null,
              }, 
            }
          : day
      )
    );
    if (selectedMeal) {
      setSelectedMeal(null);
    }
  };

  return (
    <main className="flex flex-row gap-6 p-6 min-h-screen bg-gray-100">
      {/* Left Sidebar: Create Meal and Fridge */}
      <div className="w-1/3 space-y-6">
        <MealForm onAddMeal={handleAddMeal} />
        {/* Instruction for users */}
        <p className="text-sm text-gray-600 mb-2">
          Select a meal and click a slot to assign it. Click again to remove.
        </p>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Fridge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {meals.map((meal, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-2 rounded-md ${
                  selectedMeal === meal ? "bg-blue-100 border border-blue-300" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-800">{meal.name}</p>
                  <p className="text-sm text-gray-600">{meal.note}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMeal(meal)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  +
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Section: Daily Meal Plan */}
      <div className="w-2/3">
        <div className="grid grid-cols-2 gap-6">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">{day.date}</h2>
              <Card
                onClick={() => handleAssignMeal(dayIndex, "breakfast")}
                className="cursor-pointer hover:bg-gray-50 shadow-sm"
              >
                <CardContent className="p-4 text-center">
                  <p className="text-gray-700">
                    {day.meals.breakfast ? day.meals.breakfast.name : "Breakfast"}
                  </p>
                </CardContent>
              </Card>
              <Card
                onClick={() => handleAssignMeal(dayIndex, "lunch")}
                className="cursor-pointer hover:bg-gray-50 shadow-sm"
              >
                <CardContent className="p-4 text-center">
                  <p className="text-gray-700">
                    {day.meals.lunch ? day.meals.lunch.name : "Lunch"}
                  </p>
                </CardContent>
              </Card>
              <Card
                onClick={() => handleAssignMeal(dayIndex, "dinner")}
                className="cursor-pointer hover:bg-gray-50 shadow-sm"
              >
                <CardContent className="p-4 text-center">
                  <p className="text-gray-700">
                    {day.meals.dinner ? day.meals.dinner.name : "Dinner"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
