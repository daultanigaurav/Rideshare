"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Calendar, Car, Clock, MapPin, Plus, Star, User, Users } from "lucide-react"

type Ride = {
  id: string
  source: string
  destination: string
  date: string
  departureTime: string
  price: number
  availableSeats: number
  bookedSeats: number
  status: "upcoming" | "completed" | "cancelled"
}

type Booking = {
  id: string
  ride: {
    id: string
    source: string
    destination: string
    date: string
    departureTime: string
    driver: {
      id: string
      name: string
      avatar?: string
      rating: number
    }
  }
  passengers: number
  totalPrice: number
  status: "confirmed" | "completed" | "cancelled"
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [myRides, setMyRides] = useState<Ride[]>([])
  const [myBookings, setMyBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchDashboardData = async () => {
      try {
        // This would be API calls to your Django backend
        // Simulating API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (user.role === "driver") {
          // Mock driver rides
          const mockRides: Ride[] = [
            {
              id: "ride-1",
              source: "New York",
              destination: "Boston",
              date: new Date(Date.now() + 86400000 * 2).toISOString(),
              departureTime: "08:00",
              price: 35,
              availableSeats: 2,
              bookedSeats: 1,
              status: "upcoming",
            },
            {
              id: "ride-2",
              source: "Boston",
              destination: "New York",
              date: new Date(Date.now() + 86400000 * 5).toISOString(),
              departureTime: "10:30",
              price: 35,
              availableSeats: 3,
              bookedSeats: 0,
              status: "upcoming",
            },
            {
              id: "ride-3",
              source: "New York",
              destination: "Philadelphia",
              date: new Date(Date.now() - 86400000 * 3).toISOString(),
              departureTime: "09:15",
              price: 25,
              availableSeats: 0,
              bookedSeats: 3,
              status: "completed",
            },
          ]
          setMyRides(mockRides)
        }

        // Mock bookings for all users
        const mockBookings: Booking[] = [
          {
            id: "booking-1",
            ride: {
              id: "ride-4",
              source: "Chicago",
              destination: "Detroit",
              date: new Date(Date.now() + 86400000 * 1).toISOString(),
              departureTime: "14:00",
              driver: {
                id: "driver-1",
                name: "Michael Chen",
                avatar: "/placeholder-user.jpg",
                rating: 4.8,
              },
            },
            passengers: 1,
            totalPrice: 30,
            status: "confirmed",
          },
          {
            id: "booking-2",
            ride: {
              id: "ride-5",
              source: "San Francisco",
              destination: "Los Angeles",
              date: new Date(Date.now() - 86400000 * 7).toISOString(),
              departureTime: "07:30",
              driver: {
                id: "driver-2",
                name: "Sarah Johnson",
                avatar: "/placeholder-user.jpg",
                rating: 4.9,
              },
            },
            passengers: 2,
            totalPrice: 90,
            status: "completed",
          },
        ]
        setMyBookings(mockBookings)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, router, toast])

  // Redirect if not logged in
  if (!user) {
    return null
  }

  const upcomingRides = myRides.filter((ride) => ride.status === "upcoming")
  const pastRides = myRides.filter((ride) => ride.status !== "upcoming")

  const upcomingBookings = myBookings.filter((booking) => booking.status === "confirmed")
  const pastBookings = myBookings.filter((booking) => booking.status !== "confirmed")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}!</p>
            </div>

            {user.role === "driver" && (
              <Button asChild>
                <Link href="/rides/create">
                  <Plus className="mr-2 h-4 w-4" /> Create a Ride
                </Link>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{user.role === "driver" ? "My Rides" : "My Bookings"}</CardTitle>
                <CardDescription>
                  {user.role === "driver" ? "Manage the rides you've created" : "View your upcoming and past bookings"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-4">
                          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>

                    {user.role === "driver" ? (
                      <>
                        <TabsContent value="upcoming" className="space-y-4">
                          {upcomingRides.length > 0 ? (
                            upcomingRides.map((ride) => <RideCard key={ride.id} ride={ride} isDriver={true} />)
                          ) : (
                            <EmptyState
                              icon={<Car className="h-8 w-8 text-muted-foreground" />}
                              title="No upcoming rides"
                              description="You haven't created any upcoming rides yet."
                              action={
                                <Button asChild>
                                  <Link href="/rides/create">Create a Ride</Link>
                                </Button>
                              }
                            />
                          )}
                        </TabsContent>

                        <TabsContent value="past" className="space-y-4">
                          {pastRides.length > 0 ? (
                            pastRides.map((ride) => <RideCard key={ride.id} ride={ride} isDriver={true} />)
                          ) : (
                            <EmptyState
                              icon={<Calendar className="h-8 w-8 text-muted-foreground" />}
                              title="No past rides"
                              description="You haven't completed any rides yet."
                            />
                          )}
                        </TabsContent>
                      </>
                    ) : (
                      <>
                        <TabsContent value="upcoming" className="space-y-4">
                          {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
                          ) : (
                            <EmptyState
                              icon={<Car className="h-8 w-8 text-muted-foreground" />}
                              title="No upcoming bookings"
                              description="You haven't booked any upcoming rides yet."
                              action={
                                <Button asChild>
                                  <Link href="/search">Find a Ride</Link>
                                </Button>
                              }
                            />
                          )}
                        </TabsContent>

                        <TabsContent value="past" className="space-y-4">
                          {pastBookings.length > 0 ? (
                            pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
                          ) : (
                            <EmptyState
                              icon={<Calendar className="h-8 w-8 text-muted-foreground" />}
                              title="No past bookings"
                              description="You haven't completed any bookings yet."
                            />
                          )}
                        </TabsContent>
                      </>
                    )}
                  </Tabs>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                      <Badge variant="outline" className="mt-1">
                        {user.role === "driver" ? "Driver" : "Passenger"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" /> Edit Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {user.role === "driver" ? (
                    <>
                      <Button className="w-full" asChild>
                        <Link href="/rides/create">
                          <Plus className="mr-2 h-4 w-4" /> Create a Ride
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/bookings">
                          <Users className="mr-2 h-4 w-4" /> View Bookings
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" asChild>
                        <Link href="/search">
                          <Car className="mr-2 h-4 w-4" /> Find a Ride
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/bookings">
                          <Calendar className="mr-2 h-4 w-4" /> View Bookings
                        </Link>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    In case of emergency, you can quickly share your location with trusted contacts.
                  </p>
                  <Button variant="destructive" className="w-full">
                    <AlertCircle className="mr-2 h-4 w-4" /> Emergency Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function RideCard({ ride, isDriver }: { ride: Ride; isDriver: boolean }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="font-medium">
                {ride.source} to {ride.destination}
              </div>
              <Badge
                variant={
                  ride.status === "upcoming" ? "outline" : ride.status === "completed" ? "secondary" : "destructive"
                }
              >
                {ride.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(ride.date), "EEE, MMM d")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{ride.departureTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {ride.bookedSeats}/{ride.bookedSeats + ride.availableSeats} seats booked
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <div className="text-lg font-bold">${ride.price} per seat</div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/rides/${ride.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="font-medium">
                {booking.ride.source} to {booking.ride.destination}
              </div>
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "outline"
                    : booking.status === "completed"
                      ? "secondary"
                      : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.ride.driver.avatar} alt={booking.ride.driver.name} />
                <AvatarFallback>
                  {booking.ride.driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                Driver: {booking.ride.driver.name}
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                  <span className="text-xs">{booking.ride.driver.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(booking.ride.date), "EEE, MMM d")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{booking.ride.departureTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {booking.passengers} {booking.passengers === 1 ? "passenger" : "passengers"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <div className="text-lg font-bold">Total: ${booking.totalPrice}</div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/bookings/${booking.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">{description}</p>
      {action}
    </div>
  )
}

