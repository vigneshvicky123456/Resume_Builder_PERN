import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { accountUser } from "../Features/userSlice";

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const templates = [
    { id: 1, name: "Classic" },
    { id: 2, name: "Modern" },
    { id: 3, name: "Creative" },
    { id: 4, name: "Minimalist" },
    { id: 5, name: "Professional" },
    { id: 6, name: "Elegant" },
    { id: 7, name: "Maple" },
    { id: 8, name: "Summit" },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    console.log("Selected Template ID:", templateId);
  };

  useEffect(() => {
    if (user) {
      console.log("Dispatching user details:", user);
      const userDetails = {
        //clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        // fullName: user.fullName,
        imageUrl: user.imageUrl,
      };
      dispatch(accountUser(userDetails));
      console.log("dashboard.js userDetails", userDetails);
    }
  }, [isSignedIn, isLoaded, user, dispatch, userData]);

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="h-[full] w-full bg-green-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
        <div className="grid grid-cols-4 gap-6">
          {templates.map((template) => (
            <Link to="/resume">
              <div
                key={template.id}
                className="relative group h-[330px] border rounded-lg overflow-hidden"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="h-[275px] bg-cover bg-red-100 border-b bg-center transition-all duration-300 group-hover:h-[230px]">
                  Image
                </div>

                <div className="h-[55px] flex flex-col justify-center items-center bg-white p-2">
                  <h3 className="text-xl font-semibold mb-2">
                    {template.name}
                  </h3>
                  <div className="absolute bottom-0 pb-2 left-0 right-0 bg-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      // onClick={() => handleSelectTemplate(template.id)}
                      className="bg-blue-500 text-white py-2 px-12 rounded-full hover:bg-blue-700"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {selectedTemplate && (
          <div className="mt-6">
            <p className="text-lg">Selected Template ID: {selectedTemplate}</p>
          </div>
        )}
      </div>

      <h1>Dashboard Page</h1>

      {/* <div>
        <h1>User Profile</h1>
        <p>User ID: {user.id}</p>
        <p>Email: {user.primaryEmailAddress.emailAddress}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>full Name: {user.fullName}</p>
        <p>imageUrl: {user.imageUrl}</p>
      </div>
      <br></br>
      <div>
        <h1>Logged-in User Information</h1>
        <p>Email: {userData.email}</p>
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Full Name: {userData.fullName}</p>
      </div> */}
    </div>
  );
};

export default Dashboard;
