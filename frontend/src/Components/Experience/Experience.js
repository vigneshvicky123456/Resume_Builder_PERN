import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import EditExperienceField from "./EditExperienceField";

const Experience = () => {
   const navigate = useNavigate(); 

  const experienceDetailsState = {
    jobTitle: "",
    companyName: "",
    address: "",
    startDate: "",
    endDate: "",
    noEndDate: false,
    description: "",
  };

  const [experienceDetails, setExperienceDetails] = useState(
    experienceDetailsState
  );

  const editingExperienceState = {
    jobTitle: false,
    companyName: false,
    address: false,
    startDate: false,
    endDate: false,
    description: false,
  };

  const [isEditingExperience, setIsEditingExperience] = useState(
    editingExperienceState
  );

  const toggleEdit = (field) => {
    setIsEditingExperience((prevState) => ({
      ...prevState,
      [field]: !prevState[field], 
    }));
  };

  const handleExperienceChange = (field, value) => {
    setExperienceDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [field]: value,
      };

      if (field === "noEndDate") {
        updatedDetails.endDate = value ? "Present" : "";
      }

      return updatedDetails;
    });
  };

  const saveExperience = (e) => {
    e.preventDefault();

    console.log("Experience Details", experienceDetails);
    setExperienceDetails(experienceDetailsState);
    setIsEditingExperience(editingExperienceState);
    navigate("../education");
  };

  const cancel = () => {
    setExperienceDetails(experienceDetailsState);
  };

  return (
    <div className="bg-blue-50 h-[full] w-[97%] px-10 py-10 flex rounded-2xl">
      <div className="h-[full] w-[63%] px-10">
        <div className="h-[full]">
          <div className="pb-6">
            <h1 className="font-bold text-4xl pb-3">Experience</h1>
            <p>Let’s add another job.</p>
          </div>

          <div className="flex mt-5">
            <EditExperienceField
              label="Job Title"
              value={experienceDetails.jobTitle}
              setValue={(value) => handleExperienceChange("jobTitle", value)}
              isEditing={isEditingExperience.jobTitle}
              toggleEdit={() => toggleEdit("jobTitle")}
              placeholder="e.g. Manger"
              frontLabel="Job Title"
              width="w-[225px]"
              padding="pr-5"
            />
            <EditExperienceField
              label="Company Name"
              value={experienceDetails.companyName}
              setValue={(value) => handleExperienceChange("companyName", value)}
              isEditing={isEditingExperience.companyName}
              toggleEdit={() => toggleEdit("companyName")}
              placeholder="e.g. Infosys"
              frontLabel="Company Name"
              width="w-[225px]"
              padding="pr-5"
            />
          </div>

          <div className="mt-6">
            <EditExperienceField
              label="Address"
              value={experienceDetails.address}
              setValue={(value) => handleExperienceChange("address", value)}
              isEditing={isEditingExperience.address}
              toggleEdit={() => toggleEdit("address")}
              placeholder="e.g. City or Town, State, Pincode"
              frontLabel="Address"
              width="w-full"
              padding="pr-0"
            />
          </div>

          <div className="flex mt-6">
            <EditExperienceField
              label="Start Date"
              value={experienceDetails.startDate}
              setValue={(value) => handleExperienceChange("startDate", value)}
              isEditing={isEditingExperience.startDate}
              toggleEdit={() => toggleEdit("startDate")}
              placeholder="e.g. Jan-2024"
              frontLabel="Start Date"
              width="w-[225px]"
              padding="pr-5"
            />

            <EditExperienceField
              label="End Date"
              value={experienceDetails.endDate}
              setValue={(value) => handleExperienceChange("endDate", value)}
              isEditing={isEditingExperience.endDate}
              toggleEdit={() => toggleEdit("endDate")}
              placeholder="e.g. Dec-2024"
              frontLabel="End Date"
              width="w-[225px]"
              padding="pr-5"
            />
          </div>

          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="noEndDate"
                checked={experienceDetails.noEndDate}
                onChange={(e) =>
                  handleExperienceChange("noEndDate", e.target.checked)
                }
                className="h-4 w-4"
              />
              <span>I currently work here</span>
            </label>
          </div>

          <div className="mt-6">
            <EditExperienceField
              label="Description"
              value={experienceDetails.description || ""} // Default empty value if description is undefined
              setValue={(value) => handleExperienceChange("description", value)}
              isEditing={isEditingExperience.description || false}
              toggleEdit={() => toggleEdit("description")}
              placeholder="e.g. Describe your responsibilities or achievements"
              frontLabel="Description"
              width="w-full"
              padding="pr-0"
            />
          </div>

          <div className="my-[50px] text-lg">
            <button
              className="bg-white w-[225px] p-3 border font-bold rounded-lg mr-4 transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="bg-black w-[225px] text-white p-3 border font-bold rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
              onClick={saveExperience}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-[37%] relative p-5">
        <div className="border rounded-lg border-black bg-white px-3 h-[530px] shadow-2xl">
          <div className="p-3">
            <h1 className="bg-orange-400 w-[70%] py-1 px-5 mx-auto rounded-lg text-white font-bold text-center">
              Experience Tips
            </h1>
            <ul className="list-disc list-inside py-2 marker:text-orange-400">
              <li>
                Highlight experience relevant to the position you want or are
                applying for.
              </li>
              <br />
              <li>
                Use keywords from the job listing. This will help you get past
                screening software used by hiring departments.
              </li>
              <br />
              <li>
                Our pre-written bullet points give you an idea of what
                responsibilities to list.
              </li>
            </ul>
          </div>
          <div className="mt-4">{/* Add image here */}</div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
