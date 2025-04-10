import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
// eslint-disable-next-line
import { motion } from "framer-motion";

export default function MealCard({ handleDragStart, onEdit, ...props }) {
  const { title, note, id } = props;
  //add delete button that appear on hover of card

  return (
    <motion.div
      layout
      layoutId={props.id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { ...props })}
    >
      <Card className="relative group cursor-pointer">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(id)}
          className="cursor-pointer absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity "
        >
          <SquarePen className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{note}</CardDescription>
        </CardHeader>
        <CardContent>{/* <Badge></Badge> */}</CardContent>
      </Card>
    </motion.div>
  );
}
