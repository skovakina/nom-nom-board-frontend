import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { index } from '../../services/userService';
import MealForm from '../MealForm/MealForm';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([
    { name: "Baked potato", note: "with cheese and parsley", portions: 2 }
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
    if (!selectedMeal) return;
    setDays((prevDays) =>
      prevDays.map((day, index) =>
        index === dayIndex
          ? { ...day, meals: { ...day.meals, [slot]: selectedMeal } }
          : day
      )
    );
    setSelectedMeal(null);
  };

  return (
    <main>
      {/* Left Sidebar: Create Meal and Fridge */}
      <div>
        <MealForm onAddMeal={handleAddMeal} />
        <Card>
          <CardHeader>
            <CardTitle>Fridge</CardTitle>
          </CardHeader>
          <CardContent>
            {meals.map((meal, index) => (
              <div key={index}>
                <div>
                  <p>{meal.name}</p>
                  <p>{meal.note}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMeal(meal)}
                >
                  +
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
  
      {/* Right Section: Daily Meal Plan */}
      <div>
        <div>
          {days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h2>{day.date}</h2>
              <Card onClick={() => handleAssignMeal(dayIndex, "breakfast")}>
                <CardContent>
                  {day.meals.breakfast ? day.meals.breakfast.name : "Breakfast"}
                </CardContent>
              </Card>
              <Card onClick={() => handleAssignMeal(dayIndex, "lunch")}>
                <CardContent>
                  {day.meals.lunch ? day.meals.lunch.name : "Lunch"}
                </CardContent>
              </Card>
              <Card onClick={() => handleAssignMeal(dayIndex, "dinner")}>
                <CardContent>
                  {day.meals.dinner ? day.meals.dinner.name : "Dinner"}
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
