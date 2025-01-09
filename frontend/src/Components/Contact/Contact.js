import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditableField from "./EditableField";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { createContact } from "../../Features/contactSlice";
import { getLastResume, getResumeById } from "../../Features/resumeSlice";

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();
  const resume = useSelector((state) => state.resume?.resume);
  const { getResume } = useSelector((state) => state.resume);

  const contactDetailsState = {
    photo: null,
    firstName: "",
    lastName: "",
    jobTitle: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    address: "",
    website: "",
    linkedin: "",
  };
  const [contactDetails, setContactDetails] = useState(contactDetailsState);

  const editingContactState = {
    firstName: false,
    lastName: false,
    jobTitle: false,
    phoneNumber: false,
    email: false,
    dateOfBirth: false,
    address: false,
    website: false,
    linkedin: false,
  };
  const [isEditingContact, setIsEditingContact] = useState(editingContactState);

  const [validationErrors, setValidationErrors] = useState({});

  const toggleEdit = (field) => {
    setIsEditingContact((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleContactChange = (field, value) => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));

    if (validationErrors[field]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContactDetails((prevDetails) => ({
          ...prevDetails,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearPhoto = () => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      photo: null,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!contactDetails.email.trim()) {
      errors.email = "Email is required.";
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(contactDetails.email)) {
        errors.email = "Please enter a valid email address.";
      }
    }
    return errors;
  };

  useEffect(() => {
    if (user) {
      dispatch(getLastResume(user.id));
      //console.log("getLastResume user.id", user.id);
    }
    if (resume) {
      console.log("getLastResume...resumeid", resume.id);
      dispatch(
        getResumeById({
          accountUser_id: user.id,
          id: resume.id,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (getResume?.contactModel?.[0]) {
      setContactDetails({
        photo: null,
        firstName: getResume?.contactModel?.[0].first_name,
        lastName: getResume?.contactModel?.[0].last_name,
        jobTitle: getResume?.contactModel?.[0].job_title,
        phoneNumber: getResume?.contactModel?.[0].phone,
        email: getResume?.contactModel?.[0].email,
        dateOfBirth: getResume?.contactModel?.[0].date_of_birth,
        address: getResume?.contactModel?.[0].address,
        website: getResume?.contactModel?.[0].website,
        linkedin: getResume?.contactModel?.[0].linkedin,
      });
      console.log("useeffect getResumeById...", getResume?.contactModel?.[0]);
    }
  }, [getResume?.contactModel?.[0]]);

  const saveContact = (e) => {
    e.preventDefault();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsEditingContact((prev) => ({
        ...prev,
        email: true,
      }));
      return;
    }
    
    const contactData = {
      resume_id: resume.id,
      imageUrl: contactDetails.photo,
      first_name: contactDetails.firstName,
      last_name: contactDetails.lastName,
      job_title: contactDetails.jobTitle,
      phone: contactDetails.phoneNumber,
      email: contactDetails.email,
      address: contactDetails.address,
      date_of_birth: contactDetails.dateOfBirth,
      website: contactDetails.website,
      linkedin: contactDetails.linkedin,
    };
    dispatch(createContact(contactData));
    console.log("saveContact contactData:", contactData);
    navigate("experience");
  };

  const cancel = () => {
    setContactDetails(contactDetailsState);
    setValidationErrors({});
  };

  return (
    <div className="bg-blue-50 h-[full] w-[97%] px-10 py-10 flex rounded-2xl">
      <div className="h-[full] w-[63%] px-10">
        <div className="h-[full]">
          <div className="pb-6">
            <h1 className="font-bold text-4xl pb-3">Contact</h1>
            <p>
              Let's start with the basics. To ensure employers can reach you,
              input at least your name, email, and phone number.
            </p>
          </div>

          <div className="flex pb-5">
            {contactDetails.photo ? (
              <img
                className="w-[110px] h-[110px] rounded-lg"
                src={contactDetails.photo}
                alt="Uploaded"
              ></img>
            ) : (
              <div className="w-[110px] h-[110px] bg-white rounded-lg border-[2px] border-gray-200">
                <span className="flex justify-center pt-[40px]">O</span>
              </div>
            )}

            <div className="pl-5 pt-5 relative">
              <p className="pb-3">Add a Photo to Your Resume (Optional)</p>
              {contactDetails.photo ? (
                <button
                  className="border p-1 px-3 rounded-xl transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
                  onClick={handleClearPhoto}
                >
                  Delete
                </button>
              ) : (
                <div className=" pt-3">
                  <input
                    id="fileInput"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="p-2 px-4 rounded-xl border transition-transform duration-300 ease-in-out hover:border-black hover:-translate-y-1"
                  >
                    Add Photo
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <EditableField
              label="First Name"
              value={contactDetails.firstName}
              setValue={(value) => handleContactChange("firstName", value)}
              isEditing={isEditingContact.firstName}
              toggleEdit={() => toggleEdit("firstName")}
              placeholder="e.g. Sri"
              frontLabel="First Name"
              width="w-[225px]"
              padding="pr-5"
            />
            <EditableField
              label="Last Name"
              value={contactDetails.lastName}
              setValue={(value) => handleContactChange("lastName", value)}
              isEditing={isEditingContact.lastName}
              toggleEdit={() => toggleEdit("lastName")}
              placeholder="e.g. Yadav"
              frontLabel="Last Name"
              width="w-[225px]"
              padding="pr-5"
            />
          </div>

          <div className="mt-5">
            <EditableField
              label="Job Title (optional)"
              value={contactDetails.jobTitle}
              setValue={(value) => handleContactChange("jobTitle", value)}
              isEditing={isEditingContact.jobTitle}
              toggleEdit={() => toggleEdit("jobTitle")}
              placeholder="e.g. Manager"
              frontLabel="Job Title"
              width="w-full"
              padding="pr-0"
            />
          </div>

          <div className="mt-5">
            <EditableField
              label="Email"
              value={contactDetails.email}
              setValue={(value) => handleContactChange("email", value)}
              isEditing={isEditingContact.email}
              toggleEdit={() => toggleEdit("email")}
              placeholder="e.g. sriYadav@example.com"
              frontLabel="Email"
              width="w-full"
              padding="pr-0"
              error={validationErrors.email}
            />
          </div>

          <div className="flex mt-5">
            <EditableField
              label="Phone Number"
              value={contactDetails.phoneNumber}
              setValue={(value) => handleContactChange("phoneNumber", value)}
              isEditing={isEditingContact.phoneNumber}
              toggleEdit={() => toggleEdit("phoneNumber")}
              placeholder="e.g. 9937843622"
              frontLabel="Phone Number"
              width="w-[225px]"
              padding="pr-5"
            />
            <EditableField
              label="Date of Birth"
              value={contactDetails.dateOfBirth}
              setValue={(value) => handleContactChange("dateOfBirth", value)}
              isEditing={isEditingContact.dateOfBirth}
              toggleEdit={() => toggleEdit("dateOfBirth")}
              placeholder="e.g. 04/06/1990"
              frontLabel="Date of Birth"
              width="w-[225px]"
              padding="pr-5"
            />
          </div>

          <div className="mt-5">
            <EditableField
              label="Address"
              value={contactDetails.address}
              setValue={(value) => handleContactChange("address", value)}
              isEditing={isEditingContact.address}
              toggleEdit={() => toggleEdit("address")}
              placeholder="e.g. City or Town, State, Pincode"
              frontLabel="Address"
              width="w-full"
              padding="pr-0"
            />
          </div>

          <div className="flex mt-5">
            <EditableField
              label="Linkedin"
              value={contactDetails.linkedin}
              setValue={(value) => handleContactChange("linkedin", value)}
              isEditing={isEditingContact.linkedin}
              toggleEdit={() => toggleEdit("linkedin")}
              placeholder="e.g. https://www.linkedin.com/in/sriYadav"
              frontLabel="Linkedin"
              width="w-[225px]"
              padding="pr-5"
            />
            <EditableField
              label="Website"
              value={contactDetails.website}
              setValue={(value) => handleContactChange("website", value)}
              isEditing={isEditingContact.website}
              toggleEdit={() => toggleEdit("website")}
              placeholder="e.g. https://www.example.com"
              frontLabel="Website"
              width="w-[225px]"
              padding="pr-5"
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
              onClick={saveContact}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-[37%] relative p-5">
        <div className="border rounded-lg border-black bg-white px-3 h-[430px] shadow-2xl">
          <div className="p-3">
            <h1 className="bg-blue-400 w-[58%] py-1 px-5 mx-auto rounded-lg text-white font-bold text-center">
              Contact Tips
            </h1>
            <ul className="list-disc list-inside py-2 marker:text-blue-400">
              <li>
                It's best to use a professional email. One that includes your
                full name is best.
              </li>
              <br />
              <li>
                Gmail is the preferred email client. Addresses from Yahoo or
                Hotmail tend to look outdated.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
