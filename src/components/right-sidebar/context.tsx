"use client";

import * as React from "react";

const DEFAULT_WIDTH = 256;
const MIN_WIDTH = 200;
const MAX_WIDTH = 600;

type RightSidebarContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  width: number;
  setWidth: (width: number) => void;
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
  minWidth: number;
  maxWidth: number;
};

const RightSidebarContext = React.createContext<RightSidebarContextType | null>(
  null
);

export function useRightSidebar() {
  const context = React.useContext(RightSidebarContext);
  if (!context) {
    throw new Error(
      "useRightSidebar must be used within a RightSidebarProvider."
    );
  }
  return context;
}

export function RightSidebarProvider({
  children,
  defaultOpen = false,
  defaultWidth = DEFAULT_WIDTH,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  defaultWidth?: number;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [width, setWidth] = React.useState(defaultWidth);
  const [isResizing, setIsResizing] = React.useState(false);

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSetWidth = React.useCallback((newWidth: number) => {
    setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth)));
  }, []);

  const contextValue = React.useMemo<RightSidebarContextType>(
    () => ({
      open,
      setOpen,
      toggle,
      width,
      setWidth: handleSetWidth,
      isResizing,
      setIsResizing,
      minWidth: MIN_WIDTH,
      maxWidth: MAX_WIDTH,
    }),
    [open, toggle, width, handleSetWidth, isResizing]
  );

  return (
    <RightSidebarContext.Provider value={contextValue}>
      {children}
    </RightSidebarContext.Provider>
  );
}
