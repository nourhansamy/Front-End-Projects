import React, { useState } from "react";
import IMAGES from "../../images/index";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";
import styles from "./Login.module.scss";

export default function Login({ saveUserData }) {
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
      setApiError("");
    } else {
      // Call API
      setValidationErrors([]);
      // console.log("call API");
      signIn();
    }
  }
  async function signIn() {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signIn",
      formData
    );
    // console.log(data);
    if (data.message === "success") {
      // Success
      localStorage.setItem("token", data.token); // Store user token
      saveUserData();
      goToHome();
    } else {
      // Error
      setValidationErrors([]);
      setApiError(data.message);
    }
  }
  function goToHome() {
    navigate("/home");
  }
  function validateForm() {
    const schema = Joi.object({
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
            <div className="registerForm text-center mt-5 px-5 py-5">
              <img
                className={`${styles.logoSize}`}
                src={IMAGES.logoImage}
                alt=""
              />
              <h3 className={`text-center ${styles.grayColor} mb-4`}>
                Log in to GameOver
              </h3>
              {validationErrors.map((error) => (
                <div className="alert alert-danger p-2">{error.message}</div>
              ))}
              <form onSubmit={submitForm}>
                <div className="row">
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
                      Login
                    </button>
                    {apiError ? (
                      <div className="alert alert-danger p-2 mt-3">
                        {apiError}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>

              <hr className="w-100 m-auto my-3" />
              <div className="text-center my-3">
                <Link
                  className={`mb-1 ${styles.blueColor} small d-block text-decoration-none`}
                  onClick={() => {
                    alert("Create Account!!!");
                  }}
                >
                  Forgot Password?
                </Link>
                <span className={`${styles.grayColor} small`}>
                  Not a member yet?
                </span>
                <Link
                  className={`${styles.blueColor} text-decoration-none ms-1 small`}
                  to="/register"
                >
                  Create Account <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
