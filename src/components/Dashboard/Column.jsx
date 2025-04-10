import { useState } from "react";
import MealCard from "./MealCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Column({
  title,
  cards,
  column,
  setCards,
  mealSections = ["unassigned"],
}) {
  const [active, setActive] = useState(false);

  function handleEdit(id) {
    //TODO: open popup to edit/delete meal
    console.log(id);
  }

  function handleAddMeal() {
    //TODO: open popup
    console.log("add meal");
  }

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleDragEnd = (e) => {
    const raw = e.dataTransfer.getData("card");
    const draggedCard = JSON.parse(raw);
    const cardId = draggedCard.id;

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    let mealType = e.target?.dataset?.mealtype;

    if (!mealType) {
      if (column === "fridge") {
        mealType = "unassigned";
      } else {
        return;
      }
    }

    draggedCard.mealType = mealType;

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column, mealType };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
      console.log("card moved", cards);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div
      className={`flex flex-col p-2 ${
        active ? "bg-neutral-200/50" : "bg-neutral-200/0"
      }`}
    >
      <div className="w-56 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium`}>{title}</h3>
          <span className="rounded text-sm">{filteredCards.length}</span>
        </div>
        {title === "Fridge" && (
          <Button
            onClick={handleAddMeal}
            variant="outline"
            className="w-full !justify-start mb-2"
          >
            <Plus />
            Add Item
          </Button>
        )}
      </div>

      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="h-full w-full transition-colors flex flex-col gap-2"
      >
        {mealSections.map((mealType) => {
          const cardsForMeal = filteredCards.filter(
            (c) => c.mealType === mealType
          );

          return (
            <div key={mealType} className="mb-4">
              {cardsForMeal.length > 0 && mealType !== "unassigned" && (
                <h4 className="text-sm font-semibold capitalize text-neutral-500 mb-1">
                  {mealType}
                </h4>
              )}

              <div
                data-mealtype={mealType}
                key={mealType}
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`min-h-24 flex flex-col gap-2 p-1 rounded-2xl transition-all relative  ${
                  active
                    ? "border-emerald-600 bg-emerald-500/10 text-emerald-500"
                    : "border-neutral-600 bg-neutral-500/10 text-neutral-400"
                }`}
              >
                {mealType !== "unassigned" && (
                  <div className="absolute text-white inset-0 flex items-center justify-center pointer-events-none text-2xl font-bold capitalize whitespace-nowrap select-none">
                    {mealType}
                  </div>
                )}
                {cardsForMeal.map((c) => (
                  <MealCard
                    key={c.id}
                    {...c}
                    onEdit={handleEdit}
                    handleDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
}

const DropIndicator = ({ beforeId, column }) => {
  return <div data-before={beforeId || "-1"} data-column={column} />;
};
