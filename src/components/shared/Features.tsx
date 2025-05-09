import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function Features() {
    const features =  [
        {
            title: "Notes Generator",
            desc: "Effortlessly generate comprehensive notes from any course image or document. Our AI extracts and organizes key information into structured, readable formats ready for download or sharing.",
            icon: "📝",
          },
          {
            title: "Quiz Creator",
            desc: "Quickly create quizzes tailored to your course content. Simply upload material and let our AI generate multiple-choice or short-answer questions categorized by difficulty.",
            icon: "❓",
          },
          {
            title: "Assignment Builder",
            desc: "Easily build detailed assignments complete with issue and due dates. Designed to save you time while ensuring academic quality and clarity for your students.",
            icon: "📚",
          },
          {
            title: "Exam Scheduler",
            desc: "Automatically generate mid-term and final exam papers based on extracted topics. Our system balances question difficulty and sets a timeline to fit your academic calendar.",
            icon: "🗓️",
          },
          {
            title: "Presentation Topics",
            desc: "Assign presentation topics to students instantly and fairly. The system distributes topics evenly, ensuring variety and relevance based on the course contents.",
            icon: "🎤",
          },
          {
            title: "Course Timeline",
            desc: "Create a full monthly study schedule for any course in seconds. EduPilot analyzes the workload and automatically sets dates for lessons, quizzes, and exams.",
            icon: "📆",
          },
      ]
  return (
    <div className='w-full  min-h-screen  p-9' >
      <div className='w-full h-full rounded-3xl text-center'>
            <h1 className=' p-6 text-4xl font-bold font-mono text-gray-800' > Features </h1>
            <div className='grid gap-4 md:grid-cols-3 sm:grid-cols-1 px-6 sm:px-2'>
                {features.map((item,index)=>(
                    <Card key={index} className='shadow-xl/10 hover:shadow-lg hover:scale-105 transition-transform duration-500'>
                    <CardHeader>
                        <p className='text-4xl' >{item.icon}</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className='pb-4' > {item.title} </CardTitle>
                        <CardDescription> {item.desc} </CardDescription>
                    </CardContent>
                </Card>
                ))}
                
               
            </div>
      </div>
    </div>
  )
}
