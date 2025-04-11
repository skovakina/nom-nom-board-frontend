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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { getMeals } from "../../services/meals";
import DashboardNavBar from "../DashboardNavBar/DashboardNavBar";
import MainLayout from "../layouts/MainLayout";

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new meal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Meal title" />
            <Input placeholder="Optional note" />
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Dashboard;
