import React from "react";
import Routes from "./Routes";
import AuthenticatedUserContext from "./contexts/AuthenticatedUserContext";

function App() {
  // Global authenticated user
  const [authenticatedUserInfo, setAuthenticatedUserInfo] = React.useState(null);

  return (
    <div className="App">
      <AuthenticatedUserContext.Provider
        value={{ authenticatedUserInfo, setAuthenticatedUserInfo }}
      >
        <Routes />
      </AuthenticatedUserContext.Provider>
    </div>
  );
}

export default App;
