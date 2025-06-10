import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const { name, email, password, cpassword } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/creatUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      history("/");
      // Show a success message
      props.showAlert("Account created successfully", "success");
    } else {
      // Show an error message
      props.showAlert("Invalid credentials", "danger");
    }
  };
  onchange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container mt-3">
        {/* <h2>Create a account to use iNotebook</h2> */}
        <form onSubmit={handleSubmit}>
          <h2 className="my-3">Sign Up to iNotebook</h2>
          <div className="my-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="Text"
              className="form-control"
              id="name"
              name="name"
              onChange={onchange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onchange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onchange}
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
