import { Context } from "@/context/Context";
import Layout from "@/Page/Layout";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const {user} = useContext(Context);
  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
