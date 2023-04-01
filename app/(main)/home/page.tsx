"use client";
import { useAuth } from "@/contexts/auth/AuthContext";

export default function Home() {
  const { useGetUid, useGetUser } = useAuth()!;
  const uid = useGetUid();
  const { isLoading, data, error } = useGetUser(uid!);

  return (
    <main>
      <h1 className="text-red-500 text-7xl">Home Page</h1>
      {isLoading && <div>Loading...</div>}
      {data && <div>Hello {data.name}</div>}
      {error && <div>{error.message}</div>}
      <p>Welcome To The App</p>
    </main>
  );
}
