"use client";
import Demo from "@/components/shared/Demo";
import Features from "@/components/shared/Features";
import Footer from "@/components/shared/Footer";
import Testimonials from "@/components/shared/TrustSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession,signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="w-full h-screen bg-[url(/NewProject.jpg)] bg-no-repeat bg-center bg-cover">
        <nav>
          <div className=" w-full h-[70px] flex bg-transparent justify-between p-3.5">
            <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
            <div className="w-[180px]  flex  justify-between">
              {session ? (
              <> <Button
               
               >
                {session.user.name?.substring(0,9)}
               </Button>
               <Button
                variant="outline"
                 onClick={() => signOut({ callbackUrl: "/sign-in" })}
                 >
                Sign Out
                </Button>
               </>
              ) : (
                <>
                  <Button
                    variant={"link"}
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant={"link"}
                    onClick={() => {
                      router.push("/sign-up");
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className=" md:w-[800px] sm:w-[300px] text-white p-5 text-center h-[500px] pt-[180px] ">
          <h1 className="md:text-4xl sm:text-3xl ">
            “AI That Generates. Educators That Inspire.”
          </h1>
          <br />
          <p className="sm:text-2xl">
            “Generate notes, quizzes, and papers with a single click. Built for
            Teachers.”
          </p>

          <br />
          <div className="grid grid-cols-2 md:pl-[250px] md:pr-[250px] w-full place-items-center ">
            <Button variant={"default"} onClick={() => {
                      router.push("upload");
                    }}>
              Try it now
            </Button>
            <Button variant={"secondary"}> Watch Demo</Button>
          </div>
        </div>
      </div>
      <Features />
      <Testimonials />
      <Demo />
      <Footer />
    </div>
  );
}
