"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return;
    }

    const subject = `Enquiry: ${trimmedName}`;
    const body = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

    const mailtoUrl = `mailto:studio@prakashbaljoshi.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24">
      <main className="max-w-[560px] mx-auto text-center">
        {/* Contact Heading & Details */}
        <section className="text-center" aria-label="Contact Information">
          <h1
            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
            className="contact-page-title text-5xl sm:text-6xl font-bold text-[#1B2A49] tracking-tight text-center"
          >
            Contact
          </h1>

          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#38435C] mt-3 text-center">
            For the price list, enquire here:
          </p>

          <div className="mt-5 space-y-2.5 text-center">
            <div>
              <a
                href="mailto:studio@prakashbaljoshi.com"
                className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#1B2A49] hover:underline font-semibold inline-block tracking-tight"
              >
                studio@prakashbaljoshi.com
              </a>
            </div>

            <p
              style={{
                fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif',
                fontVariantNumeric: "lining-nums tabular-nums",
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
              }}
              className="text-base sm:text-lg md:text-xl text-[#38435C]"
            >
              Phone no:{" "}
              <a
                href="tel:+919869014555"
                style={{
                  fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif',
                  fontVariantNumeric: "lining-nums tabular-nums",
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
                className="text-[#1B2A49] hover:underline font-medium inline-block align-baseline"
              >
                +91 98690 14555
              </a>
            </p>

            <p className="font-serif text-[13.5px] sm:text-[15px] md:text-[17px] text-[#38435C]/85 leading-relaxed text-center mx-auto">
              Studio address:{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=LG13%2C+Avior+Corporate+Park%2C+LBS+Road%2C+Mulund+%28West%29%2C+Mumbai+400080"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B2A49] hover:underline"
                title="View studio location on Google Maps"
              >
                LG13, Avior Corporate Park, LBS Road, Mulund (West), Mumbai 400080.
              </a>
            </p>

            <p className="font-serif italic text-[13px] sm:text-[14.5px] md:text-[16px] text-[#38435C]/80 text-center">
              Visits by appointment.
            </p>
          </div>
        </section>

        {/* Compact Single-Column Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 sm:mt-8 space-y-4 sm:space-y-5 text-left w-full"
          aria-label="Enquiry form"
        >
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] mb-1.5 text-left"
            >
              Name <span aria-hidden="true" className="text-[#1B2A49]">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-12 px-4 bg-white border border-[#1B2A49]/20 rounded-xs sm:rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:outline-hidden focus:border-[#1B2A49] focus:ring-1 focus:ring-[#1B2A49] transition-all font-body text-sm text-left"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] mb-1.5 text-left"
            >
              Email <span aria-hidden="true" className="text-[#1B2A49]">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full h-12 px-4 bg-white border border-[#1B2A49]/20 rounded-xs sm:rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:outline-hidden focus:border-[#1B2A49] focus:ring-1 focus:ring-[#1B2A49] transition-all font-body text-sm text-left"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="sr-only"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message or enquiry..."
              aria-label="Message"
              className="w-full h-[120px] min-h-[120px] p-4 bg-white border border-[#1B2A49]/20 rounded-xs sm:rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:outline-hidden focus:border-[#1B2A49] focus:ring-1 focus:ring-[#1B2A49] transition-all font-body text-sm text-left resize-y"
            />
          </div>

          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-full h-12 min-h-[48px] px-6 bg-[#1B2A49] hover:bg-[#253961] active:bg-[#121d33] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-[0.14em] rounded-xs sm:rounded-sm transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#1B2A49] focus:ring-offset-2"
            >
              Open Email App
            </button>
            <p className="text-xs text-[#38435C]/75 font-serif italic text-center mt-2.5">
              Clicking &ldquo;Open Email App&rdquo; will open your email application with your message pre-filled to studio@prakashbaljoshi.com.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
