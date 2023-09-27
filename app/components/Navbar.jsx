import Link from "next/link";
import Image from "next/image";
import Logo from "./profile-discogs.png";
export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <Image
          src={Logo}
          alt="Site logo"
          width={70}
          quality={100}
          placeholder="blur"
        />
      </Link>
      <h1>My Discogs collection</h1>

      {/* <Link href="/">Releases</Link> */}
      {/* <Link href="/tickets">Tickets</Link> */}
    </nav>
  );
}
