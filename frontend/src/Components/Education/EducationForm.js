import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const EducationForm = () => {
  const navigate = useNavigate();

  const [educationDetails, setEducationDetails] = useState({
    institutionName: "",
    degree: "",
    cgpa: "",
    fieldofStudy: "",
    startDate: "",
    endDate: "",
    additionalDetails: "",
  });

  const backButton = () => {
    navigate("/resume/education");
  };

  const saveEducation = (values, { resetForm }) => {
    console.log("Form data", values);
    setEducationDetails({
      institutionName: "",
      degree: "",
      cgpa: "",
      fieldofStudy: "",
      startDate: "",
      endDate: "",
      additionalDetails: "",
    });
    resetForm();
    navigate("/resume/education");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[270px]"></aside>
      <main className="flex-1 h-full overflow-auto">
        <div className="bg-blue-50 h-[full] w-[97%] px-10 py-10 flex relative rounded-t-3xl">
          <div className="w-[63%] px-10">
            <div className="h-full">
              <h1 className="font-bold text-4xl pb-3">Education</h1>
              <p>
                Great job! You're onto the next section. Where did you attend
                college or university?
              </p>

              <Formik
                initialValues={educationDetails}
                enableReinitialize 
                onSubmit={saveEducation}
              >
                {({ values }) => (
                  <Form className="space-y-6 pt-4">
                    <div>
                      <label
                        htmlFor="institutionName"
                        className="block text-sm font-medium text-gray-700 flex items-center"
                      >
                        Institution Name
                        {values.institutionName && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        id="institutionName"
                        name="institutionName"
                        type="text"
                        placeholder="e.g Institution Name"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="degree"
                          className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                          Degree
                          {values.degree && (
                            <span className="ml-2 text-black font-bold">
                              &#10003;
                            </span>
                          )}
                        </label>
                        <Field
                          id="degree"
                          name="degree"
                          type="text"
                          placeholder="e.g 12th, B.E or Diploma"
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cgpa"
                          className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                          CGPA
                          {values.cgpa && (
                            <span className="ml-2 text-black font-bold">
                              &#10003;
                            </span>
                          )}
                        </label>
                        <Field
                          id="cgpa"
                          name="cgpa"
                          type="text"
                          placeholder="e.g 8.5 cgpa or 85%"
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="fieldofStudy"
                        className="block text-sm font-medium text-gray-700 flex items-center"
                      >
                        Field of Study
                        {values.fieldofStudy && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        id="fieldofStudy"
                        name="fieldofStudy"
                        type="text"
                        placeholder="e.g. class or department name"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="startDate"
                          className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                          Start Date
                          {values.startDate && (
                            <span className="ml-2 text-black font-bold">
                              &#10003;
                            </span>
                          )}
                        </label>
                        <Field
                          id="startDate"
                          name="startDate"
                          type="text"
                          placeholder="e.g Jan-2024"
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="endDate"
                          className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                          End Date
                          {values.endDate && (
                            <span className="ml-2 text-black font-bold">
                              &#10003;
                            </span>
                          )}
                        </label>
                        <Field
                          id="endDate"
                          name="endDate"
                          type="text"
                          placeholder="e.g Dec-2024"
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="additionalDetails"
                        className="block text-sm font-medium text-gray-700 flex items-center"
                      >
                        Additional Details
                        {values.additionalDetails && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        id="additionalDetails"
                        name="additionalDetails"
                        type="text"
                        placeholder="e.g awards, certificate"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="my-[50px] text-lg">
                      <button
                        className="bg-white w-[225px] p-3 border font-bold rounded-lg mr-4 transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
                        onClick={backButton}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-black w-[225px] text-white p-3 border font-bold rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="bg-red-200 w-[37%] relative px-5">
            <div className="bg-yellow-200 h-full">
              <h1>Side Page</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducationForm;
