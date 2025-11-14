import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const UnProtectedRoutes = () => {
    const { user, loading } = useAuth();

    // if (loading) {
    //     return <div className="text-center py-10">Loading...</div>;
    // }

    if (user) {
        //Redirect based on user role
        if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
        if (user.role === "USER") return <Navigate to="/user/dashboard" replace />;
    }

    return <Outlet />;
};

export default UnProtectedRoutes;
