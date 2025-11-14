import { Route } from "react-router-dom";
import UnProtectedRoutes from "@/routes/UnProtectedRoutes";

import HomePage from "@/pages/public/HomePage";
import LoginPage from "@/pages/public/LoginPage";
import RegisterPage from "@/pages/public/RegisterPage";
import UnAuthorized from "@/pages/public/UnAuthorized";

const PublicRoutes = (
    <>
        <Route element={<UnProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register-user" element={<RegisterPage />} />
        </Route>
        <Route path="/unauthorized" element={<UnAuthorized />} />
    </>
);

export default PublicRoutes;
