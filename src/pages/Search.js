import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

function Search() {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const loggedIn = !!authenticatedUserInfo;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return <h1>Search Page</h1>;
}

export default Search;
