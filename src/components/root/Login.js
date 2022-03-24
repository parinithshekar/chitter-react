import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedUserContext from "../../contexts/AuthenticatedUserContext";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const { setAuthenticatedUserInfo } = React.useContext(AuthenticatedUserContext);

  const navigate = useNavigate();

  async function login() {
    const response = await fetch("chitter/userLogin", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      // Set authenticated context
      const userInfoResponse = await fetch("chitter/currentUser");
      const userInfoData = await userInfoResponse.json();
      if (userInfoData.success) {
        setAuthenticatedUserInfo(userInfoData.user);
        // Redirect to feed
        navigate("/feed");
      } else {
        alert("Try again");
      }
    } else {
      alert("Incorrect credentials");
    }
  }

  return (
    <form
      className="all-centered flex-vertical"
      onSubmit={(event) => {
        event.preventDefault();
        login();
      }}
    >
      <h1 className="is-size-2 has-text-link">Welcome back!</h1>
      <div>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Type your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                value={loggedIn}
                onChange={(event) => setLoggedIn(event.target.value)}
              />
              {" Stay logged in"}
            </label>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
