"use client";

import { AlertDialog as AlertDialogPrimitives } from "radix-ui";
import React, { useEffect } from "react";
import { createContextFactory } from "../../lib/context";
import { cn } from "../../lib/utils";
import { Button } from "./button";

type PromptProps = Omit<AlertDialogPrimitives.AlertDialogProps, "open"> & {
  isOpen?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

const Prompt = ({ children, isOpen, triggerRef, ...props }: PromptProps) => {
  return (
    <PromptContext value={{ triggerRef }}>
      <AlertDialogPrimitives.Root open={isOpen} {...props}>
        {children}
      </AlertDialogPrimitives.Root>
    </PromptContext>
  );
};

type PromptOverlayProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitives.Overlay
>;

const PromptOverlay = ({
  className,
  children,
  ...props
}: PromptOverlayProps) => {
  const { triggerRef } = useDialogContext();
  const { animation } = usePromptContentContext();

  useEffect(() => {
    if (!triggerRef) return;

    const triggerElement = triggerRef.current;

    return () => {
      triggerElement?.focus();
    };
  }, [triggerRef]);

  return (
    <AlertDialogPrimitives.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/70",
        animation !== "none" && "animate-in fade-in",
        className
      )}
      data-testid="overlay"
      {...props}
    >
      {children}
    </AlertDialogPrimitives.Overlay>
  );
};

type PromptAnimation = "pop" | "slide" | "none";

type PromptContentProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitives.Content
> & {
  animation?: PromptAnimation;
};

const animationStyle: Record<PromptAnimation, string> = {
  pop: "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200",
  slide:
    "ease-out-expo data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-[37.5rem] duration-500!",
  none: "",
};

const PromptContent = ({
  className,
  children,
  animation = "pop",
  ...props
}: PromptContentProps) => {
  return (
    <PromptContentContext value={{ animation }}>
      <AlertDialogPrimitives.Portal>
        <PromptOverlay />
        <AlertDialogPrimitives.Content
          aria-modal
          className={cn(
            "bg-background fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100%-4rem)] w-[20rem] max-w-[calc(100%-4rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[0.75rem]",
            animationStyle[animation],
            className
          )}
          {...props}
        >
          {children}
        </AlertDialogPrimitives.Content>
      </AlertDialogPrimitives.Portal>
    </PromptContentContext>
  );
};

type PromptHeaderProps = React.ComponentPropsWithRef<"div">;

const PromptHeader = ({ className, children, ...props }: PromptHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props}>
      {children}
    </div>
  );
};

type PromptFooterProps = React.ComponentPropsWithRef<"div">;

const PromptFooter = ({ className, children, ...props }: PromptFooterProps) => {
  return (
    <div className={cn("flex justify-end gap-2 p-5", className)} {...props}>
      {children}
    </div>
  );
};

type PromptTitleProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitives.Title
>;

const PromptTitle = ({ className, children, ...props }: PromptTitleProps) => {
  return (
    <AlertDialogPrimitives.Title
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </AlertDialogPrimitives.Title>
  );
};

type PromptDescriptionProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitives.Description
>;

const PromptDescription = ({
  className,
  children,
  ...props
}: PromptDescriptionProps) => {
  return (
    <AlertDialogPrimitives.Description
      className={cn("text-sub text-sm", className)}
      {...props}
    >
      {children}
    </AlertDialogPrimitives.Description>
  );
};

type PromptTriggerProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitives.Trigger
>;

const PromptTrigger = ({ children, ...props }: PromptTriggerProps) => {
  return (
    <AlertDialogPrimitives.Trigger aria-controls={undefined} {...props}>
      {children}
    </AlertDialogPrimitives.Trigger>
  );
};

type PromptCancelProps = React.ComponentPropsWithRef<typeof Button>;

const PromptCancel = ({ className, children, ...props }: PromptCancelProps) => {
  return (
    <AlertDialogPrimitives.Cancel asChild>
      <Button
        className={cn("w-full", className)}
        size="large"
        variant="outlined"
        {...props}
      >
        {children}
      </Button>
    </AlertDialogPrimitives.Cancel>
  );
};

type PromptActionProps = React.ComponentPropsWithRef<typeof Button>;

const PromptAction = ({ className, children, ...props }: PromptActionProps) => {
  return (
    <AlertDialogPrimitives.Action asChild>
      <Button className={cn("w-full", className)} size="large" {...props}>
        {children}
      </Button>
    </AlertDialogPrimitives.Action>
  );
};

type PromptContextValue = {
  triggerRef: PromptProps["triggerRef"];
};

const [PromptContext, useDialogContext] =
  createContextFactory<PromptContextValue>("Prompt");

type PromptContentContextValue = {
  animation: PromptContentProps["animation"];
};

const [PromptContentContext, usePromptContentContext] =
  createContextFactory<PromptContentContextValue>("PromptContent");

Prompt.Trigger = PromptTrigger;
Prompt.Close = AlertDialogPrimitives.Cancel;
Prompt.Content = PromptContent;
Prompt.Header = PromptHeader;
Prompt.Footer = PromptFooter;
Prompt.Title = PromptTitle;
Prompt.Description = PromptDescription;
Prompt.Action = PromptAction;
Prompt.Cancel = PromptCancel;

export { Prompt };
