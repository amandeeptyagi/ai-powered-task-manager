import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import ServerConnecting from "@/components/ui/ServerConnecting";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Toast notifications */}
     <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            // background: "#fff",
            // color: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      />
      <ServerConnecting loading={loading} />
    </div>
  );
};

export default MainLayout;
