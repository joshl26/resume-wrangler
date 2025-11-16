// app/privacy/page.tsx
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import {
  Shield,
  Eye,
  Lock,
  Cookie,
  Database,
  Users,
  Mail,
  FileText,
} from "lucide-react";
import Breadcrumb from "@/app/ui/Breadcrumb";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Resume Wrangler's commitment to protecting your privacy and data",
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy-policy/" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav aria-label="Breadcrumb">
          <Breadcrumb items={breadcrumbItems} />
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: November 14, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              At Resume Wrangler, your privacy is paramount. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our resume and cover letter customization
              service. We are committed to protecting your personal and
              professional information with the highest standards of data
              security.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Account Information
                </h3>
                <p className="leading-relaxed">
                  When you create an account, we collect your name, email
                  address, and password. This information is necessary to
                  provide you with access to our services and to communicate
                  with you about your account.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Professional Information
                </h3>
                <p className="leading-relaxed">
                  To generate customized resumes and cover letters, we collect
                  professional information you provide, including work
                  experience, education, skills, achievements, and other
                  career-related details. This information is stored securely in
                  our PostgreSQL database with encryption.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Job Posting Data
                </h3>
                <p className="leading-relaxed">
                  When you use our AI-powered customization features, we may
                  process job descriptions and posting information you provide
                  to tailor your application materials. This data is used solely
                  for generating your personalized documents.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Automatically Collected Information
                </h3>
                <p className="leading-relaxed">
                  We automatically collect certain information about your device
                  and usage, including IP address, browser type, operating
                  system, access times, pages viewed, and usage patterns to
                  improve our service and ensure security.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                How We Use Your Information
              </h2>
            </div>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Generate AI-powered, customized resumes and cover letters
                  tailored to job descriptions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Process your documents through our in-house ATS scanner and
                  grammar checking tools
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Provide, maintain, and improve our resume customization
                  algorithms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Process subscription payments for Pro membership features
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Send you service updates, technical notices, and support
                  messages
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Monitor and analyze usage patterns to improve our matching
                  algorithms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  Detect, prevent, and address security threats and technical
                  issues
                </span>
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Information Sharing and Disclosure
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed font-semibold text-slate-900 dark:text-white">
                We do NOT sell, trade, or rent your personal or professional
                information to third parties.
              </p>
              <p className="leading-relaxed">
                Your career information, resumes, and cover letters remain
                confidential and are only accessible by you. We may share
                limited information only in these specific circumstances:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>
                    With secure hosting providers (Vercel) and database services
                    (PostgreSQL) that help us operate our platform
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>
                    When legally required by law enforcement or regulatory
                    authorities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>
                    To protect our rights, property, or safety, or that of our
                    users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>With your explicit consent for specific purposes</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Data Security
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                We implement advanced security protocols to protect your
                confidential career information:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>Encrypted data storage in our PostgreSQL database</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>Secure login mechanisms with password hashing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>HTTPS encryption for all data transmission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>Access controls and authentication measures</span>
                </li>
              </ul>
              <p className="leading-relaxed">
                While we implement industry-standard security measures, no
                method of transmission over the internet is 100% secure. We
                continuously work to maintain the highest level of data
                protection.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Cookies and Tracking Technologies
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We use cookies and similar tracking technologies to maintain your
              session, remember your preferences, and analyze usage patterns.
              These help us improve our service and provide you with a better
              experience. You can control cookie settings through your browser,
              though some features may require cookies to function properly.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Data Retention
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We retain your account information and professional data for as
              long as your account is active or as needed to provide our
              services. You can request deletion of your account and all
              associated data at any time through your account settings or by
              contacting us. Upon deletion, your data will be permanently
              removed from our systems within 30 days, except where retention is
              required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              You have full control over your personal and professional
              information:
            </p>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  <strong>Access:</strong> View and download all your stored
                  information at any time
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  <strong>Update:</strong> Correct or modify your personal and
                  professional information
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  <strong>Delete:</strong> Request complete deletion of your
                  account and all associated data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  <strong>Export:</strong> Download your resumes and data in
                  portable formats
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>
                  <strong>Opt-out:</strong> Unsubscribe from promotional
                  communications at any time
                </span>
              </li>
            </ul>
          </section>

          {/* Open Source */}
          <section className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Open Source Commitment
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Resume Wrangler is an open-source project. Our code is publicly
              available on GitHub, allowing transparency in how we handle your
              data. You can review our security practices and data handling
              procedures at{" "}
              <a
                href="https://github.com/joshl26/resume-wrangler"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                github.com/joshl26/resume-wrangler
              </a>
            </p>
          </section>

          {/* Contact */}
          <section className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Contact Us
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us at{" "}
              <a
                href="mailto:support@resumewrangler.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                support@resumewrangler.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <BackButton className="text-slate-600 dark:text-slate-300" href="/">
            Back to Home
          </BackButton>
          <Link
            href="/terms"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </main>
  );
}
