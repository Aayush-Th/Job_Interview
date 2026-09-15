import { useContext, useState } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () =>  {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { user, setUser, loading } = context;
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (email, password) => {
        setSubmitting(true);   
        setError(null);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return true;
        } catch(err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Login failed");
            return false;
        } finally {
            setSubmitting(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        setSubmitting(true);
        setError(null);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return true;
        } catch(err) {
            console.error("Register failed:", err);
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setSubmitting(false);
        }
    }

    const handleLogout = async () => {
        setSubmitting(true);
        try {
            await logout();
            setUser(null);
        } catch(err) {
            console.error("Logout failed:", err);
        } finally {   
            setSubmitting(false);
        }
    }

    return { user, loading, submitting, error, handleLogin, handleRegister, handleLogout };
}