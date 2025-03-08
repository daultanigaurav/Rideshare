"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (source) searchParams.set("source", source)
    if (destination) searchParams.set("destination", destination)
    if (date) searchParams.set("date", format(date, "yyyy-MM-dd"))

    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />

      <div className="container relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Your Perfect <span className="text-primary">Ride</span> Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Connect with drivers going your way. Save money, reduce traffic, and make new friends along the journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="/search">Find a Ride</Link>
              </Button>
              {user?.role === "driver" ? (
                <Button size="lg" variant="outline" asChild>
                  <Link href="/rides/create">Offer a Ride</Link>
                </Button>
              ) : (
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register?role=driver">Become a Driver</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border">
            <h2 className="text-2xl font-bold mb-6">Where do you want to go?</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Input placeholder="From" value={source} onChange={(e) => setSource(e.target.value)} />
              </div>
              <div>
                <Input placeholder="To" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Search className="mr-2 h-4 w-4" /> Search Rides
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

