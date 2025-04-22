"use client";

import {QueryClientProvider,QueryClient} from '@tanstack/react-query'

interface Props{
    children: React.ReactNode
}

const queryClient = new QueryClient();
export default function Provider({children}:Props) {
  return (
    <QueryClientProvider client={queryClient} >
    {children}
    </QueryClientProvider>
  )
}
