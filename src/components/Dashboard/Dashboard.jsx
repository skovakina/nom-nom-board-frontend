import { useState, useEffect } from "react";
import Column from "./Column";
import Header from "./Header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  getDays,
  createDay,
  deleteDay,
  updateDayMeal,
} from "../../services/days";
import { createMeal } from "../../services/meals";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getMeals } from "../../services/meals";
import DashboardNavBar from "../DashboardNavBar/DashboardNavBar";
import MainLayout from "../layouts/MainLayout";
import MealDialogForm from "./MealDialogForm";

const DEFAULT_CARDS = [
  {
    title: "Baked Potato",
    note: " with cheese and bacon",
    id: "1",
    column: "fridge",
    mealType: "unassigned",
  },
  {
    title: "Italian Pasta",
    note: " with marinara sauce",
    id: "2",
    column: "fridge",
    mealType: "unassigned",
  },
  {
    title: "Spaghetti",
    note: " with marinara sauce",
    id: "3",
    column: "fridge",
    mealType: "unassigned",
  },
  {
    title: "Salad",
    note: " with tomato and lettuce",
    id: "4",
    column: "fridge",
    mealType: "unassigned",
  },
];

const MEAL_SECTIONS = [
  "breakfast",
  "first snack",
  "lunch",
  "second snack",
  "dinner",
];

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [days, setDays] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({ title: "", note: "" });

  useEffect(() => {
    async function fetchDays() {
      const result = await getDays();
      setDays(result);
    }

    fetchDays();
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const data = await getMeals();
        const transformed = data.map((meal) => ({
          ...meal,
          id: meal._id,
          column:
            meal.mealType === "unassigned" ? "fridge" : meal.column || "fridge",
          mealType: meal.mealType || "unassigned",
        }));
        setCards(transformed);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      }
    }

    fetchMeals();
  }, []);

  const getTitleFromDate = (date) => {
    const today = new Date();
    const isToday = new Date(date).toDateString() === today.toDateString();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow =
      new Date(date).toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  function handleCreateClick() {
    setDialogOpen(true);
  }

  async function handleSaveMeal() {
    if (!newMeal.title.trim()) return;

    try {
      const created = await createMeal(newMeal);
      const meal = {
        ...created,
        id: created._id,
        column: "fridge",
        mealType: "unassigned",
      };
      setCards((prev) => [...prev, meal]);
      setNewMeal({ title: "", note: "" });
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to create meal:", err);
    }
  }

  async function handleAddDay() {
    const nextIndex = days.length;
    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + nextIndex);

    const newDay = {
      date: newDate.toISOString(),
      breakfast: null,
      lunch: null,
      dinner: null,
      firstSnack: null,
      secondSnack: null,
    };

    await createDay(newDate);

    setDays((prev) => [
      ...prev,
      {
        ...newDay,
        _id: `day-${nextIndex}`,
      },
    ]);
  }

  async function handleDeleteDay(id) {
    console.log(id);
    await deleteDay(id);
    setDays((prev) => prev.filter((day) => day._id !== id));
  }

  return (
    <MainLayout>
      <DashboardNavBar />
      <Header />
      <div className="h-screen w-full">
        <div className="p-2 flex  gap-3 overflow-scroll rounded-xl bg-neutral-100 w-full ">
          <Column
            title="Fridge"
            column="fridge"
            cards={cards}
            setCards={setCards}
            mealSections={["unassigned"]}
            onCreate={handleCreateClick}
          />
          {days.map((day) => (
            <Column
              key={day._id}
              title={getTitleFromDate(day.date)}
              column={day._id}
              cards={cards}
              setCards={setCards}
              mealSections={MEAL_SECTIONS}
              onDelete={handleDeleteDay}
            />
          ))}
          <Button
            onClick={handleAddDay}
            className="w-full !justify-start w-56 shrink-0"
          >
            <Plus />
            Add Day
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <MealDialogForm
            mode="create"
            meal={newMeal}
            onChange={setNewMeal}
            onSubmit={handleSaveMeal}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Dashboard;
