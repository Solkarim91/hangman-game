import { cn } from "@/lib/utils";
import { FC } from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-[#e6f4f1] text-card-foreground shadow-md p-5",
        className
      )}
    >
      {children}
    </div>
  );
};
