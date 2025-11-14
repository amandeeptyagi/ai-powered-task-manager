import { createContext, useEffect, useState } from "react";
import { getUser, logoutUser } from "@/services/authApi"
import { deleteUserProfile } from "@/services/userApi";
import { deleteAdminProfile } from "@/services/adminApi";
import { toast } from "react-hot-toast";

//AuthContext created
export const AuthContext = createContext();

//auth provider created
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setLoading(true)
            const res = await getUser();
            if (!res.data.user) throw new Error('User not Autherised, Please login');
            setUser(res.data.user);
            toast.success('User authenticated successfully');
        } catch (error) {
            console.warn('User not logged in:', error.message);
            setUser(null);
            toast.error('User not authenticated, Please login');
        } finally {
            setLoading(false);
        }
    }

    //fetch user on mounting (or refreshing)
    useEffect(() => {
        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null)
        } catch (e) {
            console.error('Logout failed', e)
            throw e;
        }
    }

    const deleteProfile = async (e) => {
        try {
            if (user.role === 'ADMIN') {
                await deleteAdminProfile();
            }
            if (user.role === 'USER') {
                await deleteUserProfile();
            }
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, logout, deleteProfile, loading }}>
            {children}
        </AuthContext.Provider>
    )
}