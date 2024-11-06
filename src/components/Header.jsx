import { Link } from "react-router-dom";
import { useContext  } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  return(
    <header className="header">
      <div className="header-left">
        <Link to="/" className="site-title">Nomad News</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <span>Hey {loggedInUser.username} </span>
      </nav>
    </header>
  );
};