import { useState, useEffect } from "react";
import Column from "./Column";
import Header from "./Header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

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
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [days, setDays] = useState([
    {
      _id: "local-day-0", // placeholder before DB saves
      date: new Date(), // Date object, matches schema
      column: "day-0", // UI reference
      breakfast: null,
      lunch: null,
      dinner: null,
      firstSnack: null,
      secondSnack: null,
    },
  ]);

  useEffect(() => {
    async function fetchDays() {
      // TODO: fetch days from your API here
      // Example structure after API response:
      const response = await fakeFetchDays(); // replace later
      setDays(response);
    }

    fetchDays();
  }, []);

  async function fakeFetchDays() {
    const today = new Date();
    return [
      {
        _id: "server-day-0",
        date: today,
        column: "day-0",
        breakfast: null,
        lunch: null,
        dinner: null,
        firstSnack: null,
        secondSnack: null,
      },
    ];
  }
  const getTitleFromDate = (date, index) => {
    const today = new Date();
    const isToday = new Date(date).toDateString() === today.toDateString();
    const tomorrow = new Date(today);
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

  function handleAddDay() {
    const nextIndex = days.length;
    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + nextIndex);

    const newDay = {
      _id: `local-day-${nextIndex}`,
      date: newDate,
      column: `day-${nextIndex}`,
      breakfast: null,
      lunch: null,
      dinner: null,
      firstSnack: null,
      secondSnack: null,
    };

    setDays((prev) => [...prev, newDay]);

    // TODO: Send newDay to your API to persist in DB
  }

  function handleAddDay() {
    const nextIndex = days.length;
    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + nextIndex);

    const newDay = {
      _id: `local-day-${nextIndex}`, // temporary ID before DB save
      date: newDate,
      column: `day-${nextIndex}`,
      breakfast: null,
      lunch: null,
      dinner: null,
      firstSnack: null,
      secondSnack: null,
    };

    setDays((prev) => [...prev, newDay]);

    // TODO: send this to your backend
  }
  return (
    <main className="flex flex-col h-screen mr-10 ml-10">
      <Header />
      <div className="h-screen  ">
        <div className="p-2 flex  gap-3 overflow-scroll rounded-xl bg-neutral-100 ">
          <Column
            title="Fridge"
            column="fridge"
            cards={cards}
            setCards={setCards}
            mealSections={["unassigned"]}
          />
          {days.map((day) => (
            <Column
              key={day.column}
              title={day.title}
              column={day.column}
              cards={cards}
              setCards={setCards}
              mealSections={MEAL_SECTIONS}
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
    </main>
  );
};

export default Dashboard;
