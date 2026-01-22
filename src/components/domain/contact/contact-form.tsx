"use client";

import { useState } from "react";
import { Button, Card, Input, Textarea } from "@/components/ui";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Phone (optional)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(416) 555-0123"
          />
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Rental inquiry"
            required
          />
        </div>
        <Textarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your trip dates and vehicle needs..."
          rows={5}
          required
        />
        <Button type="submit" size="lg" className="w-full">
          Send Message
        </Button>
        {submitted && (
          <p className="text-sm text-success">
            Thanks! We received your message and will respond shortly.
          </p>
        )}
      </form>
    </Card>
  );
}
