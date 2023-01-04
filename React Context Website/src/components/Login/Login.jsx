import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState([]);
  let submitFormData = async (e) => {
    setErrorMsg("");
    e.preventDefault();
    // alert("submit button");
    // console.log("submitFormData", userData);
    // Validate Data
    let validationResponse = validateFormData();
    console.log(validationResponse);
    if (validationResponse.error) {
      setErrors(validationResponse.error.details);
    } else {
      // Call signin API
      setErrors([]);
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signin",
        userData
      );
      console.log("Response:", data);
      if (data.message === "success") {
        // Success
        localStorage.setItem("token", data.token); // Store token
        saveUserData();
        goToHome();
      } else {
        setErrorMsg(data.message);
      }
    }
  };
  let getUserData = (e) => {
    let userObj = { ...userData }; // 1. Deep Copy
    userObj[e.target.name] = e.target.value; // 2. Do the change on the copy
    setUserData(userObj); // 3. update the state
  };
  let validateFormData = () => {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(userData, { abortEarly: false });
  };
  let goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="w-75 m-auto py-5">
        <h2 className="mb-5">Login Form</h2>
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
          <button className="btn btn-info my-3 float-end">Login</button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}
