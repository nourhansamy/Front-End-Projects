import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState([]);
  let submitFormData = async (e) => {
    setErrorMsg('');
    e.preventDefault();
    // alert("submit button");
    // console.log("submitFormData", userData);
    // Validate Data
    let validationResponse = validateFormData();
    console.log(validationResponse);
    if (validationResponse.error) {
      setErrors(validationResponse.error.details);
    } else {
      // Call signup API
      setErrors([]);
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup",
        userData
      );
      console.log("Response:", data);
      if (data.message === "success") {
        // Success
        goToLogin();
      } else {
        setErrorMsg(data.message);
      }
    }
  };
  let getUserData = (e) => {
    let userObj = { ...userData }; // 1. Deep Copy
    userObj[e.target.name] = e.target.value; // 2. Do the change on the copy
    setUserData(userObj); // 3. update the state
    // console.log(userData)
  };
  let validateFormData = () => {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(2).max(10),
      last_name: Joi.string().alphanum().required().min(2).max(10),
      age: Joi.number().required().min(20).max(80),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(userData, { abortEarly: false });
  };
  let goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="w-75 m-auto py-5">
        <h2 className="mb-5">Registeration Form</h2>
        {errorMsg ? (
          <div className="alert alert-danger p-2">{errorMsg}</div>
        ) : (
          ""
        )}
        {errors.map((error, index) => (
          <div key={index} className="alert alert-danger p-2">
            {error.message}
          </div>
        ))}
        <form onSubmit={submitFormData}>
          <div className="input-data my-3">
            <label htmlFor="first_name" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Please Enter Your First Name.."
              name="first_name"
              onChange={getUserData}
            />
          </div>
          <div className="input-data my-3">
            <label htmlFor="last_name" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Please Enter Your Last Name.."
              name="last_name"
              onChange={getUserData}
            />
          </div>
          <div className="input-data my-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Please Enter Your Age.."
              name="age"
              onChange={getUserData}
            />
          </div>
          <div className="input-data my-3">
            <label htmlFor="email" className="form-label">
              E-mail:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Please Enter Your E-Mail.."
              name="email"
              onChange={getUserData}
            />
          </div>
          <div className="input-data my-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Please Enter Your Password.."
              name="password"
              onChange={getUserData}
            />
          </div>
          <button className="btn btn-info my-3 float-end">Register</button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}
