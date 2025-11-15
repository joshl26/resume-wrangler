// app/terms/page.tsx
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import {
  FileText,
  Shield,
  UserCheck,
  BookOpen,
  AlertCircle,
  Gavel,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our service",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-pink-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Terms of Service
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
              Welcome to our service. These Terms of Service govern your use of
              our platform and services. By creating an account or accessing our
              service, you agree to these terms in full. Please read them
              carefully.
            </p>
          </section>

          {/* Agreement to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Agreement to Terms
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              By accessing and using this service, you accept and agree to be
              bound by the terms and provision of this agreement. Additionally,
              when using our services, you shall be subject to any posted
              guidelines or rules applicable to such services. If you do not
              agree to these terms, please do not use our service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Use License
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                Permission is granted to temporarily access and use our service
                for personal, non-commercial purposes. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>Modify or copy the materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Use the materials for any commercial purpose or public
                    display
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Attempt to reverse engineer any software contained on our
                    service
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Remove any copyright or other proprietary notations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Transfer the materials to another person or mirror on any
                    other server
                  </span>
                </li>
              </ul>
              <p className="leading-relaxed">
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by us at any time.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                User Responsibilities
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                As a user of our service, you agree to:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Provide accurate and complete registration information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Maintain the security and confidentiality of your account
                    credentials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Notify us immediately of any unauthorized use of your
                    account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Be responsible for all activity conducted through your
                    account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    Comply with all applicable laws and regulations while using
                    our service
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>Respect the rights and dignity of other users</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Prohibited Activities
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                You are expressly prohibited from:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Using the service for any unlawful purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Soliciting others to perform illegal acts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Violating any international, federal, provincial, or state
                    regulations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Infringing upon or violating our intellectual property
                    rights
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Harassing, abusing, insulting, harming, defaming, or
                    discriminating
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Submitting false or misleading information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Uploading viruses or malicious code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Collecting or tracking personal information of others
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Spamming, phishing, or engaging in similar activities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>
                    Using the service for any automated purpose without express
                    permission
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Service Availability
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to withdraw or amend our service, and any
              features or material we provide, at our sole discretion without
              notice. We will not be liable if for any reason all or any part of
              the service is unavailable at any time or for any period. From
              time to time, we may restrict access to some parts of the service,
              or the entire service, to users.
            </p>
          </section>

          {/* Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                Unless otherwise stated, we own the intellectual property rights
                for all material on this service. All intellectual property
                rights are reserved. You may access content from our service for
                your own personal use, subject to restrictions set in these
                terms.
              </p>
              <p className="leading-relaxed">
                You retain all rights to content you submit, post, or display on
                or through the service. By submitting content, you grant us a
                worldwide, non-exclusive, royalty-free license to use, copy,
                reproduce, process, adapt, modify, publish, transmit, display,
                and distribute such content in any media.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Limitation of Liability
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              To the fullest extent permitted by applicable law, in no event
              will we be liable for any indirect, consequential, exemplary,
              incidental, special, or punitive damages, including lost profits,
              lost data, personal injury, or property damage related to, in
              connection with, or otherwise resulting from any use of the
              service.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Indemnification
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              You agree to defend, indemnify, and hold us harmless from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees arising out of your violation of
              these Terms of Service or your use of the service.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Severability and Waiver
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                If any provision of these Terms is held to be unenforceable or
                invalid, such provision will be changed and interpreted to
                accomplish the objectives of such provision to the greatest
                extent possible under applicable law, and the remaining
                provisions will continue in full force and effect.
              </p>
              <p className="leading-relaxed">
                Our failure to enforce any right or provision of these Terms
                will not be considered a waiver of those rights.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Modifications to Terms
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide notice of any material
              changes by posting the new Terms on this page and updating the
              "Last updated" date. Your continued use of the service after any
              changes constitutes acceptance of those changes.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Governing Law and Jurisdiction
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of your jurisdiction, without regard to its conflict of
              law provisions. You agree to submit to the personal and exclusive
              jurisdiction of the courts located within your jurisdiction for
              the resolution of any disputes.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Contact Us
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have any questions or concerns about these Terms of
              Service, please contact us at{" "}
              <a
                href="mailto:legal@yourcompany.com"
                className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
              >
                legal@yourcompany.com
              </a>
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              By using our service, you acknowledge that you have read these
              Terms of Service and agree to be bound by them. These terms
              constitute the entire agreement between you and us regarding the
              use of the service.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <BackButton className="text-slate-600 dark:text-slate-300" href="/">
            Back to Home
          </BackButton>
          <Link
            href="/privacy"
            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </main>
  );
}
