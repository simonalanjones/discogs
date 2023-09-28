import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-5xl">404</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href="/">home page</Link>
      </p>
    </main>
  );
}
