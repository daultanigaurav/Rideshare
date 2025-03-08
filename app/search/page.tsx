"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon, Car, Clock, Filter, MapPin, Star, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Ride = {
  id: string
  driver: {
    id: string
    name: string
    avatar?: string
    rating: number
    verified: boolean
  }
  source: string
  destination: string
  date: string
  departureTime: string
  arrivalTime: string
  price: number
  availableSeats: number
  femaleOnly: boolean
  carModel: string
  carColor: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { toast } = useToast()

  // Search form state
  const [source, setSource] = useState(searchParams.get("source") || "")
  const [destination, setDestination] = useState(searchParams.get("destination") || "")
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date") as string) : undefined,
  )

  // Filter state
  const [priceRange, setPriceRange] = useState([0, 100])
  const [femaleOnly, setFemaleOnly] = useState(false)
  const [minSeats, setMinSeats] = useState("1")
  const [sortBy, setSortBy] = useState("price")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Results state
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    // If URL has search params, trigger search automatically
    if (searchParams.has("source") && searchParams.has("destination")) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    if (!source || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both source and destination",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      // This would be an API call to your Django backend
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockRides: Ride[] = [
        {
          id: "ride-1",
          driver: {
            id: "driver-1",
            name: "Michael Chen",
            avatar: "/placeholder-user.jpg",
            rating: 4.8,
            verified: true,
          },
          source,
          destination,
          date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          departureTime: "08:00",
          arrivalTime: "10:30",
          price: 35,
          availableSeats: 3,
          femaleOnly: false,
          carModel: "Toyota Camry",
          carColor: "Blue",
        },
        {
          id: "ride-2",
          driver: {
            id: "driver-2",
            name: "Sarah Johnson",
            avatar: "/placeholder-user.jpg",
            rating: 4.9,
            verified: true,
          },
          source,
          destination,
          date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          departureTime: "09:15",
          arrivalTime: "11:45",
          price: 42,
          availableSeats: 2,
          femaleOnly: true,
          carModel: "Honda Civic",
          carColor: "Silver",
        },
        {
          id: "ride-3",
          driver: {
            id: "driver-3",
            name: "David Wilson",
            avatar: "/placeholder-user.jpg",
            rating: 4.6,
            verified: true,
          },
          source,
          destination,
          date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          departureTime: "10:30",
          arrivalTime: "13:00",
          price: 28,
          availableSeats: 4,
          femaleOnly: false,
          carModel: "Ford Focus",
          carColor: "Red",
        },
        {
          id: "ride-4",
          driver: {
            id: "driver-4",
            name: "Emily Rodriguez",
            avatar: "/placeholder-user.jpg",
            rating: 4.7,
            verified: true,
          },
          source,
          destination,
          date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          departureTime: "12:00",
          arrivalTime: "14:30",
          price: 38,
          availableSeats: 1,
          femaleOnly: true,
          carModel: "Nissan Altima",
          carColor: "Black",
        },
      ]

      setRides(mockRides)
    } catch (error) {
      console.error("Error searching rides:", error)
      toast({
        title: "Error",
        description: "Failed to search for rides. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBookRide = (rideId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a ride",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call to book the ride
    toast({
      title: "Ride booked!",
      description: "Your ride has been successfully booked.",
    })
  }

  const filteredRides = rides
    .filter(
      (ride) =>
        ride.price >= priceRange[0] &&
        ride.price <= priceRange[1] &&
        (!femaleOnly || ride.femaleOnly) &&
        ride.availableSeats >= Number.parseInt(minSeats),
    )
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "departure") {
        return a.departureTime.localeCompare(b.departureTime)
      } else if (sortBy === "seats") {
        return b.availableSeats - a.availableSeats
      } else {
        return a.price - b.price
      }
    })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search and filters sidebar */}
            <div className="w-full md:w-80 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Find a Ride</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="source">From</Label>
                      <Input
                        id="source"
                        placeholder="City or location"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">To</Label>
                      <Input
                        id="destination"
                        placeholder="City or location"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
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
                    <Button className="w-full" onClick={handleSearch} disabled={loading}>
                      {loading ? "Searching..." : "Search Rides"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Filters - visible on desktop, toggleable on mobile */}
              <div className="md:block">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    {isFilterOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </div>

                <div className={cn("space-y-6", isFilterOpen ? "block" : "hidden md:block")}>
                  <div className="space-y-4">
                    <Label>
                      Price Range (${priceRange[0]} - ${priceRange[1]})
                    </Label>
                    <Slider
                      defaultValue={[0, 100]}
                      min={0}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Minimum Seats</Label>
                    <Select value={minSeats} onValueChange={setMinSeats}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 seat</SelectItem>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="3">3 seats</SelectItem>
                        <SelectItem value="4">4+ seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="femaleOnly"
                      checked={femaleOnly}
                      onCheckedChange={(checked) => setFemaleOnly(checked as boolean)}
                    />
                    <Label htmlFor="femaleOnly">Female passengers only</Label>
                  </div>

                  <div className="space-y-4">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price: Low to High</SelectItem>
                        <SelectItem value="departure">Departure Time</SelectItem>
                        <SelectItem value="seats">Available Seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Search results */}
            <div className="flex-1">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-2/3 space-y-4">
                            <div className="h-6 bg-muted rounded w-1/3"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                          </div>
                          <div className="w-full md:w-1/3 space-y-4">
                            <div className="h-6 bg-muted rounded w-full"></div>
                            <div className="h-10 bg-muted rounded w-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : searched ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {filteredRides.length} {filteredRides.length === 1 ? "ride" : "rides"} found
                    </h2>
                  </div>

                  {filteredRides.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRides.map((ride) => (
                        <Card key={ride.id} className="overflow-hidden transition-all hover:shadow-md">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={ride.driver.avatar} alt={ride.driver.name} />
                                      <AvatarFallback>
                                        {ride.driver.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{ride.driver.name}</div>
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                                        {ride.driver.rating}
                                      </div>
                                    </div>
                                  </div>
                                  {ride.femaleOnly && (
                                    <Badge variant="outline" className="ml-auto">
                                      Female only
                                    </Badge>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <div className="text-sm text-muted-foreground">From</div>
                                        <div className="font-medium">{ride.source}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <div className="font-medium">{ride.departureTime}</div>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <div className="text-sm text-muted-foreground">To</div>
                                        <div className="font-medium">{ride.destination}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <div className="font-medium">{ride.arrivalTime}</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  <div className="flex items-center gap-1 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(new Date(ride.date), "EEE, MMM d")}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Car className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {ride.carModel}, {ride.carColor}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {ride.availableSeats} {ride.availableSeats === 1 ? "seat" : "seats"} available
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-muted/30 p-6 flex flex-col justify-between md:w-64">
                                <div className="text-2xl font-bold text-center mb-2">${ride.price}</div>
                                <div className="text-sm text-center text-muted-foreground mb-4">per passenger</div>
                                <Button className="w-full" onClick={() => handleBookRide(ride.id)} disabled={!user}>
                                  Book Ride
                                </Button>
                                <Button variant="ghost" className="w-full mt-2" asChild>
                                  <Link href={`/rides/${ride.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <Car className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No rides found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        We couldn't find any rides matching your criteria. Try adjusting your filters or search for a
                        different route.
                      </p>
                      <Button
                        onClick={() => {
                          setPriceRange([0, 100])
                          setFemaleOnly(false)
                          setMinSeats("1")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Find your next ride</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Enter your departure and destination cities to find available rides.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
    >
      {children}
    </label>
  )
}

function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
  )
}

function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  return <img src={src || "/placeholder-user.jpg"} alt={alt || "Avatar"} className="aspect-square h-full w-full" />
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{children}</div>
}

