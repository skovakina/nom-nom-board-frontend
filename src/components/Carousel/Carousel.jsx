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
        { review: "Efficient and Easy to Use!", user: "John D." },
        { review: "Perfect for Healthy Eating!", user: "Jane S." },
        { review: "Convenient and Time-Saving!", user: "Alice J." },
        { review: "My Go-To App for Meal Planning!", user: "Bob F." },
        { review: "Meal Planning Made Fun!", user: "Charlie K." },
    ];

    return (

        <Carousel
            opts={{
                align: "start", 
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <CarouselContent className="-ml-1">
                {reviews.map((reviewObj, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="h-30">
                                <CardContent className="flex flex-col justify-center items-center p-6 h-full text-center">
                                    <span className="text-xl" style={{ fontSize: '80%' }}>{reviewObj.review}</span>
                                    <div className="mt-1">
                                        <span className="font-bold text-lg" style={{ fontSize: '60%' }}>- {reviewObj.user}</span>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    )
}


export default CarouselComponent;
