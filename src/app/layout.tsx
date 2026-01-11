import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThreadsProvider } from "@/components/agent-inbox/contexts/ThreadContext";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, AppSidebarTrigger } from "@/components/app-sidebar";
import { BreadCrumb } from "@/components/agent-inbox/components/breadcrumb";
import { cn } from "@/lib/utils";
import { RightSidebarProvider } from "@/components/right-sidebar/context";
import {
  RightSidebar,
  RightSidebarOutsideTrigger,
} from "@/components/right-sidebar";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agent Inbox",
  description: "Agent Inbox UX by LangChain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          async
        />
      </head>
      <body className={inter.className}>
        <React.Suspense fallback={<div>Loading (layout)...</div>}>
          <Toaster />
          <ThreadsProvider>
            <SidebarProvider>
              <RightSidebarProvider>
                <AppSidebar />
                <main className="flex flex-row w-full min-h-full pt-6 pl-6 gap-6">
                  <AppSidebarTrigger isOutside={true} />
                  <div className="flex flex-col gap-6 w-full min-h-full">
                    <div className="flex items-center justify-between pr-6">
                      <BreadCrumb className="pl-5" />
                      <RightSidebarOutsideTrigger />
                    </div>
                    <div
                      className={cn(
                        "h-full bg-white rounded-tl-[58px]",
                        "overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                      )}
                    >
                      {children}
                    </div>
                  </div>
                </main>
                <RightSidebar />
              </RightSidebarProvider>
            </SidebarProvider>
          </ThreadsProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
