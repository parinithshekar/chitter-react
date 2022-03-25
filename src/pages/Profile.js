import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CheetFeed from "../components/feed/CheetFeed";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { authenticatedUserInfo } = useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const [refetch, setRefetch] = useState(0);
  const forceUpdate = () => setRefetch((refetch) => refetch + 1);

  const { id: userId } = useParams();

  useEffect(() => {
    async function fetchUserInfo() {
      const resp = await fetch(`/chitter/userInfo/${userId}`);
      const data = await resp.json();
      setUserInfo(data);
    }
    fetchUserInfo();
  }, [userId, refetch]);

  async function follow() {
    await fetch(`/chitter/follow/${userId}`, { method: "POST" });
    forceUpdate();
  }

  async function unfollow() {
    await fetch(`/chitter/unfollow/${userId}`, { method: "POST" });
    forceUpdate();
  }

  return !!loggedIn ? (
    !!userInfo && (
      <>
        <div className="block is-size-3 user-intro">
          <div className="has-text-info">
            {!!userInfo.super && (
              <>
                <i className="fa-solid fa-fire has-text-danger" />{" "}
              </>
            )}
            {`@${userInfo.username}'s cheets`}
          </div>
          <div className="subtitle user-follow-button">
            {!userInfo.isPrincipal && (
              <>
                {userInfo.isFollowing ? (
                  <button
                    className="button is-danger is-light is-rounded"
                    onClick={() => unfollow()}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button className="button is-info is-rounded" onClick={() => follow()}>
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <CheetFeed cheets={userInfo.cheets} />
      </>
    )
  ) : (
    <Navigate replace to="/" />
  );
}

export default Profile;
