import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between px-5 py-2">
      <Link href="/">Handicraft Sri Lanka</Link>
      <div className="flex flex-row gap-2">
        <Link href="/about">About</Link>
        <Link href="/users">Users</Link>
        <SignOutButton />
      </div>
    </div>
  );
}
