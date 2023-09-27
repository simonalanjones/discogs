import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the artist you were looking for.</p>
      <p>
        Go back to the <Link href="/">My collection</Link>
      </p>
    </main>
  );
}
