import React, { useEffect, useRef } from "react";


const EditExperienceField = ({ label, value, setValue, isEditing, toggleEdit, placeholder, frontLabel, width, padding }) => {
     const inputRef = useRef(null);
    
      useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
      }, [isEditing]);
    
      const handleInputChange = (e) => setValue(e.target.value);
      const handleBlur = () => {
        if (!value.trim()) toggleEdit(false);
      };

  return (
    <div className={`relative ${padding}`}>
    {!isEditing && !value.trim() ? (
      <p
        className={`text-gray-400 ${width} bg-white p-3 border rounded-lg cursor-pointer`}
        onClick={() => toggleEdit(true)}
      >
        {frontLabel}
      </p>
    ) : (
      <div
        className={`relative ${width} bg-white px-2 border-2 rounded-lg focus-within:border-black`}
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
      </div>
    )}
  </div>
  )
}

export default EditExperienceField;
