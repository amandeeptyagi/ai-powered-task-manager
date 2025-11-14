import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Sidebar = ({ open, onClose }) => {
  const { user, logout, deleteProfile } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      toast.success("Profile deleted successfully");
    } catch (error) {
      toast.error("Failed to delete profile");
    } finally {
      setShowConfirm(false);
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success("Logout successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
      onClose();
    }
  };

  // role specific links
  const userLinks = [
    { to: "/user/dashboard", label: "Dashboard" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
  ];

  const links =
    user?.role === "user"
      ? userLinks
      : user?.role === "admin"
        ? adminLinks
        : [];

  return (
    <aside
      className={`z-2 flex flex-col fixed top-0 right-0 h-full w-full shadow-md bg-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button for mobile */}
      <div className="w-full shadow flex justify-between items-center py-3 px-6">
        <div className="flex items-center">
          <img src="/task-logo.png" className="h-15 w-15" alt="" />
          <Link to="/" className="text-4xl font-bold text-lime-700 font-serif flex items-center gap-5">
            TakeTask
          </Link>
        </div>
        <button onClick={onClose} className="px-2 h-9 rounded-md hover:bg-gray-100">
          <X className="h-8 w-8 text-lime-700" />
        </button>
      </div>

      {!user ? (
        <>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-3 p-4 px-6">

            </div>
            <div className="w-full flex flex-col gap-3 p-2 px-6">
              <Link to="/login">
                <Button variant="outline" className="w-full h-13 rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none bg-white text-lime-700 hover:bg-lime-700 font font-bold text-lg border-2 border-lime-700 cursor-pointer hover:text-white" onClick={onClose}>Login</Button>
              </Link>
              <Link to="/register-user">
                <Button className="w-full h-13 rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none bg-lime-700 text-white font font-bold text-lg hover:cursor-pointer hover:bg-black" onClick={onClose}>Sign Up</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-3 p-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="p-2 rounded hover:bg-gray-100 border-b"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="w-full flex flex-col gap-3 p-2 px-6">
              <Button variant="outline" onClick={() => { handleLogout(); }} disabled={isLoggingOut} className="h-13 rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none bg-lime-700 text-white hover:bg-lime-800 font font-bold text-lg">
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowConfirm(true)} className="h-13 rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none bg-red-700 text-white hover:bg-red-800 font font-bold text-lg">
                Delete Profile
              </Button>
            </div>
          </div>
        </>
      )}
      {/*  Custom Confirmation Dialog */}
      <ConfirmDialog
        open={showConfirm}
        title="Delete Profile"
        description="Are you sure you want to delete your profile? This action cannot be undone."
        onConfirm={handleDeleteProfile}
        onCancel={() => setShowConfirm(false)}
      />
    </aside>
  );
};

export default Sidebar;
