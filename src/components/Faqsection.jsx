import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { ChevronDown } from "lucide-react";
import "react-accessible-accordion/dist/fancy-example.css";
import "./faq.css"; // We'll add our arrow animation CSS here

const Faqsection = () => {
  const faqItems = [
    {
      id: 1,
      question: "What is Volunteer Hub?",
      answer:
        "Volunteer Hub is a platform that connects volunteers with social organizations and community events, allowing users to register, apply, and track their volunteer activities.",
    },
    {
      id: 2,
      question: "How can I join as a volunteer?",
      answer:
        "You can sign up using your email or Google account. Once registered, browse available opportunities and click the 'Join Now' button on any volunteer post.",
    },
    {
      id: 3,
      question: "Can organizations post volunteer opportunities?",
      answer:
        "Yes! Organizations can create an account and submit volunteer posts, manage applications, and view participant profiles from their dashboard.",
    },
    {
      id: 4,
      question: "Is there any cost to join Volunteer Hub?",
      answer:
        "No, joining Volunteer Hub is completely free for both volunteers and organizations. We believe in making social contribution accessible to everyone.",
    },
    {
      id: 5,
      question: "How do I track my volunteer hours?",
      answer:
        "Your dashboard automatically records hours based on completed events. You can also download your activity summary as a report.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto my-10 p-4">
      <h1 className="text-center font-bold text-2xl mb-8">
        Frequently Asked Questions
      </h1>

      <Accordion allowZeroExpanded>
        {faqItems.map((item) => (
          <AccordionItem key={item.id} uuid={item.id}>
            <AccordionItemHeading>
              <AccordionItemButton className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 py-3 px-4 font-semibold rounded-md transition">
                <span>{item.question}</span>
                {/* Arrow icon */}
                <ChevronDown
                  className="accordion__arrow transition-transform duration-300"
                  aria-hidden="true"
                />
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel className="bg-white border-l-4 border-blue-400 px-4 py-3 text-gray-700 rounded-b-md">
              {item.answer}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faqsection;
