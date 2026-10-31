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
    <div className="w-full px-5 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24">
      <main className="max-w-[560px] mx-auto text-center">
        {/* Contact Heading & Details */}
        <section className="text-center" aria-label="Contact Information">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] tracking-tight text-center">
            Contact
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#38435C] mt-2 text-center">
            For the price list, enquire here:
          </p>

          <div className="mt-4 space-y-1.5 text-center">
            <div>
              <a
                href="mailto:studio@prakashbaljoshi.com"
                className="font-serif text-base sm:text-lg text-[#1B2A49] hover:underline font-medium inline-block"
              >
                studio@prakashbaljoshi.com
              </a>
            </div>

            <p className="font-serif text-sm sm:text-base text-[#38435C]">
              Phone no:{" "}
              <a
                href="tel:9869014555"
                className="text-[#1B2A49] hover:underline font-medium"
              >
                9869014555
              </a>
            </p>

            <p className="font-serif text-xs sm:text-sm text-[#38435C]/85 leading-relaxed max-w-[420px] mx-auto">
              Studio address: LG13, Avior Corporate Park, LBS Road, Mulund (West).
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
              className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] mb-1.5 text-left"
            >
              Message <span aria-hidden="true" className="text-[#1B2A49]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message or enquiry..."
              className="w-full h-[120px] min-h-[120px] p-4 bg-white border border-[#1B2A49]/20 rounded-xs sm:rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:outline-hidden focus:border-[#1B2A49] focus:ring-1 focus:ring-[#1B2A49] transition-all font-body text-sm text-left resize-y"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 min-h-[48px] px-6 bg-[#1B2A49] hover:bg-[#253961] active:bg-[#121d33] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-[0.14em] rounded-xs sm:rounded-sm transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#1B2A49] focus:ring-offset-2"
            >
              Open Email App
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
