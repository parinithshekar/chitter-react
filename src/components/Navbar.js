import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Navbar() {
  const { authenticatedUserInfo, setAuthenticatedUserInfo } =
    React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const navigate = useNavigate();

  async function logout() {
    // logoutChitter();
    const logoutResponse = await fetch("/chitter/userLogout", {
      method: "POST",
    });
    const logoutData = await logoutResponse.json();
    if (logoutData.success) {
      setAuthenticatedUserInfo(null);
      navigate("/");
    } else {
      alert("Try that again!");
    }
  }

  return (
    <div className="navbar is-light">
      <div className="container is-max-desktop">
        <div className="navbar-contents">
          <div className="all-centered">
            {!!loggedIn ? (
              <Link to="/feed" className="all-centered">
                <i className="fa-brands fa-twitter fa-2x" />
                <span className="has-text-centered has-text-weight-semibold">Chitter</span>
              </Link>
            ) : (
              <div className="all-centered">
                <i className="fa-brands fa-twitter fa-2x" />
                <span className="has-text-centered has-text-weight-semibold">Chitter</span>
              </div>
            )}
          </div>
          <div className="all-centered">
            {!!loggedIn && (
              <>
                <Link to={`/profile/${authenticatedUserInfo.username}`}>
                  <i className="fa-solid fa-user fa-2x" />
                </Link>
                <Link to="/search">
                  <i className="fa-solid fa-magnifying-glass fa-2x" />
                </Link>
                <div onClick={logout} style={{ cursor: "pointer" }}>
                  <i className="fa-solid fa-arrow-right-from-bracket fa-2x has-text-link" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
