import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CheetFeed from "../components/feed/CheetFeed";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Feed() {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const [message, setMessage] = React.useState("");
  const [cheets, setCheets] = React.useState(null);

  const [refetch, setRefetch] = useState(0);
  const forceUpdate = () => setRefetch((refetch) => refetch + 1);

  useEffect(() => {
    async function fetchCheets() {
      const resp = await fetch("chitter/feedCheets", { method: "GET" });
      const data = await resp.json();
      setCheets(data.cheets);
    }
    fetchCheets();
  }, [setCheets, refetch]);

  async function postCheet() {
    if (message.trim().length > 0) {
      await fetch("chitter/postCheet", {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      });
    }
    setMessage("");
  }

  return loggedIn ? (
    <>
      <div className="block is-size-3">
        {"Post a cheet "}
        <Link to={`/profile/${authenticatedUserInfo.username}`}>
          <span className="has-text-info">{`@${authenticatedUserInfo.username}`}</span>
        </Link>
      </div>
      <div className="block">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            postCheet();
          }}
        >
          <div className="field cheet-form">
            <div className="control cheet-textarea">
              <textarea
                className="textarea"
                type="textarea"
                rows="3"
                placeholder="What's going on?"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <div className="control cheet-submit-button all-centered">
              <button
                className={
                  "button is-rounded " + (authenticatedUserInfo.super ? "is-danger" : "is-info")
                }
              >
                <i className="fa-solid fa-feather-pointed" />
              </button>
            </div>
          </div>
        </form>
        <CheetFeed cheets={cheets} updateParent={forceUpdate} />
      </div>
    </>
  ) : (
    <Navigate replace to="/" />
  );
}

export default Feed;
