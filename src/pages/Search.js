import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Search() {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const resp = await fetch("chitter/users");
      const data = await resp.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return loggedIn ? (
    !!users && (
      <>
        <div className="block field search-form">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search by username"
              onInput={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="block search-results">
          <div className="webdsl-placeholder">
            {!!query &&
              users
                .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                .map((user) => (
                  <Link to={`/profile/${user.username}`} key={user.username}>
                    <div className="card">
                      <div className="card-content">
                        <div className="subtitle user-name">
                          <>
                            {!!user.super && (
                              <>
                                <i className="fa-solid fa-fire has-text-danger" />{" "}
                              </>
                            )}
                            {`@${user.username}`}
                          </>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </>
    )
  ) : (
    <Navigate replace to="/" />
  );
}

export default Search;
