"use client";

import { Tabs as TabsPrimitives } from "radix-ui";
import { tv, VariantProps } from "tailwind-variants";
import { createContextFactory } from "../../lib/context";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { motion } from "motion/react";

const tabsVariants = tv({
  base: cn(
    "text-subtle relative inline-flex items-center justify-center border-transparent font-semibold whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:text-main data-[state=active]:border-main",
    "data-[state=inactive]:hover:text-sub"
  ),
  variants: {
    size: {
      medium: "h-10 text-sm px-3",
      large: "h-12 text-base px-5",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type TabsProps = Omit<
  TabsPrimitives.TabsProps,
  "onChange" | "onValueChange"
> & {
  onChange?: (value: string) => void;
};

const Tabs = ({
  className,
  children,
  value,
  onChange,
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(value);

  const onValueChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext value={{ activeTab }}>
      <TabsPrimitives.Root
        className={cn("w-full", className)}
        value={activeTab}
        onValueChange={onValueChange}
        {...props}
      >
        {children}
      </TabsPrimitives.Root>
    </TabsContext>
  );
};

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitives.List> &
  VariantProps<typeof tabsVariants> & {
    fullWidth?: boolean;
  };

const TabsList = ({
  className,
  children,
  fullWidth = false,
  size,
  ...props
}: TabsListProps) => {
  return (
    <TabsListContext value={{ fullWidth, size }}>
      <TabsPrimitives.List
        className={cn(
          "border-border bg-background inline-flex items-center justify-center border-b",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitives.List>
    </TabsListContext>
  );
};

type TabsTriggerProps = React.ComponentPropsWithRef<
  typeof TabsPrimitives.Trigger
>;

const TabsTrigger = ({
  className,
  children,
  value,
  ...props
}: TabsTriggerProps) => {
  const { activeTab } = useTabsContext();
  const { fullWidth, size } = useTabsListContext();

  return (
    <TabsPrimitives.Trigger
      value={value}
      className={cn(tabsVariants({ size, className }), fullWidth && "w-full")}
      {...props}
    >
      {children}
      {activeTab === value && (
        <motion.span
          layoutId="bubble"
          className="absolute h-[2px] left-0 right-0 bottom-0 bg-white mix-blend-difference"
          style={{ borderRadius: 9999 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </TabsPrimitives.Trigger>
  );
};

type TabsContentProps = React.ComponentPropsWithRef<
  typeof TabsPrimitives.Content
>;

const TabsContent = ({ className, children, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={className} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

type TabsListContextValue = {
  fullWidth: boolean;
  size: VariantProps<typeof tabsVariants>["size"];
};

const [TabsListContext, useTabsListContext] =
  createContextFactory<TabsListContextValue>("TabsList");

type TabsContextValue = {
  activeTab?: string;
};

const [TabsContext, useTabsContext] =
  createContextFactory<TabsContextValue>("Tabs");

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs };
