"use client";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Button } from "./button";

export interface IBurger extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

const Burger: FC<IBurger> = ({ isOpen, className }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const transitions = [
    open ? "rotate-45 translate-y-0.5" : "-translate-y-1",
    open ? "opacity-0" : "opacity-100",
    open ? "-rotate-45 -translate-y-0.5" : "translate-y-1",
  ];

  return (
    <Button variant="outline" className={`flex flex-col p-[5px] justify-center items-center ${className}`} onClick={handleToggle}>
      {transitions.map((tansition, idx) => (
        <span key={idx} className={`bg-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${tansition}`}></span>
      ))}
    </Button>
  );
};

export default Burger;
