import React, { useState } from "react";
import { FormData, Props } from "../interface";

const RegistrationForm: React.FC<Props> = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let newErrors: FormData = { fname: "", lname: "", email: "" };

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors = { ...newErrors, [key]: "This field is required" };
        isValid = false;
      }
    }

    if (!validateEmail(formData.email)) {
      newErrors = { ...newErrors, email: "Invalid email format" };
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // send event to parent
      onRegistrationSuccess(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h1 className="text-2xl my-4">Registration Form</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="fname" className="text-lg font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.fname && <span className="text-red-500">{errors.fname}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lname" className="text-lg font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.lname && <span className="text-red-500">{errors.lname}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 justify-self-end"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
