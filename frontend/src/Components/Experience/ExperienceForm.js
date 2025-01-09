import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditExperienceField from "./EditExperienceField";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { addExperience } from "../../Features/experienceSlice";
import { getLastResume } from "../../Features/resumeSlice";

const ExperienceForm = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
    const { user } = useUser();
    const resume = useSelector((state) => state.resume?.resume);

  const experienceDetailsState = {
    jobTitle: "",
    companyName: "",
    address: "",
    startDate: "",
    endDate: "",
    noEndDate: false,
    description: "",
  };
  const [experienceDetails, setExperienceDetails] = useState(experienceDetailsState);

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

   useEffect(() => {
      if (user) {
        dispatch(getLastResume(user.id));
        console.log("getLastResume user.id", user.id);
      }
      if (resume) {
        console.log("getLastResume...", resume.id);
      }
    }, [user]);

  const cancelButton = () => {
    setExperienceDetails(experienceDetailsState);
    navigate("/contact/experience");
  };

  const saveExperience = (e) => {
    e.preventDefault();

    const experienceData = {
      resume_id: resume.id,
      job_title: experienceDetails.jobTitle,
      company_name: experienceDetails.companyName,
      address: experienceDetails.address,
      start_date: experienceDetails.startDate,
      end_date: experienceDetails.endDate,
      description: experienceDetails.description,
    };
    dispatch(addExperience(experienceData));
    console.log("Experience Details", experienceData);
    navigate("/contact/education");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[270px]"></aside>
      <main className="flex-1 h-full overflow-auto">
        <div className="bg-blue-50 h-[full] w-[97%] px-10 py-10 flex relative rounded-t-3xl">
          <div className="w-[63%]">
            <div className=" px-10 h-full">
              <div className="pb-6">
                <h1 className="font-bold text-4xl pb-3">Experience</h1>
                <p>Let’s add another job.</p>
              </div>

              <div className="flex mt-5">
                <EditExperienceField
                  label="Job Title"
                  value={experienceDetails.jobTitle}
                  setValue={(value) =>
                    handleExperienceChange("jobTitle", value)
                  }
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
                  setValue={(value) =>
                    handleExperienceChange("companyName", value)
                  }
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
                  setValue={(value) =>
                    handleExperienceChange("startDate", value)
                  }
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
                  setValue={(value) =>
                    handleExperienceChange("description", value)
                  }
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
                  onClick={cancelButton}
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
                    Highlight experience relevant to the position you want or
                    are applying for.
                  </li>
                  <br />
                  <li>
                    Use keywords from the job listing. This will help you get
                    past screening software used by hiring departments.
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
      </main>
    </div>
  );
};

export default ExperienceForm;
