import React, { useEffect, useRef, useState } from "react";
//import { FaTrashAlt } from "react-icons/fa";

const EditExperienceField = ({ label, value, setValue, isEditing, toggleEdit, placeholder, frontLabel, width, padding, onDelete }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleInputChange = (e) => setValue(e.target.value);
  const handleBlur = () => {
    if (!value.trim()) toggleEdit(false);
  };

  return (
    <div className={`relative ${padding} mb-3`}>
      {!isEditing && !value.trim() ? (
        <p
          className={`text-gray-400 ${width} bg-white p-3 border rounded-lg cursor-pointer`}
          onClick={() => toggleEdit(true)}
        >
          {frontLabel}
        </p>
      ) : (
        <div
          className={`relative ${width} bg-white px-2 border-2 rounded-lg focus-within:border-black flex items-center`}
        >
          <label className="text-xs text-gray-400 block mb-1 flex items-center">
            {label}
            {value.trim() && <span className="ml-2 text-black font-bold">&#10003;</span>}
          </label>
          <input
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="pb-1 w-full outline-none"
            placeholder={placeholder}
          />
          <button
            onClick={onDelete}
            className="ml-2 text-red-500 hover:text-red-700"
            title="Delete"
          >
          dd  {/* <FaTrashAlt /> */}
          </button>
        </div>
      )}
    </div>
  );
};

const ExperienceFieldsManager = () => {
  const [fields, setFields] = useState([{ id: 1, value: "", isEditing: true }]);

  const handleAddField = () => {
    const newField = {
      id: fields.length + 1,
      value: "",
      isEditing: true,
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (id, newValue) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value: newValue } : field)));
  };

  const handleToggleEdit = (id, isEditing) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, isEditing } : field)));
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="p-4">
      {fields.map((field) => (
        <EditExperienceField
          key={field.id}
          label={`Experience ${field.id}`}
          value={field.value}
          setValue={(value) => handleUpdateField(field.id, value)}
          isEditing={field.isEditing}
          toggleEdit={(isEditing) => handleToggleEdit(field.id, isEditing)}
          placeholder="Enter your experience"
          frontLabel="Click to add experience"
          width="w-full"
          padding="p-2"
          onDelete={() => handleDeleteField(field.id)}
        />
      ))}
      <button
        onClick={handleAddField}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceFieldsManager;
