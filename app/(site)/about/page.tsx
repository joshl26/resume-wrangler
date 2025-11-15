// app/about/page.tsx
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import {
  Heart,
  Target,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Globe,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about Resume Wrangler and our mission to revolutionize job applications",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-violet-950 dark:to-fuchsia-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Briefcase className="w-16 h-16 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Resume Wrangler
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Revolutionizing how job seekers prepare their application materials
            with AI-powered customization.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            <p>
              Resume Wrangler is a dynamic and innovative resume and cover
              letter customization tool aimed at revolutionizing how job seekers
              prepare their application materials. This web application provides
              an intuitive platform where users can input their professional
              information and automatically generate tailored resumes and cover
              letters based on specific job descriptions.
            </p>
            <p>
              We take pride in our Artificial Intelligence (AI)-powered software
              that scans resumes using an in-house ATS scanner. Additionally, we
              leverage open-source language grammar and spell checking to
              further enhance our software's accuracy.
            </p>
            <p>
              Our platform simplifies the application process and significantly
              enhances the relevance and appeal of application documents to
              prospective employers. We parse user data and align it seamlessly
              with the qualifications sought by employers, incorporating smart
              algorithms that highlight the most relevant experiences, skills,
              and achievements.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg leading-relaxed text-violet-50">
              To empower job seekers with innovative AI-powered tools that
              create tailored, professional application materials, helping them
              stand out in competitive job markets and land their dream
              positions.
            </p>
          </div>

          <div className="bg-linear-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg leading-relaxed text-fuchsia-50">
              A future where every job seeker has access to sophisticated,
              AI-driven career tools that level the playing field and make
              professional success accessible to all.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                AI-Powered Customization
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Complex matching algorithms that emphasize relevant details for
                each job posting.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                In-House ATS Scanner
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Ensure your resume passes Applicant Tracking Systems with our
                proprietary scanner.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Job Board Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Direct integration with popular hiring platforms for accurate
                document tailoring.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Clean, responsive design with simple navigation for effortless
                document creation.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Data Security
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Advanced security protocols with encrypted storage to protect
                your personal data.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Professional Templates
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access to a wide range of pre-made resume and cover letter
                templates.
              </p>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Membership Options
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Basic (Free)
                </h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Explore the platform and create customized materials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    ✓
                  </span>
                  <span>Access to basic resume and cover letter templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Standard PDF downloads (limited to 5 per day in future)
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-violet-500 dark:border-violet-400 rounded-xl p-6 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Pro
                </h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 dark:text-violet-400 mt-1">
                    ✓
                  </span>
                  <span>Up to 100 full-color PDF downloads per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 dark:text-violet-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Vector graphics with clickable links and custom colors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 dark:text-violet-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Access to premium templates and user image uploads
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 dark:text-violet-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Priority support and advanced customization options
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Built With Modern Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Frontend</h3>
              <p className="text-slate-300">
                React 19, Next.js 16, TypeScript, Tailwind CSS
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Backend</h3>
              <p className="text-slate-300">
                Next.js API Routes, Node.js, PostgreSQL
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Testing & Deployment</h3>
              <p className="text-slate-300">
                Jest, Playwright, Vercel, CI/CD with GitHub Actions
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-violet-200" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-violet-200">Resumes Generated</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-violet-200" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">5K+</div>
              <div className="text-violet-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-violet-200" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">98%</div>
              <div className="text-violet-200">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-violet-200" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-violet-200">Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-xl text-violet-100 mb-6 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their
            dream jobs with Resume Wrangler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-violet-600 hover:bg-violet-50 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="bg-violet-800 hover:bg-violet-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <BackButton className="text-slate-600 dark:text-slate-300" href="/">
            Back to Home
          </BackButton>
        </div>
      </div>
    </main>
  );
}
