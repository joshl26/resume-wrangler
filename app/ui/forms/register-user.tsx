"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";
import BackButton from "../back-button";

export default function RegisterUser() {
  const [error, setError] = useState("");
  const { pending } = useFormStatus();
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  //TODO make this into form action, handleSubmit should be something like signup in our @/app/lib/actions.ts file
  const handleSubmit = async (formData: FormData) => {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
      }),
    });

    if (response.status === 200) {
      redirect("/login");
    }

    if (response.status === 500) {
      setError("Email address already in use. Please try another.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-col justify-center m-auto">
        <h2 className="text-center font-medium text-[2rem] py-2">
          New User Sign Up
        </h2>
        <form
          action={handleSubmit}
          className="flex flex-col form-amber gap-2 mx-auto w-[400px] tight-shadow px-4 pb-4 pt-3 mb-3"
        >
          <label htmlFor="username">Username</label>
          <input
            disabled={pending}
            name="username"
            className="border border-slate-300 rounded"
            type="text"
            required
            placeholder="Type your Username"
            onChange={onChangeHandler}
          />
          <label htmlFor="email">Email</label>
          <input
            disabled={pending}
            name="email"
            className="border border-slate-300 rounded"
            type="email"
            required
            placeholder="Type your email address"
            onChange={onChangeHandler}
          />
          <label htmlFor="email">Password</label>
          <input
            disabled={pending}
            name="password"
            className="border border-slate-300 rounded"
            type="password"
            required
            placeholder="Type your password"
            onChange={onChangeHandler}
          />
          {edited && (
            <>
              <SubmitButton className="btn btn-amber my-2">
                Register New User
              </SubmitButton>
            </>
          )}

          {error && <p>{error}</p>}
        </form>
        <BackButton href={"/"}>Back</BackButton>
      </div>
    </div>
  );
}
