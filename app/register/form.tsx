"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { authenticate } from "../lib/actions";
import { redirect } from "next/navigation";

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-4 w-full" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function SignupInputs() {
  const { pending } = useFormStatus();

  return (
    <>
      <label htmlFor="username">Username</label>
      <input
        disabled={pending}
        name="username"
        className="border border-black  text-black"
        type="text"
        required
        placeholder="Type your Username"
      />
      <label htmlFor="email">Email</label>
      <input
        disabled={pending}
        name="email"
        className="border border-black text-black"
        type="email"
        required
        placeholder="Type your email address"
      />
      <label htmlFor="email">Password</label>
      <input
        disabled={pending}
        name="password"
        className="border border-black  text-black"
        type="password"
        required
        placeholder="Type your password"
      />
    </>
  );
}

// export default function Form() {
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const response = await fetch(`/api/auth/register`, {
//       method: "POST",
//       body: JSON.stringify({
//         username: formData.get("username"),
//         email: formData.get("email"),
//         password: formData.get("password"),
//       }),
//     });
//     console.log({ response });
//   };
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-2 mx-auto max-w-md mt-10"
//     >
//       <label htmlFor="username">Username</label>
//       <input
//         name="username"
//         className="border border-black  text-black"
//         type="text"
//         required
//         placeholder="Type your Username"
//       />
//       <label htmlFor="email">Email</label>
//       <input
//         name="email"
//         className="border border-black text-black"
//         type="email"
//         required
//         placeholder="Type your email address"
//       />
//       <label htmlFor="email">Password</label>
//       <input
//         name="password"
//         className="border border-black  text-black"
//         type="password"
//         required
//         placeholder="Type your password"
//       />
//       {/* <Button type="submit">Register</Button> */}
//       <SignupButton />
//     </form>
//   );
// }

export default function Form() {
  //   const [code, action] = useFormState(authenticate, undefined);

  const [error, setError] = useState("");

  //TODO make this into form action, handleSubmit should be something like signup in our @/app/lib/actions.ts file
  const handleSubmit = async (formData: FormData) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    // if ({ response. } === "success") {
    // }

    if (response.status === 200) {
      redirect("/login");
    }

    if (response.status === 500) {
      //   setError(response.statusText);
      setError("Email address already in use. Please try another.");
    }

    console.log(response);
    console.log(error);
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <SignupInputs />
      <SignupButton />
      {error && <p>{error}</p>}
    </form>
  );
}
