import { Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

import UserDashboard from "@/pages/user/UserDashboard";

const StudentRoutes = (
  <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
    <Route path="/user/dashboard" element={<UserDashboard />} />
  </Route>
);

export default StudentRoutes;