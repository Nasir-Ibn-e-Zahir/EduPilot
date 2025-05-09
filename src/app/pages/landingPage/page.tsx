
import Demo from "@/components/shared/Demo";
import Features from "@/components/shared/Features";
import Footer from "@/components/shared/Footer";
import Testimonials from "@/components/shared/TrustSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="w-full h-screen bg-[url(/NewProject.jpg)] bg-no-repeat bg-center bg-cover">
        <nav>
          <div className=" w-full h-[70px] flex bg-transparent justify-between p-3.5">
            <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
            <div className="w-[150px]  flex  justify-between">
              <Button variant={"link"}>Sign Up</Button>
              <Button variant={"link"}>Login</Button>
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
            <Button  variant={"default"}>Try it now</Button>
            <Button  variant={"secondary"}> Watch Demo</Button>
          </div>
        </div>
      </div>
      <Features/>
      <Testimonials/>
      <Demo/>
      <Footer/>
      
     
    </div>
  );
}
