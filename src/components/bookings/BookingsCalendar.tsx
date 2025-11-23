"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Booking } from "@/data/bookings";

interface BookingsCalendarProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export function BookingsCalendar({
  bookings,
  onBookingClick,
}: BookingsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date("2024-03-10"));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookings.filter(
      (booking) =>
        booking.startDate === dateStr ||
        (booking.startDate <= dateStr && booking.endDate >= dateStr),
    );
  };

  const isToday = (day: number) => {
    const today = new Date("2024-03-10");
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      daycare: "bg-blue-500",
      boarding: "bg-purple-500",
      grooming: "bg-pink-500",
      vet: "bg-green-500",
    };
    return colors[service] || "bg-gray-500";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "border-yellow-500",
      confirmed: "border-blue-500",
      completed: "border-green-500",
      cancelled: "border-gray-500",
    };
    return colors[status] || "border-gray-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {monthName}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px]" />
          ))}

          {days.map((day) => {
            const dayBookings = getBookingsForDate(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={cn(
                  "min-h-[100px] border rounded-lg p-2 transition-all hover:shadow-md",
                  today && "bg-primary/5 border-primary",
                )}
              >
                <div
                  className={cn(
                    "text-sm font-semibold mb-1",
                    today && "text-primary",
                  )}
                >
                  {day}
                </div>
                <div className="space-y-1">
                  {dayBookings.slice(0, 3).map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={cn(
                        "w-full text-left p-1 rounded text-xs border-l-2 hover:bg-accent transition-colors",
                        getStatusColor(booking.status),
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full inline-block mr-1",
                          getServiceColor(booking.service),
                        )}
                      />
                      <span className="truncate">#{booking.id}</span>
                    </button>
                  ))}
                  {dayBookings.length > 3 && (
                    <div className="text-xs text-muted-foreground pl-1">
                      +{dayBookings.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm">Daycare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm">Boarding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-sm">Grooming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Vet</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
