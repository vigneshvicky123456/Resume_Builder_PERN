import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [skills, setSkills] = useState([
    {
      id: 1,
      value: "",
      isEditing: false,
    },
  ]);

  useEffect(() => {
    skills.forEach((skill) => {
      if (skill.isEditing && inputRefs.current[skill.id - 1]) {
        inputRefs.current[skill.id - 1].focus();
      }
    });
  }, [skills]);

  const handleAddSkills = () => {
    const newSkill = {
      id: skills.length + 1,
      value: "",
      isEditing: false,
    };
    setSkills([...skills, newSkill]);
  };

  const backButton = () => {
    navigate("../certifications");
  };

  const continueButton = () => {
    const savedSkills = skills.filter((skill) => skill.value.trim());

    console.log("Saved Skills:", savedSkills);
    navigate("../summary");
  };

  const handleUpdateSkill = (id, newValue) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, value: newValue } : skill
      )
    );
  };

  const handleToggleEdit = (id, isEditing) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id
          ? { ...skill, isEditing }
          : { ...skill, isEditing: false }
      )
    );
  };

  const handleBlur = (id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, isEditing: false } : skill
      )
    );
  };

  const handleDeleteSkill = (id) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="bg-blue-50 h-full rounded-3xl w-[97%] px-10 py-10 flex">
      <div className=" px-10">
        <div className="h-[full]">
          <div className="pb-6">
            <h1 className="font-bold text-4xl pb-3">Skills</h1>
            <p>
              You're on a roll. Let's find relevant skills for the job your
              applying for. Listing 6-10 skills is best.
            </p>
          </div>
          {skills.map((skill, index) => (
            <div key={skill.id} className="relative mb-6 w-[63%]">
              {!skill.isEditing && !skill.value.trim() ? (
                <div className="relative">
                  <p
                    className="flex justify-between items-center text-gray-400 bg-white p-3 border rounded-lg cursor-pointer"
                    onClick={() => handleToggleEdit(skill.id, true)}
                  >
                    <span>Skill {skill.id}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSkill(skill.id);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      title="Delete"
                    >
                      Delete
                    </span>
                  </p>
                </div>
              ) : (
                <div className="relative bg-white px-2 border-2 rounded-lg focus-within:border-black">
                  <label className="text-xs text-gray-400 block mb-1 flex items-center">
                    Skill {skill.id}
                    {skill.value.trim() && (
                      <span className="ml-2 text-black font-bold">
                        &#10003;
                      </span>
                    )}
                  </label>
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={skill.value}
                    onChange={(e) =>
                      handleUpdateSkill(skill.id, e.target.value)
                    }
                    onBlur={() => handleBlur(skill.id)}
                    className="pb-1 w-[83%] outline-none"
                    placeholder="Skill"
                  />
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="ml-2 w-[15%] text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <span>O</span>
          <button
            onClick={handleAddSkills}
            className="mt-3 pl-2 py-2 font-bold hover:underline cursor-pointer"
          >
            Add another skill
          </button>

          <div className="my-[40px] text-lg flex justify-center">
            <button
              className="bg-white w-[40%] p-3 border font-bold rounded-lg mr-4 transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
              onClick={backButton}
            >
              Back
            </button>
            <button
              className="bg-black w-[40%] text-white p-3 border font-bold rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
              onClick={continueButton}
            >
              Continue
            </button>
          </div>

          <p className="pl-2 font-bold hover:underline cursor-pointer flex justify-center">
            Skip adding skills
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
