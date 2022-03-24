import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/root/Login";
import Registration from "../components/root/Registration";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Root() {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/feed");
    }
  });

  return (
    <>
      <Login />
      <hr />
      <Registration />
    </>
  );
}

export default Root;
