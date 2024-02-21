"use client";

import { FormEvent } from "react";
import { Button } from "../ui/button";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <label htmlFor="username">Username</label>
      <input
        name="username"
        className="border border-black  text-black"
        type="text"
        required
        placeholder="Type your Username"
      />
      <label htmlFor="email">Email</label>
      <input
        name="email"
        className="border border-black text-black"
        type="email"
        required
        placeholder="Type your email address"
      />
      <label htmlFor="email">Password</label>
      <input
        name="password"
        className="border border-black  text-black"
        type="password"
        required
        placeholder="Type your password"
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
