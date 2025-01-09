import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");

  const backButton = () => {
    navigate("../skills");
  };

  const continueButton = () => {
    console.log("Save Summary:", summary);
    setSummary("");
    navigate("../references");
  };

  return (
    <div className="bg-blue-50 h-[full] rounded-3xl w-[97%] px-10 py-10 flex">
      <div className=" px-10">
        <div className="h-[full]">
          <div className="pb-6">
            <h1 className="font-bold text-4xl pb-3">Professional Summary</h1>
            <p>
              This section will usually be one of the first things a hiring
              manager reads. It tells them, “Here's who I am, and here's what I
              can do for your company”.
            </p>
          </div>

          <div className="flex flex-col mt-5">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write your text here..."
              className="border border-gray-300 p-4 rounded-lg w-[50%] h-[400px] resize-none mb-4"
            ></textarea>
          </div>

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
            Skip adding summary
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
