import { Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

import AdminDashboard from "@/pages/admin/AdminDashboard";

const AdminRoutes = (
  <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Route>
);

export default AdminRoutes;
