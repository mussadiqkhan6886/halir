import ContactUs from '@/components/main/ContactUs'
import React from 'react'
import { Metadata } from "next"

export const generateMetadata = (): Metadata => {
  return {
    title: "Contact Us",
    description:
      "Get in touch with Halir Perfumes. Contact our customer support for orders, queries, and assistance. We respond in English, Urdu, and Pashto.",
    alternates: {
      canonical: "https://halirperfumerypk.com/contact-us",
    },
    openGraph: {
      title: "Contact Halir Perfumes",
      description:
        "Reach out to Halir Perfumes Pakistan for support, orders, and inquiries.",
      url: "https://halirperfumerypk.com/contact-us",
      type: "website",
    },
  }
}

const ContactUsPage = () => {
  return (
    <ContactUs />
  )
}

export default ContactUsPage
