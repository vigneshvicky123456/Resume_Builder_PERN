import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ReferenceFormFormik = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    positionTitle: Yup.string().required("Position Title is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    companyName: Yup.string().required("Company Name is required"),
    relationship: Yup.string().required("Relationship to You is required"),
  });

  const [referenceDetails, setReferenceDetails] = useState({
    firstName: "",
    lastName: "",
    positionTitle: "",
    email: "",
    phone: "",
    companyName: "",
    relationship: "",
  });

  const cancelButton = () => {
    navigate("/contact/references");
  };

  const saveReference = (values, { resetForm }) => {
    console.log("saveReference", values);

    resetForm();
    // navigate("/contact/education");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[270px]"></aside>
      <main className="flex-1 h-full overflow-auto">
        <div className="bg-blue-50 h-[full] w-[97%] px-10 py-10 flex relative rounded-t-3xl">
          <div className="w-[63%] px-10 h-full">
            <div className="pb-6">
              <h1 className="font-bold text-4xl pb-3">Add Reference</h1>
            </div>

            <Formik
              initialValues={referenceDetails}
              validationSchema={validationSchema}
              onSubmit={saveReference}
            >
              {({ errors, touched, values }) => (
                <Form className="space-y-2">
             
                  <div className="flex gap-6">
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        First Name
                        {values.firstName.trim() && !errors.firstName && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        name="firstName"
                        placeholder="e.g. John"
                        className={`w-full p-4 border rounded-lg ${
                          touched.firstName && errors.firstName
                            ? "border-red-500 border-2"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        Last Name
                        {values.lastName.trim() && !errors.lastName && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        name="lastName"
                        placeholder="e.g. Doe"
                        className={`w-full p-4 border rounded-lg ${
                          touched.lastName && errors.lastName
                            ? "border-red-500 border-2"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-1 flex items-center">
                      Position Title
                      {values.positionTitle.trim() && !errors.positionTitle && (
                        <span className="ml-2 text-black font-bold">
                          &#10003;
                        </span>
                      )}
                    </label>
                    <Field
                      name="positionTitle"
                      placeholder="e.g. Manager"
                      className={`w-full p-4 border rounded-lg ${
                        touched.positionTitle && errors.positionTitle
                          ? "border-red-500 border-2"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="positionTitle"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-1 flex items-center">
                      Email
                      {values.email.trim() && !errors.email && (
                        <span className="ml-2 text-black font-bold">
                          &#10003;
                        </span>
                      )}
                    </label>
                    <Field
                      name="email"
                      placeholder="e.g. john.doe@example.com"
                      className={`w-full p-4 border rounded-lg ${
                        touched.email && errors.email
                          ? "border-red-500 border-2"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        Phone
                        {values.phone.trim() && !errors.phone && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        name="phone"
                        placeholder="e.g. 1234567890"
                        className={`w-full p-4 border rounded-lg ${
                          touched.phone && errors.phone
                            ? "border-red-500 border-2"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        Company Name
                        {values.companyName.trim() && !errors.companyName && (
                          <span className="ml-2 text-black font-bold">
                            &#10003;
                          </span>
                        )}
                      </label>
                      <Field
                        name="companyName"
                        placeholder="e.g. ABC Corp"
                        className={`w-full p-4 border rounded-lg ${
                          touched.companyName && errors.companyName
                            ? "border-red-500 border-2"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-1 flex items-center">
                      Relationship to You
                      {values.relationship.trim() && !errors.relationship && (
                        <span className="ml-2 text-black font-bold">
                          &#10003;
                        </span>
                      )}
                    </label>
                    <Field
                      name="relationship"
                      placeholder="e.g. Mentor"
                      className={`w-full p-4 border rounded-lg ${
                        touched.relationship && errors.relationship
                          ? "border-red-500 border-2"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="relationship"
                      component="div"
                      className="text-red-500 text-sm mt-1"
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
      </main>
    </div>
  );
};

export default ReferenceFormFormik;
