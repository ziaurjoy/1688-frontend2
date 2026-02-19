import Link from "next/link";

export default function Homepage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div>Home Page</div>
      <Link className="mt-10" href={"sign-in"}>
        Login
      </Link>
      <Link className="mt-5" href={"admin-dashboard"}>
        Dashboard
      </Link>
    </div>
  );
}
