"use client";

import { logout } from "@/lib/store/authSlice";
import { RootState } from "@/lib/store/store";
import { Button } from "@mui/material";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Dashboard
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            startIcon={<LogOut />}
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Logout
          </Button>
        </div>
        <p className="text-lg text-gray-600">
          You have successfully logged in to your account.
        </p>
      </div>
    </div>
  );
}
