import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';

import PublicRoutes from "@/routes/publicRoutes";
import UserRoutes from "@/routes/userRoutes";
import AdminRoutes from "@/routes/adminRoutes";
import NotFound from './pages/public/NotFound';

function App() {

  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {PublicRoutes}
            {UserRoutes}
            {AdminRoutes}
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  )
}

export default App
