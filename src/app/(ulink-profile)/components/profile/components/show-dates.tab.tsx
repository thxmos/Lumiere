import { ThemeNoId } from "@/modules/shared/types/entities/theme";
import Link from "next/link";
import { Ticket } from "lucide-react";

/*
TODO: use theme styles not primary, secondary, etc.
*/

export function ShowDatesTab({ theme }: { theme: ThemeNoId }) {
  const shows = [
    {
      date: "2023-07-15",
      venue: "The Grand Hall",
      city: "New York, NY",
      ticketUrl: "https://www.ticketmaster.com",
    },
    {
      date: "2023-07-22",
      venue: "Starlight Arena",
      city: "Los Angeles, CA",
      ticketUrl: "https://www.ticketmaster.com",
    },
    {
      date: "2023-07-29",
      venue: "Moonlight Theater",
      city: "Chicago, IL",
      ticketUrl: "https://www.ticketmaster.com",
    },
  ];

  return (
    <div className="space-y-4">
      {shows.map((show, index) => (
        <div
          key={index}
          className="bg-white bg-opacity-10 p-4 rounded-lg flex justify-between items-center"
        >
          <div className="flex flex-col">
            <p className="text-white font-semibold">
              {new Date(show.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">{show.venue}</p>
            <p className="text-gray-300">{show.city}</p>
          </div>
          <Link href={show.ticketUrl} target="_blank">
            <Ticket className="w-8 h-8 text-foreground hover:text-primary transition-all cursor-pointer" />
          </Link>
        </div>
      ))}
    </div>
  );
}
