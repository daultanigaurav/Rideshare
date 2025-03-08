import { Car, MapPin, Calendar, CreditCard } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Enter your route",
      description: "Tell us where you're going from and to, and when you want to leave.",
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Choose a ride",
      description: "We'll show you all available rides matching your criteria. Pick the one that suits you best.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Book securely",
      description: "Book and pay for your ride in just a few clicks. Your payment is secure and protected.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Travel together",
      description: "Meet your driver at the agreed pickup point and enjoy your journey together.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How RideShare Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Carpooling made simple. Follow these easy steps to find your perfect ride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border transition-all hover:shadow-md"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

