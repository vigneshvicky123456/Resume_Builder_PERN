import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";

const TopNavbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return null;
  }

  if (!isSignedIn) {
    console.log("Redirecting to /sign-in");
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div>
    <div className="h-[62px] w-full flex justify-between items-center px-4">
      <h1 className="text-lg font-bold">Resume Builder</h1>
      <div className="flex items-center space-x-4">
        <UserButton />
      </div>
    </div>
    <Outlet />
  </div>
  );
};

export default TopNavbar;
