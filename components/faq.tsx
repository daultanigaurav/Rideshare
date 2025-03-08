"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How does RideShare work?",
      answer:
        "RideShare connects drivers with empty seats to passengers traveling the same way. Drivers offer rides and set a price per seat, while passengers can search for rides, book a seat, and pay securely through our platform. It's a win-win: drivers offset their travel costs, and passengers get an affordable ride.",
    },
    {
      question: "Is RideShare safe?",
      answer:
        "Safety is our top priority. We verify all users through a robust verification process, including ID verification and phone number confirmation. Users can also rate each other after rides, building a trusted community. Additionally, our platform includes an emergency contact feature and the ability to share your journey with trusted contacts.",
    },
    {
      question: "How much does it cost to use RideShare?",
      answer:
        "RideShare is free to sign up and search for rides. Passengers only pay for the rides they book, and the price per seat is set by the driver. We add a small service fee to each booking to maintain the platform. Drivers receive their payment after the ride is completed, minus our service fee.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking, but our cancellation policy applies. Cancellations made more than 24 hours before departure are fully refunded. For cancellations within 24 hours, a partial refund is provided. Drivers can also cancel rides, but frequent cancellations may affect their rating.",
    },
    {
      question: "What if my driver doesn't show up?",
      answer:
        "If your driver doesn't show up, please contact our support team immediately. We'll help you find an alternative ride or provide a full refund. We take reliability very seriously, and drivers who fail to show up without proper notification may be removed from our platform.",
    },
    {
      question: "Can I bring luggage with me?",
      answer:
        "Yes, you can bring luggage, but it's important to inform your driver in advance about the amount and size of your luggage. Drivers specify how much luggage space they have available in their ride listings. If you're unsure, you can always message the driver before booking.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our
            support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

