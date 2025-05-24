"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { signinSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


// type FormData = {
//   identifier: string;
//   password: string;
// };

export default function SignInPage() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver:zodResolver(signinSchema),
    defaultValues: {
    identifier: "",
    password: ""
  }
  })
  const [Err, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setError("");
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setError("Invalid credentials."+res.error);
    } else if (res?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
     <Card className="rounded-2xl shadow-2xl w-[400px] text-center m-auto mt-7 ">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        {Err && <p className="text-red-600"> {Err} </p>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            
            
            <Button className="w-full bg-green-500 rounded-2xl" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
