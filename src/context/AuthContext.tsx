"use client";
import React, {
  useContext,
  useEffect,
  createContext,
  useState,
  useMemo,
} from "react";
import { AuthContextType, User } from "@/types";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { catchErrorMessage } from "@/utils";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | null>(null);

const IS_PRIVATE_PATH = ["/update-profile", "/"];

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (IS_PRIVATE_PATH.includes(pathname)) {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [pathname]);

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout");
      const data = await response.data;
      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      catchErrorMessage(error);
    }
  };

  const values = useMemo(
    () => ({
      user,
      logout,
    }),
    [user]
  );

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data;
      setUser(data.user);
    } catch (error) {
      setUser(null);
      catchErrorMessage(error);
    }
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
