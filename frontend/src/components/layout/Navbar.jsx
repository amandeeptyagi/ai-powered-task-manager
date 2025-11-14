import { Link } from "react-router-dom";
import { Menu, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
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
    <nav className="z-1 w-full bg-none backdrop-blur-lg shadow px-6 lg:px-20 py-3 flex items-center justify-between sticky top-0">
      {/* Logo */}
      <Link to="/" className="text-4xl font-bold text-lime-700 font-serif flex items-center gap-5">
      <img src="/task-logo.png" className="h-15 w-15" alt="" />
        TakeTask
      </Link>

      {/* Right Side */}
      <div className="flex flex-1 flex-row-reverse lg:flex-row items-center justify-between gap-4">
        {!user ? (
          <>
            <div className="hidden lg:flex items-center gap-3 ml-20">

            </div>

           <div className="hidden lg:flex items-center gap-3">

  {/* Login Button */}
  <Link to="/login">
    <button
  onClick={() => console.log("Login clicked")}
  className={`group flex items-center justify-start w-[50px] h-[50px] rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none relative overflow-hidden shadow-md shadow-black/20 transition-all duration-300
    cursor-pointer bg-[rgb(197_224_181)] hover:w-[125px] active:translate-x-[2px] active:translate-y-[2px] hover:bg-lime-700
  `}
>
  {/* Icon section */}
  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-[30%] group-hover:pl-5">
    <svg
      viewBox="0 0 512 512"
      className="w-[17px] fill-lime-700 group-hover:fill-white transition-colors"
    >
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3L374.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H402.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 64c17.7 0 32-14.3 32-32S177.7 0 160 0L96 0C43 0 0 43 0 96V416c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h64z"/>
    </svg>
  </div>

  {/* Text section */}
  <div
    className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:w-[70%] group-hover:opacity-100 group-hover:pr-[10px]"
  >
    Login
  </div>
</button>

  </Link>

  {/* Sign Up Button */}
  <Link to="/register-user">
    <button
      className="group relative flex items-center justify-center w-[50px] h-[50px] rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none bg-[rgb(197_224_181)] border-none font-semibold shadow-[0_0_20px_rgba(0,0,0,0.164)] cursor-pointer overflow-hidden transition-all duration-300 hover:w-[140px] hover:bg-lime-700"
    >
      {/* Icon */}
      <svg
        viewBox="0 0 448 512"
        className="w-[14px] fill-lime-700 transition-all duration-300 group-hover:w-[50px] group-hover:translate-y-[60%] group-hover:fill-white"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm89.6 32h-8.7c-22 10.1-46.4 16-72.9 16s-50.9-5.9-72.9-16h-8.7C67.1 288 0 355.1 0 438.4V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48v-25.6C448 355.1 380.9 288 313.6 288z"/>
      </svg>

      {/* Text */}
      <span className="absolute top-[-20px] text-white opacity-0 text-[2px] transition-all duration-300 group-hover:text-[13px] group-hover:opacity-100 group-hover:translate-y-[30px]">
        Sign Up
      </span>
    </button>
  </Link>

</div>

          </>
        ) : (
          <>
            <div className="hidden lg:flex items-center gap-3 ml-20">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex gap-4">

<button
  onClick={handleLogout}
  disabled={isLoggingOut}
  className={`group flex items-center justify-start w-[50px] h-[50px] rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none relative overflow-hidden shadow-md shadow-black/20 transition-all duration-300
    ${isLoggingOut
      ? "cursor-pointer bg-[rgb(197_224_181)] w-[150px] active:translate-x-[2px] active:translate-y-[2px] hover:bg-lime-700"
      : "cursor-pointer bg-[rgb(197_224_181)] hover:w-[125px] active:translate-x-[2px] active:translate-y-[2px] hover:bg-lime-700"
    }`}
>
  {/* Icon or loader */}
  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-[30%] group-hover:pl-5">
    {isLoggingOut ? (
      // <svg
      //   className="animate-spin h-5 w-5 text-white"
      //   fill="none"
      //   viewBox="0 0 24 24"
      // >
      //   <LoaderCircle className="text-white" />
      // </svg>
      <span></span>
    ) : (
      <svg
        viewBox="0 0 512 512"
        className="w-[17px] fill-lime-700 group-hover:fill-white transition-colors"
      >
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
      </svg>
    )}
  </div>

  {/* Text */}
  <div
    className={`absolute right-0 text-lg font-semibold transition-all duration-300
      ${isLoggingOut
        ? "text-white w-full opacity-100 pr-3 text-center whitespace-nowrap overflow-hidden"
        : "text-white w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100 group-hover:pr-[10px]"
      }`}
  >
    {isLoggingOut ? "Logging out..." : "Logout"}
  </div>
</button>



              <button
                onClick={() => setShowConfirm(true)}
                className="group relative flex items-center justify-center w-[50px] h-[50px] rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none bg-[rgb(197_224_181)] border-none font-semibold shadow-[0_0_20px_rgba(0,0,0,0.164)] cursor-pointer overflow-hidden transition-all duration-300 hover:w-[140px]  hover:bg-lime-700"
              >
                {/* <!-- Icon --> */}
                <svg
                  viewBox="0 0 448 512"
                  className="w-[12px] fill-lime-700 transition-all duration-300 group-hover:w-[50px] group-hover:translate-y-[60%] group-hover:fill-white"
                >
                  <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                  ></path>
                </svg>

                {/* <!-- “Delete” text (acts like ::before) --> */}
                <span
                  className="absolute top-[-20px] text-white opacity-0 text-[2px] transition-all duration-300 group-hover:text-[13px] group-hover:opacity-100 group-hover:translate-y-[30px]"
                >
                  Delete Profile
                </span>
              </button>
            </div>


          </>
        )}

        <button
          onClick={onMenuClick}
          className="px-2 h-9 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-8 w-8 text-lime-700" />
        </button>
      </div>
      {/*  Custom Confirmation Dialog */}
      <ConfirmDialog
        open={showConfirm}
        title="Delete Profile"
        description="Are you sure you want to delete your profile? This action cannot be undone."
        onConfirm={handleDeleteProfile}
        onCancel={() => setShowConfirm(false)}
      />
    </nav>
  );
};

export default Navbar;
