import { HeroSection } from "@/components/hero-section"
import { PopularRoutes } from "@/components/popular-routes"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <PopularRoutes />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

