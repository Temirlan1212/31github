import * as React from "react";
import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AirVent } from "lucide-react";

export const works = [
  {
    artist: "Холодильник",
    icon: <AirVent />,
  },
  {
    artist: "Кондиционер",
    icon: <AirVent />,
  },
  {
    artist: "Vladimir Malyavko",
    icon: <AirVent />,
  },
];

export function CategoryNav() {
  return (
    <ScrollArea className="whitespace-nowrap w-[max-content] rounded-[20px] border bg-primary/5 border-0 backdrop-blur-md">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0 flex flex-col items-center">
            <div className="overflow-hidden">{artwork.icon}</div>
            <figcaption className="pt-2 text-xs text-center text-muted-foreground">
              <span className="text-foreground">{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
