import React, { useState } from "react";
import IMAGES from "../../images/index";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  function getFormData(e) {
    // console.log(e.target.value);
    // console.log(e.target.name);
    let formDataCopy = { ...formData };
    formDataCopy[e.target.name] = e.target.value;
    setFormData(formDataCopy);
  }
  function submitForm(e) {
    e.preventDefault();
    // console.log("submitForm", formData);
    // Check Validation of all fields and Then Call SignUp API
    const validationResponse = validateForm();
    // console.log("validationResponse:", validationResponse);
    if (validationResponse.error) {
      // Error
      setValidationErrors(validationResponse.error.details);
      setApiError('');
    } else {
      // Call API
      setValidationErrors([]);
      // console.log("call API");
      signUp();
    }
  }
  async function signUp() {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signup",
      formData
    );
    // console.log(data);
    if (data.message === "success") {
      // Success
      goToLogin();
    } else {
      // Error
      setValidationErrors([]);
      setApiError(data.message);
    }
  }
  function goToLogin() {
    navigate("/login");
  }
  function validateForm() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(5).max(10),
      last_name: Joi.string().alphanum().required().min(5).max(10),
      age: Joi.number().required().min(20).max(80),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net", "gmail", "yahoo"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{5}$/)),
    });
    return schema.validate(formData, { abortEarly: false });
  }
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className={`col-md-6 ${styles.noPadding}`}>
            <div className="gameImage h-100">
              <img className="img-fluid h-100" src={IMAGES.gameImage} alt="" />
            </div>
          </div>
          <div className={`col-md-6 ${styles.formBg}`}>
            <div className="registerForm">
              <h3 className={`text-center my-4 ${styles.grayColor}`}>
                Create My Account!
              </h3>
              {validationErrors.map((error) => (
                <div className="alert alert-danger p-2">{error.message}</div>
              ))}
              <form onSubmit={submitForm}>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="first_name"
                      id=""
                      placeholder="First Name"
                      className={`${styles.inputStyle} form-control mb-4`}
                      onChange={getFormData}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="last_name"
                      id=""
                      placeholder="Last Name"
                      className={`${styles.inputStyle} form-control`}
                      onChange={getFormData}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="email"
                      name="email"
                      id=""
                      placeholder="Email Address"
                      className={`${styles.inputStyle} form-control mb-4`}
                      onChange={getFormData}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="number"
                      name="age"
                      id=""
                      placeholder="Age"
                      className={`${styles.inputStyle} form-control mb-4`}
                      onChange={getFormData}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeholder="Password"
                      className={`${styles.inputStyle} form-control mb-4`}
                      onChange={getFormData}
                    />
                  </div>
                  <div className="col-md-12">
                    <button className={`btn w-100 ${styles.buttonBgColor}`}>
                      Create Account
                    </button>
                    {apiError ? (
                      <div className="alert alert-danger p-2 mt-3">
                        {apiError}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="text-center mt-3">
                      <span className="text-muted small">
                        This site is protected by reCAPTCHA and the Google{" "}
                      </span>
                      <a
                        className="text-muted small"
                        href="https://policies.google.com/privacy"
                      >
                        Privacy Policy
                      </a>
                      <span className="text-muted small"> and </span>
                      <a
                        className="text-muted small"
                        href="https://policies.google.com/terms"
                      >
                        Terms of Service
                      </a>
                      <div>
                        <span className="text-muted small"> apply. </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <hr className="w-100 m-auto my-3" />
              <div className="text-center my-3">
                <span className={`${styles.grayColor} small`}>
                  Already a member?
                </span>
                <Link
                  className={`${styles.blueColor} text-decoration-none ms-1 small`}
                  to="/login"
                >
                  Log In <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
