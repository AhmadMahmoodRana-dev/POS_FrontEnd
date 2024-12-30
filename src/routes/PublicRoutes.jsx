import { Context } from "@/context/Context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const {user} = useContext(Context);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
