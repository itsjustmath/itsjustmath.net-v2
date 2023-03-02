import Link from "next/link";

export default function Header(props) {
  return (
    <header>
      <h1 className="header-title">
        <a href="/">itsjustmath.net</a>
      </h1>
      <h2 className="header-subtitle">
        Observations and advice on navigating the ever-changing digital
        landscape.
      </h2>
      {/* TODO: active state */}
      <nav className="group">
        <Link href="/">Start Here</Link>
        <Link href="/essays">Essays</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/newsletter">Newsletter</Link>
      </nav>
    </header>
  );
}
