import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
function Faqsection() {
  const faqs = [
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
        "No, joining Volunteer Hub is completely free for both volunteers and organizations.",
    },
    {
      id: 5,
      question: "How do I track my volunteer hours?",
      answer:
        "Your dashboard automatically records hours based on completed events. You can also download your activity summary as a report.",
    },
  ];
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true,     // whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <section id="faq" className=" max-w-9xl bg-white border-2 shadow-lg rounded-2xl p-10  mx-auto px-4 mb-10">
      <h2 className="text-xl text-[#511AB7FF]  md:text-3xl font-bold mb-6 text-center py-2"><span className="text-green-500">Frequently Asked</span> Questions</h2>
      <Accordion data-aos="zoom-in" className="space-y-2 ">
        {faqs?.map((faq, idx) => (
          <AccordionItem

            key={idx}
            header={
              <div className="flex hover:shadow-2xl rounded-lg justify-between items-center w-full text-left font-medium text-lg text-black">
                {faq.question}
                <ChevronDown className="ml-2 shrink-0 transition-transform duration-200 accordion-chevron text-[#511AB7FF]" />
              </div>
            }
            className=" rounded-t-lg overflow-hidden"
            contentProps={{
              className: "p-4 text-black ",
            }}
            buttonProps={{
              className:
                "w-full  px-4 py-3 text-left border bg-[#4C0BC6FF]/10 focus:outline-none  rounded-t-lg",
            }}
            contentTransition>

            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>

      <style jsx>{`
        .szh-accordion__item--expanded .accordion-chevron {
          transform: rotate(180deg);
         
        }
      `}</style>
    </section>

  );
}

export default Faqsection;
