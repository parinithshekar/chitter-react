import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Profile() {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const { id: userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return <h1>Profile Page: {userId}</h1>;
}

export default Profile;
