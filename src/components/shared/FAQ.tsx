'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Can I save the generated files?",
    answer:
      "Yes, you can download or save all generated content including notes, quizzes, assignments, and exams.",
  },
  {
    question: "Is EduPilot free to use?",
    answer: "Yes, EduPilot is completely free for students and teachers. No hidden fees.",
  },
  {
    question: "What formats can I upload?",
    answer: "Currently, we support image files (JPG, PNG), PDFs, and audio files for transcription.",
  },
  {
    question: "Do I need an account to use it?",
    answer: "You can generate content without an account, but saving content requires a free signup.",
  },
  {
    question: "Is the generated content customizable?",
    answer: "Yes, you can edit or regenerate content to suit your needs before downloading.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-8 md:px-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <p className="mt-2 text-gray-600">
          Everything you need to know about using EduPilot effectively.
        </p>
      </div>

      <Accordion type="multiple" className="w-full max-w-3xl mx-auto space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium text-gray-800">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
