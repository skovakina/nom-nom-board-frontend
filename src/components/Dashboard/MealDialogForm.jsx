// components/MealDialogForm.jsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function MealDialogForm({
  mode = "create", // or "edit"
  meal,
  onChange,
  onSubmit,
  onDelete,
  isSubmitting = false,
}) {
  const isEdit = mode === "edit";

  return (
    <Card className="shadow-none border-none ">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Meal" : "Add New Meal"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Meal title</Label>
          <Input
            id="title"
            placeholder="e.g. Chicken Curry"
            value={meal.title}
            onChange={(e) => onChange({ ...meal, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="note">Optional note</Label>
          <Input
            id="note"
            placeholder="e.g. with rice and vegetables"
            value={meal.note}
            onChange={(e) => onChange({ ...meal, note: e.target.value })}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEdit && (
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting}
          >
            Delete
          </Button>
        )}
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </CardFooter>
    </Card>
  );
}
