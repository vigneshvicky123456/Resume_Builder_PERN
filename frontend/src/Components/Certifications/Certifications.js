import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Certifications = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [certifications, setCertifications] = useState([
    { id: 1, value: "", isEditing: true },
  ]);

  useEffect(() => {
    certifications.forEach((cert) => {
      if (cert.isEditing && inputRefs.current[cert.id - 1]) {
        inputRefs.current[cert.id - 1].focus();
      }
    });
  }, [certifications]);

  const handleAddCertificate = () => {
    const newCertificate = {
      id: certifications.length + 1,
      value: "",
      isEditing: true,
    };
    setCertifications([...certifications, newCertificate]);
  };

  const backButton = () => {
    navigate("../education");
  };

  const continueButton = () => {
    const savedCertifications = certifications.filter((cert) =>
      cert.value.trim()
    );

    console.log("Saved Certifications:", savedCertifications);
    navigate("../skills");
  };

  const handleUpdateCertificate = (id, newValue) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, value: newValue } : cert
      )
    );
  };

  const handleToggleEdit = (id, isEditing) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, isEditing } : cert
      )
    );
  };

  const handleDeleteCertificate = (id) => {
    setCertifications((prevCertifications) =>
      prevCertifications.filter((cert) => cert.id !== id)
    );
  };

  return (
    <div className="bg-blue-50 h-[full] rounded-3xl w-[97%] px-10 py-10 flex">
      <div className="w-[63%] px-10">
        <div className="h-[full]">
          <div className="pb-6">
            <h1 className="font-bold text-4xl pb-3">
              Certifications and licenses
            </h1>
            <p>
              If the job requires you to have certain certifications or
              licenses, this is where you should list them.
            </p>
          </div>
          {certifications.map((cert, index) => (
            <div key={cert.id} className="relative mb-6">
              {!cert.isEditing && !cert.value.trim() ? (
                <p
                  className="text-gray-400 bg-white p-3 border rounded-lg cursor-pointer"
                  onClick={() => handleToggleEdit(cert.id, true)}
                >
                  License or certification {cert.id}
                </p>
              ) : (
                <div className="relative bg-white px-2 border-2 rounded-lg focus-within:border-black">
                  <label className="text-xs text-gray-400 block mb-1 flex items-center">
                    License or certification {cert.id}
                    {cert.value.trim() && (
                      <span className="ml-2 text-black font-bold">
                        &#10003;
                      </span>
                    )}
                  </label>
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={cert.value}
                    onChange={(e) =>
                      handleUpdateCertificate(cert.id, e.target.value)
                    }
                    onBlur={() =>
                      !cert.value.trim() && handleToggleEdit(cert.id, false)
                    }
                    className="pb-1 w-[83%] outline-none"
                    placeholder="License or certification"
                  />
                  <button
                    onClick={() => handleDeleteCertificate(cert.id)}
                    className="ml-2 w-[15%] text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={handleAddCertificate}
            className="mt-3 pl-2 py-2 font-bold hover:underline cursor-pointer"
          >
            Add another license or certification
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
            Skip adding certifications and licenses
          </p>
        </div>
      </div>
      <div className="w-[37%] relative p-5">
        <div className="border rounded-lg border-black bg-white px-3 h-[430px] shadow-2xl">
          <div className="p-3">
            <h1 className="bg-yellow-400 w-[75%] py-1 px-5 mx-auto rounded-lg text-white font-bold text-center">
              Certification Tips
            </h1>
            <ul className="list-disc list-inside py-2 marker:text-yellow-400">
              <li>
                The format of listing relevant information is: Name of
                certification or license, issuing organization, year acquired.
              </li>
              <br />
              <li>Example: HIPAA Certification, University of Chicago, 2012</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
