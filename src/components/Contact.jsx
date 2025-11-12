import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import useTitle from '../hooks/useTitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  useTitle("Contact");

  const form = useRef();
  const [loading, setLoading] = useState(false);

  // 📤 Handle email sending
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_tz3y1xz",      // 🔹 Replace with your EmailJS Service ID
         "template_ab2fx8u",     // 🔹 Replace with your EmailJS Template ID
        form.current,
         "55nir0XRjUEFpKhy3"       // 🔹 Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          toast.success('✅ Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          toast.error('❌ Failed to send message. Try again later.');
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <div className="grid max-w-7xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
        {/* Left Side */}
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">
            Get in <span className="text-[#511AB7FF]">touch</span>
          </h1>
          <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
          <div className="space-y-4">
            <p className="flex items-center">
              📍 <span className="ml-2">Dhaka, Bangladesh</span>
            </p>
            <p className="flex items-center">
              📞 <span className="ml-2">+880 1234-567890</span>
            </p>
            <p className="flex items-center">
              📧 <span className="ml-2">contact@business.com</span>
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form ref={form} onSubmit={sendEmail} className="flex  flex-col  space-y-6   border-2 p-6 border-[#511AB7FF] hover:shadow-2xl  rounded-lg shadow-lg">
          <label className="block">
            <span className="mb-1">Full name</span>
            <input
              type="text"
              name="from_name"
              required
              placeholder="Leroy Jenkins"
              className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#cabded] to-[#d9d1db] focus:outline-none focus:ring-2 focus:ring-[#f4f0f9]"
            />
          </label>

          <label className="block">
            <span className="mb-1">Email address</span>
            <input
              type="email"
              name="from_email"
              required
              placeholder="leroy@jenkins.com"
              className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#cabded] to-[#d9d1db] focus:outline-none focus:ring-2 focus:ring-[#f4f0f9]"
             />
          </label>

          <label className="block">
            <span className="mb-1">Message</span>
            <textarea
              rows="3"
              name="message"
              required
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#dfd4fa] to-[#d9d1db] focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            ></textarea>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-[#7509db] to-[#5f5188] text-white p-2 rounded-lg w-full md:text-xl transition-all duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
