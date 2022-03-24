import React from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import Base from "./components/Base";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import Search from "./pages/Search";

function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Base />}>
        <Route index element={<Root />} />
        <Route path="feed" element={<Feed />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="search" element={<Search />} />
      </Route>
    </ReactRoutes>
  );
}

export default Routes;
