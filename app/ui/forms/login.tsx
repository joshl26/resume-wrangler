"use client";

import React, { useState } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react"; // ✅ Import signIn
import { LoginButton } from "../login-button";
import { emailRegex } from "@/app/lib/regex";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      window.location.href = "/dashboard"; // or useRouter().push("/dashboard")
    }
  };

  const emailOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h1 className="text-[2rem] font-bold text-center">Log In</h1>

      <div className="flex-1 rounded-lg form-amber p-8">
        <div className="w-full">
          <div>
            <label className="block font-bold" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={emailOnChangeHandler}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                minLength={6}
                value={password}
                onChange={passwordOnChangeHandler}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <LoginButton
          className={`btn btn-amber mt-6 ${loading ? "opacity-70 pointer-events-none" : "animate-pulse"}`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Log In"}
        </LoginButton>

        <div className="flex items-end">
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                {error}
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}