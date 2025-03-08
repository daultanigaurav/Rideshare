"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import { format } from "date-fns"

type PopularRoute = {
  id: string
  source: string
  destination: string
  date: string
  price: number
  availableSeats: number
  totalRides: number
}

export function PopularRoutes() {
  const [routes, setRoutes] = useState<PopularRoute[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchPopularRoutes = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockRoutes = [
          {
            id: "1",
            source: "New York",
            destination: "Boston",
            date: new Date(Date.now() + 86400000 * 2).toISOString(),
            price: 35,
            availableSeats: 3,
            totalRides: 24,
          },
          {
            id: "2",
            source: "San Francisco",
            destination: "Los Angeles",
            date: new Date(Date.now() + 86400000 * 3).toISOString(),
            price: 45,
            availableSeats: 2,
            totalRides: 18,
          },
          {
            id: "3",
            source: "Chicago",
            destination: "Detroit",
            date: new Date(Date.now() + 86400000 * 1).toISOString(),
            price: 30,
            availableSeats: 4,
            totalRides: 15,
          },
          {
            id: "4",
            source: "Seattle",
            destination: "Portland",
            date: new Date(Date.now() + 86400000 * 4).toISOString(),
            price: 25,
            availableSeats: 3,
            totalRides: 12,
          },
        ]

        setRoutes(mockRoutes)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching popular routes:", error)
        setLoading(false)
      }
    }

    fetchPopularRoutes()
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Routes</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover the most traveled routes with plenty of rides available.
            </p>
          </div>
          <Button asChild>
            <Link href="/search">View All Routes</Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-[200px] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                  <div className="h-8 bg-muted rounded w-full mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={`/search?source=${route.source}&destination=${route.destination}&date=${format(new Date(route.date), "yyyy-MM-dd")}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-md group-hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs font-normal">
                        {route.totalRides} rides available
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex items-center">
                        <span className="font-medium">{route.source}</span>
                        <ArrowRight className="h-4 w-4 mx-2" />
                        <span className="font-medium">{route.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{format(new Date(route.date), "EEE, MMM d")}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>From ${route.price} per seat</span>
                    </div>

                    <Button variant="ghost" className="mt-auto justify-start p-0 group-hover:text-primary">
                      View rides <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

