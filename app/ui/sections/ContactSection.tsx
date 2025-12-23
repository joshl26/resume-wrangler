// file: app/ui/sections/PrivacySection.tsx
import React from 'react'
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
import "./PrivacySection.css"

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy-policy/" },
];

const PrivacySection = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <nav aria-label="Breadcrumb" className="privacy-breadcrumb">
          <Breadcrumb items={breadcrumbItems} />
        </nav>

        {/* Header */}
        <header className="privacy-header">
          <div className="privacy-header-icon" aria-hidden="true">
            <Shield className="privacy-shield-icon" />
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-date">
            <time dateTime="2025-11-14">Last updated: November 14, 2025</time>
          </p>
        </header>

        {/* Content */}
        <article className="privacy-article">
          {/* Introduction */}
          <section aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="sr-only">
              Introduction
            </h2>
            <p className="privacy-intro-text">
              At Resume Wrangler, your privacy is paramount. This Privacy
              Policy explains how we collect, use, disclose, and safeguard
              your information when you use our resume and cover letter
              customization service. We are committed to protecting your
              personal and professional information with the highest standards
              of data security.
            </p>
          </section>

          {/* Information We Collect */}
          <section aria-labelledby="collect-heading">
            <div className="privacy-section-header">
              <Eye
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="collect-heading"
                className="privacy-section-title"
              >
                Information We Collect
              </h2>
            </div>
            <div className="privacy-section-content">
              <div className="privacy-info-item">
                <h3 className="privacy-info-title">
                  Account Information
                </h3>
                <p className="privacy-info-description">
                  When you create an account, we collect your name, email
                  address, and password. This information is necessary to
                  provide you with access to our services and to communicate
                  with you about your account.
                </p>
              </div>
              <div className="privacy-info-item">
                <h3 className="privacy-info-title">
                  Professional Information
                </h3>
                <p className="privacy-info-description">
                  To generate customized resumes and cover letters, we collect
                  professional information you provide, including work
                  experience, education, skills, achievements, and other
                  career-related details. This information is stored securely
                  in our PostgreSQL database with encryption.
                </p>
              </div>
              <div className="privacy-info-item">
                <h3 className="privacy-info-title">
                  Job Posting Data
                </h3>
                <p className="privacy-info-description">
                  When you use our AI-powered customization features, we may
                  process job descriptions and posting information you provide
                  to tailor your application materials. This data is used
                  solely for generating your personalized documents.
                </p>
              </div>
              <div className="privacy-info-item">
                <h3 className="privacy-info-title">
                  Automatically Collected Information
                </h3>
                <p className="privacy-info-description">
                  We automatically collect certain information about your
                  device and usage, including IP address, browser type,
                  operating system, access times, pages viewed, and usage
                  patterns to improve our service and ensure security.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section aria-labelledby="use-heading">
            <div className="privacy-section-header">
              <Database
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="use-heading"
                className="privacy-section-title"
              >
                How We Use Your Information
              </h2>
            </div>
            <ul
              className="privacy-list"
              role="list"
            >
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Generate AI-powered, customized resumes and cover letters
                  tailored to job descriptions
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Process your documents through our in-house ATS scanner and
                  grammar checking tools
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Provide, maintain, and improve our resume customization
                  algorithms
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Process subscription payments for Pro membership features
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Send you service updates, technical notices, and support
                  messages
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Monitor and analyze usage patterns to improve our matching
                  algorithms
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  Detect, prevent, and address security threats and technical
                  issues
                </span>
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section aria-labelledby="sharing-heading">
            <div className="privacy-section-header">
              <Users
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="sharing-heading"
                className="privacy-section-title"
              >
                Information Sharing and Disclosure
              </h2>
            </div>
            <div className="privacy-section-content">
              <p className="privacy-important-text">
                We do NOT sell, trade, or rent your personal or professional
                information to third parties.
              </p>
              <p className="privacy-description">
                Your career information, resumes, and cover letters remain
                confidential and are only accessible by you. We may share
                limited information only in these specific circumstances:
              </p>
              <ul className="privacy-list" role="list">
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    With secure hosting providers (Vercel) and database
                    services (PostgreSQL) that help us operate our platform
                  </span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    When legally required by law enforcement or regulatory
                    authorities
                  </span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    To protect our rights, property, or safety, or that of our
                    users
                  </span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    With your explicit consent for specific purposes
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section aria-labelledby="security-heading">
            <div className="privacy-section-header">
              <Lock
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="security-heading"
                className="privacy-section-title"
              >
                Data Security
              </h2>
            </div>
            <div className="privacy-section-content">
              <p className="privacy-description">
                We implement advanced security protocols to protect your
                confidential career information:
              </p>
              <ul className="privacy-list" role="list">
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    Encrypted data storage in our PostgreSQL database
                  </span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Secure login mechanisms with password hashing</span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>HTTPS encryption for all data transmission</span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="privacy-list-item">
                  <span
                    className="privacy-list-bullet"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Access controls and authentication measures</span>
                </li>
              </ul>
              <p className="privacy-description">
                While we implement industry-standard security measures, no
                method of transmission over the internet is 100% secure. We
                continuously work to maintain the highest level of data
                protection.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section aria-labelledby="cookies-heading">
            <div className="privacy-section-header">
              <Cookie
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="cookies-heading"
                className="privacy-section-title"
              >
                Cookies and Tracking Technologies
              </h2>
            </div>
            <p className="privacy-description">
              We use cookies and similar tracking technologies to maintain
              your session, remember your preferences, and analyze usage
              patterns. These help us improve our service and provide you with
              a better experience. You can control cookie settings through
              your browser, though some features may require cookies to
              function properly.
            </p>
          </section>

          {/* Data Retention */}
          <section aria-labelledby="retention-heading">
            <div className="privacy-section-header">
              <FileText
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="retention-heading"
                className="privacy-section-title"
              >
                Data Retention
              </h2>
            </div>
            <p className="privacy-description">
              We retain your account information and professional data for as
              long as your account is active or as needed to provide our
              services. You can request deletion of your account and all
              associated data at any time through your account settings or by
              contacting us. Upon deletion, your data will be permanently
              removed from our systems within 30 days, except where retention
              is required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section aria-labelledby="rights-heading">
            <h2
              id="rights-heading"
              className="privacy-section-title-no-icon"
            >
              Your Privacy Rights
            </h2>
            <p className="privacy-description mb-3">
              You have full control over your personal and professional
              information:
            </p>
            <ul
              className="privacy-list"
              role="list"
            >
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  <strong>Access:</strong> View and download all your stored
                  information at any time
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  <strong>Update:</strong> Correct or modify your personal and
                  professional information
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  <strong>Delete:</strong> Request complete deletion of your
                  account and all associated data
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  <strong>Export:</strong> Download your resumes and data in
                  portable formats
                </span>
              </li>
              <li className="privacy-list-item">
                <span
                  className="privacy-list-bullet"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>
                  <strong>Opt-out:</strong> Unsubscribe from promotional
                  communications at any time
                </span>
              </li>
            </ul>
          </section>

          {/* Open Source */}
          <section
            aria-labelledby="opensource-heading"
            className="privacy-open-source"
          >
            <h2
              id="opensource-heading"
              className="privacy-section-title-no-icon"
            >
              Open Source Commitment
            </h2>
            <p className="privacy-description">
              Resume Wrangler is an open-source project. Our code is publicly
              available on GitHub, allowing transparency in how we handle your
              data. You can review our security practices and data handling
              procedures at{" "}
              <a
                href="https://github.com/joshl26/resume-wrangler"
                target="_blank"
                rel="noopener noreferrer"
                className="privacy-link"
              >
                github.com/joshl26/resume-wrangler
              </a>
            </p>
          </section>

          {/* Contact */}
          <section
            aria-labelledby="contact-heading"
            className="privacy-contact"
          >
            <div className="privacy-section-header">
              <Mail
                className="privacy-section-icon"
                aria-hidden="true"
              />
              <h2
                id="contact-heading"
                className="privacy-section-title"
              >
                Contact Us
              </h2>
            </div>
            <p className="privacy-description">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us at{" "}
              <a
                href="mailto:support@resumewrangler.com"
                className="privacy-link"
              >
                support@resumewrangler.com
              </a>
            </p>
          </section>
        </article>

        {/* Footer Navigation */}
        <nav
          aria-label="Related pages"
          className="privacy-footer-nav"
        >
          <BackButton className="privacy-back-button" href="/">
            Back to Home
          </BackButton>
          <Link
            href="/terms"
            className="privacy-terms-link"
          >
            View Terms of Service →
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default PrivacySection