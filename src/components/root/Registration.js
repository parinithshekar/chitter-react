import React from "react";

function Registration() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [superuser, setSuperuser] = React.useState(false);

  function validate() {
    return password.length >= 8 && !password.includes(" ");
  }
  async function register() {
    fetch("chitter/userRegister", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        super: superuser,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Set authenticated context
          alert("Account created!");
        } else {
          alert(`${data.errors[0].error} : Try again`);
        }
      })
      .catch((error) => {
        alert("Username exists! Try a different username");
      });
  }

  return (
    <form
      className="all-centered flex-vertical"
      onSubmit={(event) => {
        event.preventDefault();
        if (!validate()) {
          alert("Password should be at least 8 characters long and not contain spaces!");
          return;
        }
        register();
      }}
    >
      <h1 className="is-size-2 has-text-link">Create an account</h1>
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
                value={superuser}
                onChange={(event) => setSuperuser(event.target.value)}
              />
              {" Become a superuser "}
              <i className="fa-solid fa-fire has-text-danger" />
            </label>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default Registration;
