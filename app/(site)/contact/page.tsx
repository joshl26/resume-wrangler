// app/contact/page.tsx
import { Metadata } from "next";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";
import {
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  Globe,
  HelpCircle,
} from "lucide-react";

// Enhanced metadata
export const metadata: Metadata = {
  title: "Contact Resume Wrangler - Get Support & Send Feedback",
  description:
    "Contact Resume Wrangler for support, feature requests, or partnership opportunities. Reach our team via email, GitHub, or LinkedIn. We respond within 24-48 hours.",
  keywords: [
    "contact resume wrangler",
    "resume builder support",
    "customer service",
    "technical support",
    "feature request",
    "partnership opportunities",
    "bug report",
    "help center"
  ],
  openGraph: {
    title: "Contact Resume Wrangler - Get Support & Send Feedback",
    description: "Get in touch with Resume Wrangler. We're here to help with support, feature requests, and partnership opportunities.",
    url: `${process.env.DEPLOYMENT_URL}/contact/`,
    type: "website",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Resume Wrangler Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Resume Wrangler Support",
    description: "Get help from our team. We respond within 24-48 hours.",
    images: ["/twitter-contact.png"],
  },
  alternates: {
    canonical: `${process.env.DEPLOYMENT_URL}/contact/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact/" },
];

// JSON-LD Structured Data for Contact Page
function ContactStructuredData() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.DEPLOYMENT_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${process.env.DEPLOYMENT_URL}/contact/`
      }
    ]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Resume Wrangler",
    "description": "Contact page for Resume Wrangler support and inquiries",
    "url": `${process.env.DEPLOYMENT_URL}/contact/`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Resume Wrangler",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "support@resumewrangler.com",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "contactType": "Technical Support",
          "email": "support@resumewrangler.com",
          "availableLanguage": "English"
        }
      ],
      "url": `${process.env.DEPLOYMENT_URL}/`,
      "sameAs": [
        "https://github.com/joshl26/resume-wrangler/",
        "https://www.linkedin.com/in/joshrlehman/"
      ]
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact Resume Wrangler",
    "description": "Get in touch with Resume Wrangler for support, feedback, and partnership opportunities",
    "url": `${process.env.DEPLOYMENT_URL}/contact/`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${process.env.DEPLOYMENT_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactStructuredData />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4" aria-hidden="true">
              <MessageSquare className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Have questions about Resume Wrangler? We'd love to hear from you.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <section aria-labelledby="contact-form-heading" className="md:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                <h2 id="contact-form-heading" className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6" action="/api/contact" method="POST">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                      >
                        First Name <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        placeholder="John"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Last Name <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        placeholder="Doe"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Email Address <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                      placeholder="john.doe@example.com"
                      required
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Subject <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                      required
                      aria-required="true"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Subscriptions</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Report a Bug</option>
                      <option value="partnership">
                        Partnership Opportunities
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Message <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                      aria-required="true"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    Send Message
                  </button>

                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </form>
              </div>
            </section>

            {/* Contact Information */}
            <aside aria-labelledby="contact-info-heading" className="space-y-6">
              <h2 id="contact-info-heading" className="sr-only">
                Contact Information
              </h2>

              {/* Email */}
              <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center" aria-hidden="true">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Email Support
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Get help from our support team
                </p>
                <a
                  href="mailto:joshlehman.dev@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold break-all"
                >
                  joshlehman.dev@gmail.com
                </a>
              </article>

              {/* GitHub */}
              <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center" aria-hidden="true">
                    <Github className="w-6 h-6 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    GitHub
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  View our open-source code
                </p>
                <a
                  href="https://github.com/joshl26/resume-wrangler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold break-all"
                >
                  github.com/joshl26/resume-wrangler
                </a>
              </article>

              {/* LinkedIn */}
              <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center" aria-hidden="true">
                    <Linkedin className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    LinkedIn Updates
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Follow our development journey
                </p>
                <a
                  href="https://linkedin.com/search/results/all/?keywords=%23resumewrangler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Search #resumewrangler
                </a>
              </article>

              {/* FAQ */}
              <article className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center" aria-hidden="true">
                    <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Need Quick Help?
                  </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                  Check out our documentation and FAQ for instant answers to
                  common questions.
                </p>
                <a
                  href="/about"
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  View Documentation →
                </a>
              </article>
            </aside>
          </div>

          {/* Additional Info */}
          <section aria-labelledby="additional-contact-heading" className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h2 id="additional-contact-heading" className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Other Ways to Connect
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <article>
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center" aria-hidden="true">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Live Demo
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Try Resume Wrangler on Vercel
                </p>
                <a
                  href="https://resume-wrangler.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm"
                >
                  View Demo
                </a>
              </article>
              <article>
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center" aria-hidden="true">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Community
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Join discussions on GitHub
                </p>
                <a
                  href="https://github.com/joshl26/resume-wrangler/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm"
                >
                  Join Community
                </a>
              </article>
              <article>
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center" aria-hidden="true">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Report Issues
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Found a bug? Let us know
                </p>
                <a
                  href="https://github.com/joshl26/resume-wrangler/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm"
                >
                  Report Bug
                </a>
              </article>
            </div>
          </section>

          {/* Back Button */}
          <nav className="mt-8">
            <BackButton className="text-slate-600 dark:text-slate-300" href="/">
              Back to Home
            </BackButton>
          </nav>
        </div>
      </div>
    </>
  );
}