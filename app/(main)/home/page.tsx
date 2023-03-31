"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const user = useAuth();

  return (
    <main>
      <h1 className="text-red-500 text-7xl">Home Page</h1>
      {user ? <h2>Hello {user.name}</h2> : <></>}
      <p>Welcome To The App</p>
    </main>
  );
}
