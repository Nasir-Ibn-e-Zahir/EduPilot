'use client';


import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <SidebarProvider>
    <SessionProvider>
      {children}
      </SessionProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
