"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift } from "@/lib/motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, padding = "md", children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.div
        ref={ref}
        variants={hoverable && !shouldReduceMotion ? hoverLift : undefined}
        initial={hoverable && !shouldReduceMotion ? "rest" : false}
        whileHover={hoverable && !shouldReduceMotion ? "hover" : undefined}
        className={cn(
          "bg-white rounded-2xl shadow-md",
          "border border-neutral-100",
          hoverable && "cursor-pointer",
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function CardTitle({ className, children, as: Tag = "h3" }: CardTitleProps) {
  return (
    <Tag className={cn("text-xl font-semibold text-primary-900", className)}>
      {children}
    </Tag>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-neutral-100", className)}>
      {children}
    </div>
  );
}
