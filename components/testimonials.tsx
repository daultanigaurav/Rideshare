import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Passenger",
      avatar: "/placeholder-user.jpg",
      content:
        "RideShare has completely changed my daily commute. I've saved so much money and met amazing people. The app is super easy to use and finding rides is a breeze!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Driver",
      avatar: "/placeholder-user.jpg",
      content:
        "As a driver, I love how RideShare helps me offset my travel costs. The platform is intuitive, and the booking system is seamless. I've had great experiences with all my passengers.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Passenger",
      avatar: "/placeholder-user.jpg",
      content:
        "I was skeptical at first, but RideShare has exceeded my expectations. The verification process makes me feel safe, and I've never had a bad experience in over 20 rides.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about RideShare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground flex-1">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

