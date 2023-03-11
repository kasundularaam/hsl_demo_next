"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  console.log(email);

  const onSubmit = ({ e }: any) => {
    e.preventDefault();
    console.log();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-5 gap-5 text-gray-300">
      <h1 className="text-green-500 text-center font-bold text-3xl">Login</h1>
      <div className="flex flex-col m-auto bg-slate-700 p-20 rounded-lg">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 align-middle">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-600 p-2 border border-gray-400 rounded-sm"
              placeholder="example@example.com"
            />
          </div>
          <div className="flex flex-col gap-2 align-middle">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-slate-600 p-2 border border-gray-400 rounded-sm"
              placeholder="******"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}
