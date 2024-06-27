import * as React from "react";

import { cn } from "@/lib/utils";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type CardProps<C extends React.ElementType> = React.PropsWithChildren<
  AsProp<C>
> & {
  className?: string;
  ref?: React.ComponentPropsWithRef<C>["ref"];
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "ref">;

type CardComponent = (<C extends React.ElementType = "div">(
  props: CardProps<C>
) => React.ReactElement) & {
  displayName?: string;
};

const Card: CardComponent = React.forwardRef(
  <C extends React.ElementType = "div">(
    { as, className, children, ...props }: CardProps<C>,
    ref: React.ComponentPropsWithRef<C>["ref"]
  ) => {
    const Component = as || "div";
    return (
      <Component
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as CardComponent;

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

type CardContentProps<C extends React.ElementType> = React.PropsWithChildren<
  AsProp<C>
> & {
  ref?: React.ComponentPropsWithRef<C>["ref"];
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className">;

type CardContentComponent = (<C extends React.ElementType = "div">(
  props: CardContentProps<C>
) => React.ReactElement) & {
  displayName?: string;
};

const CardContent: CardContentComponent = React.forwardRef(
  <C extends React.ElementType = "div">(
    { as, className, children, ...props }: CardContentProps<C>,
    ref: React.ComponentPropsWithRef<C>["ref"]
  ) => {
    const Component = as || "div";
    return (
      <Component ref={ref} className={cn("p-6 pt-0", className)} {...props}>
        {children}
      </Component>
    );
  }
) as CardContentComponent;

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
