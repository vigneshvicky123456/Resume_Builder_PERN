import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { createResume } from "../Features/resumeSlice";

const Resume = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const dispatch = useDispatch();

  const selectedTemplateId = useSelector((state) => state.resume?.selectedTemplateId);

  const [resumeTitle, setResumeTitle] = useState("");

  const handleInputChange = (event) => {
    setResumeTitle(event.target.value);
  };

  const saveResumeTitle = () => {
    if (resumeTitle.trim() === "") {
      alert("Please enter a valid resume name.");
      return;
    }
    const newResume = {
      accountUser_id: user?.id,
      resume_title: resumeTitle,
      resume_template_id: selectedTemplateId,
    };
    //dispatch(createResume(newResume));
    console.log("saveResumeTitle :", newResume);
    navigate("/contact");
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <h1 className="text-5xl font-bold">Create New Resume</h1>
      </div>
      <div className="flex justify-center mt-10">
        <p className="text-gray-400 text-lg mb-10">Type a Resume Name</p>
      </div>
      <div className="flex justify-center">
        <input
          className="w-[35%] h-10 p-5 outline-none border rounded-lg"
          placeholder="Resume name"
          value={resumeTitle}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="px-8 py-2 border rounded-lg bg-blue-300 mt-10"
          onClick={saveResumeTitle}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Resume;
