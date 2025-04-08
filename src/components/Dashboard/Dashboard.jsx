import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
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
    mealType: "breakfast",
  },
  {
    title: "Italian Pasta",
    note: " with marinara sauce",
    id: "2",
    column: "fridge",
    mealType: "breakfast",
  },
  {
    title: "Spaghetti",
    note: " with marinara sauce",
    id: "3",
    column: "fridge",
    mealType: "lunch",
  },
  {
    title: "Salad",
    note: " with tomato and lettuce",
    id: "4",
    column: "fridge",
    mealType: "lunch",
  },
];

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [cards, setCards] = useState(DEFAULT_CARDS);

  function handleAddDay() {
    //TODO: create new column
    console.log("add day");
  }

  return (
    <>
      <Header />
      <main className="h-screen w-full">
        <div className="flex h-full w-full gap-3 overflow-scroll p-2 rounded-xl bg-neutral-100">
          <Column
            title="Fridge"
            column="fridge"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="Today"
            column="today"
            cards={cards}
            setCards={setCards}
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
