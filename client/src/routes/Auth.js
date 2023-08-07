import React from "react";
import Signup from "../Components/Signup/Signup";
import Signin from "../Components/Signin/Signin";
import CreateProduct from "../Components/CreateProduct/CreateProduct";

import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "../utils/routes";

const AuthRoutes = () => (
  <Routes>
    <Route path={ROUTES.AUTH_ROUTES.signin} element={<Signin />} />
    <Route path={ROUTES.AUTH_ROUTES.signup} element={<Signup />} />
    {/* <Route
      path="*"
      element={<Navigate to={ROUTES.AUTH_ROUTES.login} replace />}
    /> */}
  </Routes>
);

export default AuthRoutes;
