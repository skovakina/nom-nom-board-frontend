import { useState } from "react";
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

const Dashboard = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  function handleAddDay() {
    //TODO: create new column
    console.log("add day");
  }

  return (
    <>
      <Header />
      <main className="h-screen w-full">
        <div className="p-2 flex h-full w-full gap-3 overflow-scroll rounded-xl bg-neutral-100 ">
          <Column
            title="Fridge"
            column="fridge"
            cards={cards}
            setCards={setCards}
            mealSections={["unassigned"]}
          />
          <Column
            title="Today"
            column="today"
            cards={cards}
            setCards={setCards}
            mealSections={[
              "breakfast",
              "first snack",
              "lunch",
              "second snack",
              "dinner",
            ]}
          />
          <Button
            onClick={handleAddDay}
            className="w-full !justify-start w-56 shrink-0"
          >
            <Plus />
            Add Day
          </Button>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
