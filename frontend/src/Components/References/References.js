import React from "react";
import { useNavigate } from "react-router-dom";

const References = () => {
  const navigate = useNavigate();

  const addReference = () => {
    navigate("/referenceForm");
  };

  const backButton = () => {
    navigate("../summary");
  };

  const continueButton = () => {
    //navigate("../certifications");
  };

  return (
    <div className="bg-blue-50 h-full w-[97%] px-10 py-10 flex rounded-2xl">
      <div className="h-full w-full px-10">
        <div>
          <h1 className="font-bold text-4xl pb-3">Add Reference</h1>
        </div>

        <div
          className="mt-10 border rounded-lg border-black font-bold  py-[65px] flex justify-center"
          onClick={addReference}
        >
          <span>O</span>
          <p className="pl-2 hover:underline cursor-pointer">Add reference</p>
        </div>

        <div className="my-[40px] text-lg flex justify-center">
          <button
            className="bg-white w-[30%] p-3 border font-bold rounded-lg mr-4 transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
            onClick={backButton}
          >
            Back
          </button>
          <button
            className="bg-black w-[30%] text-white p-3 border font-bold rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
            onClick={continueButton}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default References;
