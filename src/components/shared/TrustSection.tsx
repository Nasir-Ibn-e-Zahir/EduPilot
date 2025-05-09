'use client';

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


const testimonials = [
  {
    quote: "EduPilot saved me hours every week!",
    name: "Jane Doe",
    subject: "Math Teacher",
    avatar: "/avatars/image.png", // Replace with your avatar image
  },
  {
    quote: "Generating quizzes is now a breeze.",
    name: "Mr. Khan",
    subject: "Physics Teacher",
    avatar: "/avatars/image.png",
  },
  {
    quote: "I love how easy it is to create assignments.",
    name: "Ms. Sara",
    subject: "English Teacher",
    avatar: "/avatars/image.png",
  },
  {
    quote: "EduPilot saved me hours every week!",
    name: "Jane Doe",
    subject: "Math Teacher",
    avatar: "/avatars/image.png", // Replace with your avatar image
  },
  {
    quote: "Generating quizzes is now a breeze.",
    name: "Mr. Khan",
    subject: "Physics Teacher",
    avatar: "/avatars/image.png",
  },
  {
    quote: "I love how easy it is to create assignments.",
    name: "Ms. Sara",
    subject: "English Teacher",
    avatar: "/avatars/image.png",
  },
];

export default function Testimonials() {
  return (
   <section className="w-full  min-h-screen  p-9" >
    <div className="w-full h-full  text-center">
       <h1  className="text-3xl font-bold font-mono text-gray-800  p-6"> What Teachers Say!</h1>
       <div className="w-full h-full grid md:grid-cols-3 px-6 sm:grid-cols-1 sm:px-2 gap-3">
        {testimonials.map((item,index)=>(
           <Card key={index} className="shadow-xl/10 hover:shadow-lg hover:scale-105 transition-transform duration-500 h-auto">
            <CardHeader className="flex justify-center">
                <Image  src={item.avatar} alt={item.name} width={70} height={70} className="rounded-full" />
            </CardHeader>
            <CardContent>
              <p className="italic text-gray-500">&quot;{item.quote}&quot;</p>
            </CardContent>          
            <CardFooter className="flex justify-center flex-col">
              <p>{item.name}</p>
              <p>{item.subject}</p>
            </CardFooter>
             </Card>
        ))}
       </div>
    </div>

   </section>
  );
}
