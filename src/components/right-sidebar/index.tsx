"use client";

import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRightSidebar } from "./context";
import { TooltipIconButton } from "../ui/assistant-ui/tooltip-icon-button";
import { PanelRight } from "lucide-react";
import { ChatKitPanel } from "./chatkit-panel";

export function RightSidebar({ children }: { children?: React.ReactNode }) {
  const { open, width, setWidth, isResizing, setIsResizing } =
    useRightSidebar();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    },
    [setIsResizing]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      setWidth(newWidth);
    },
    [isResizing, setWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={cn(
        "hidden md:block text-sidebar-foreground",
        !isResizing && "transition-all duration-200 ease-linear",
        open ? "w-[--sidebar-width]" : "w-0"
      )}
      style={
        {
          "--sidebar-width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-10 h-svh bg-[#F9FAFB] border-l",
          !isResizing && "transition-transform duration-200 ease-linear",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ width: `${width}px` }}
      >
        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute left-0 top-0 h-full w-1 cursor-col-resize z-20",
            "hover:bg-blue-500/50 active:bg-blue-500/70",
            "transition-colors duration-150",
            isResizing && "bg-blue-500/70"
          )}
        />
        <div className="flex flex-col h-full pt-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <span className="font-semibold text-gray-800">Chat</span>
            <RightSidebarTrigger />
          </div>
          <div className="flex-1 overflow-hidden">
            {children || <ChatKitPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RightSidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useRightSidebar();

  return (
    <TooltipIconButton
      tooltip="Toggle Right Sidebar"
      onClick={toggle}
      className={className}
    >
      <PanelRight className="w-4 h-4" />
    </TooltipIconButton>
  );
}

export function RightSidebarOutsideTrigger({
  className,
}: {
  className?: string;
}) {
  const { open, toggle } = useRightSidebar();

  if (open) {
    return null;
  }

  return (
    <TooltipIconButton
      tooltip="Toggle Right Sidebar"
      onClick={toggle}
      className={className}
    >
      <PanelRight className="w-4 h-4" />
    </TooltipIconButton>
  );
}
