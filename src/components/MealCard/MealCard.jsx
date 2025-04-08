"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MealCard({ handleDragStart, ...props }) {
  const { title, id, column } = props;

  return (
    <motion.div
      layout
      layoutId={props.id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { title, id, column })}
    >
      <Card>
        <CardHeader>
          <CardTitle>BakedPotato</CardTitle>
          <CardDescription>with cheese and parsley</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge>Vegetarian</Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
