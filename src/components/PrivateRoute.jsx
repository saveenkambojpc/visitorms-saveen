import React, { useEffect, useState } from "react";

import { Redirect, Route, Navigate } from "react-router";

import Sidebar from "./Sidebar";

export default function PrivateRoute({ children }) {
  //   const auth = useAuth();
  const auth = true;

  //   const sidebarState = useSelector((store) => store.sidebar);

  if (!auth) {
    return <Navigate to="/unauth" />;
  }

  return <>
  <div>
    This is private router
    {children}
  </div>
  </>;
}
