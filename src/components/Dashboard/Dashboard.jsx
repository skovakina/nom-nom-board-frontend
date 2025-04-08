import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import MealCard from "../MealCard/MealCard";
import Column from "./Column";

//add menu cards
const DEFAULT_CARDS = [
  { title: "Baked Potato", id: "1", column: "backlog" },
  { title: "Italian Pizza", id: "2", column: "backlog" },
  { title: "Steak", id: "3", column: "backlog" },
  { title: "Spaghetti", id: "4", column: "backlog" },
  { title: "Baked Potato", id: "5", column: "backlog" },
  { title: "Italian Pizza", id: "6", column: "backlog" },
];

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <main className="h-screen w-full bg-neutral-900 text-neutral-50">
        <div className="flex h-full w-full gap-3 overflow-scroll p-12">
          <Column
            title="Backlog"
            column="backlog"
            headingColor="text-neutral-500"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="TODO"
            column="todo"
            headingColor="text-yellow-200"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="In progress"
            column="doing"
            headingColor="text-blue-200"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="Complete"
            column="done"
            headingColor="text-emerald-200"
            cards={cards}
            setCards={setCards}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
