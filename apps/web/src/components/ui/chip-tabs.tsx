"use client";

import { Tabs as TabsPrimitives } from "radix-ui";
import { tv, VariantProps } from "tailwind-variants";
import { createContextFactory } from "../../lib/context";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { motion } from "motion/react";

const chipTabsVariants = tv({
  base: cn(
    "inline-flex relative items-center justify-center rounded-full border border-transparent font-medium transition-colors whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  variants: {
    size: {
      medium: "h-9 px-3.5 text-sm",
      large: "h-10 px-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type ChipTabsProps = Omit<
  TabsPrimitives.TabsProps,
  "onChange" | "onValueChange"
> & {
  onChange?: (value: string) => void;
};

const ChipTabs = ({
  className,
  children,
  value,
  onChange,
  ...props
}: ChipTabsProps) => {
  const [activeTab, setActiveTab] = useState(value);

  const onValueChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <ChipTabsContext value={{ activeTab }}>
      <TabsPrimitives.Root
        className={cn("w-full", className)}
        onValueChange={onValueChange}
        {...props}
      >
        {children}
      </TabsPrimitives.Root>
    </ChipTabsContext>
  );
};

type ChipTabsListProps = React.ComponentPropsWithRef<
  typeof TabsPrimitives.List
> &
  VariantProps<typeof chipTabsVariants>;

const ChipTabsList = ({
  className,
  children,
  size,
  ...props
}: ChipTabsListProps) => {
  return (
    <ChipTabsListContext value={{ size }}>
      <TabsPrimitives.List
        className={cn(
          "bg-background inline-flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitives.List>
    </ChipTabsListContext>
  );
};

type ChipTabsTriggerProps = React.ComponentPropsWithRef<
  typeof TabsPrimitives.Trigger
>;

const ChipTabsTrigger = ({
  className,
  children,
  value,
  ...props
}: ChipTabsTriggerProps) => {
  const { activeTab } = useChipTabsContext();
  const { size } = useChipTabsListContext();

  return (
    <TabsPrimitives.Trigger
      className={cn(chipTabsVariants({ size, className }))}
      value={value}
      {...props}
    >
      {children}
      {activeTab === value && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 z-10 mix-blend-difference bg-white"
          style={{ borderRadius: 9999 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </TabsPrimitives.Trigger>
  );
};

type ChipTabsContentProps = React.ComponentPropsWithRef<
  typeof TabsPrimitives.Content
>;

const ChipTabsContent = ({
  className,
  children,
  ...props
}: ChipTabsContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={className} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

type ChipTabsListContextValue = {
  size: VariantProps<typeof chipTabsVariants>["size"];
};

const [ChipTabsListContext, useChipTabsListContext] =
  createContextFactory<ChipTabsListContextValue>("ChipTabsList");

type ChipTabsContextValue = {
  activeTab?: string;
};

const [ChipTabsContext, useChipTabsContext] =
  createContextFactory<ChipTabsContextValue>("ChipTabs");

ChipTabs.List = ChipTabsList;
ChipTabs.Trigger = ChipTabsTrigger;
ChipTabs.Content = ChipTabsContent;

export { ChipTabs };
