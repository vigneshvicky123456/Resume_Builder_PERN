import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { accountUser, getAccountUser } from "../Features/userSlice";
import { allResumes, selectedId, getResumeById } from "../Features/resumeSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  //const { userData } = useSelector((state) => state.auth);
  const { resumes } = useSelector((state) => state.resume);

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

  const handleSelectTemplate = (templateId) => {
    dispatch(selectedId(templateId));
    console.log("Selected Template ID:", templateId);
    navigate("/resume");
  };

  useEffect(() => {
    if (user) {
      // const userDetails = {
      //   clerkUserId: user.id,
      //   email: user.primaryEmailAddress.emailAddress,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   imageUrl: user.imageUrl,
      // };
      //dispatch(accountUser(userDetails));
      // console.log("dashboard.js dispatch accountUser(userDetails)", userDetails);
      //dispatch(getAccountUser(user.id));
      dispatch(allResumes(user.id));
      console.log("dashboard.js dispatch getAccountUser(user.id)", user.id);
    }
    
    if (resumes) {
      console.log("dashboard useefect all resume", resumes);
    }
  }, [user, dispatch, allResumes]);

  const editResume = (id) => {
    dispatch(getResumeById({
      accountUser_id: user.id,
      id: id
    }));
  };

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="h-[full] w-full bg-green-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 ">My Resumes</h2>
        <div className="grid grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="relative group h-[330px] border rounded-lg overflow-hidden"
            >
              <div className="h-[275px] bg-cover bg-red-100 border-b bg-center transition-all duration-300 group-hover:h-[230px]">
                Image
              </div>

              <div className="h-[55px] flex flex-col justify-center items-center bg-white p-2">
                <h3 className="text-xl font-semibold mb-">
                  {resume.resume_title}
                </h3>
                <div className="absolute bottom-0 pb-2 left-0 right-0 bg-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-blue-500 w-[30px] h-[36px] text-white rounded-full hover:bg-blue-700"
                    onClick={() => editResume(resume.id)}
                  >
                    E
                  </button>
                  <button 
                    className="bg-blue-500 ml-3 w-[30px] h-[36px] text-white rounded-full hover:bg-blue-700"
                    onClick={''}
                  >
                    D
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
                    <button className="bg-blue-500 text-white py-2 px-12 rounded-full hover:bg-blue-700">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
