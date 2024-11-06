import { Link } from "react-router-dom";

export default function Header() {
  return(
    <header className="header">
      <div className="header-left">
        <Link to="/" className="site-title">Nomad News</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};