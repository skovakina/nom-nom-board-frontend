import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselComponent = () => {
  const reviews = [
    {
      review: "Efficient and Easy to Use!",
      user: "John D.",
      image: "/images/1.png",
    },
    {
      review: "Perfect for Healthy Eating!",
      user: "Jane S.",
      image: "/images/2.png",
    },
    {
      review: "Convenient and Time-Saving!",
      user: "Alice J.",
      image: "/images/3.png",
    },
    {
      review: "My Go-To App for Meal Planning!",
      user: "Bob F.",
      image: "/images/4.png",
    },
    {
      review: "Meal Planning Made Fun!",
      user: "Charlie K.",
      image: "/images/5.png",
    },
  ];

  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1 w-full">
          {reviews.map((reviewObj, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="p-1">
                <Card className="flex h-full justify-center items-center">
                  <CardContent className="flex flex-col justify-center items-center p-6 text-center">
                    <div className="relative bg-muted w-full rounded overflow-hidden">
                      <img
                        src={reviewObj.image}
                        alt={`Review by ${reviewObj.user}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xl" style={{ fontSize: "80%" }}>
                      {reviewObj.review}
                    </span>
                    <div className="mt-1">
                      <span
                        className="font-bold text-lg"
                        style={{ fontSize: "60%" }}
                      >
                        - {reviewObj.user}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default CarouselComponent;
