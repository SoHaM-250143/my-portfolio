"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function ContactPage() {
  return (
    <>
      <Header />

      <motion.div
        className="section-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Contact Me</h1>

        <form
          className="contact-form"
          action="https://formsubmit.co/mhatresoham2501@gmail.com"
          method="POST"
        >
          {/* Disable captcha */}
          <input type="hidden" name="_captcha" value="false" />

          {/* Redirect after submit */}
          <input
            type="hidden"
            name="_next"
            value="https://netflix-portfolio-one.vercel.app/"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
          ></textarea>

          <Magnetic style={{ width: "100%", display: "block" }}>
            <button type="submit" className="btn" style={{ width: "100%" }}>
              Send Message
            </button>
          </Magnetic>
        </form>
      </motion.div>
    </>
  );
}
