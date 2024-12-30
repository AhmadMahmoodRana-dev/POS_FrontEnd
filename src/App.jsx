import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyForm from "./components/Forms/CompanyForm";
import Home from "./Page/Home";
import PrivateRoutes from "./routes/PrivateRoutes";
import Testing from "./Page/Testing";
import UserDrawer from "./components/Sidebar/UserDrawer";
import PublicRoutes from "./routes/PublicRoutes";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";

const App = () => {
  return (
    <div>
      <Routes>
      <Route element={<PublicRoutes />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/sss" element={<Testing />} />
          <Route path="/company-form" element={<CompanyForm />} />
        </Route>
        <Route path="*" element={() => <h1>Page Not Found</h1>} />
      </Routes>
      <UserDrawer/>
    </div>
  );
};  

export default App;
