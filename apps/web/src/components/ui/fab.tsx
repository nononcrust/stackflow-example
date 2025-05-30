"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "../../lib/utils";

type FabProps = HTMLMotionProps<"button"> &
  VariantProps<typeof fabVariants> & {
    asChild?: boolean;
    withLabel?: boolean;
  };

const fabVariants = tv({
  base: cn(
    "select-none flex items-center justify-center gap-2 rounded-full font-semibold transition-colors text-lg whitespace-nowrap shrink-0",
    "shadow-fab"
  ),
  variants: {
    variant: {
      primary: "bg-primary text-white md:hover:bg-primary-dark",
      secondary: "bg-background text-main md:hover:bg-background-hover",
    },
    size: {
      small: "w-10 h-10",
      medium: "w-12 h-12",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

const Fab = ({
  className,
  children,
  variant,
  size,
  withLabel = false,
  ...props
}: FabProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        fabVariants({ variant, size, className }),
        withLabel && "w-fit px-5"
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const FabContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    // Floating Action Button 컨테이너에 SafeArea + 하단탭 높이 적용 필요함
    <div className="pointer-events-none fixed bottom-26 right-4 flex flex-col items-center gap-3 *:pointer-events-auto">
      {children}
    </div>
  );
};

Fab.Container = FabContainer;

export { Fab };
