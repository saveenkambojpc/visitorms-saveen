import React, { useEffect, useState } from "react";

import { Redirect, Route, Navigate } from "react-router";

import Sidebar from "./Sidebar";

export default function PrivateRoute({ children }) {
  //   const auth = useAuth();
  const auth = JSON.parse(sessionStorage.getItem("auth"));

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>
        <Sidebar>{children}</Sidebar>
      </div>
    </>
  );
}
