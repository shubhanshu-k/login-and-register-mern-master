import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    dateOfBirth: "" // Add dateOfBirth field to the user state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword, dateOfBirth } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:5000/register", user).then((res) => {
        alert(res.data.message);
        // If registration successful, save user information to localStorage
        if (res.data.message === "Successfully Registered, Please login now.") {
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/login");
        }
      });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <div className="title-wrapper" style={{ backgroundColor: "#00f5e1", color: "#004848" }}>

        <h1>Register</h1>
      </div>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      <input
        type="date"
        name="dateOfBirth"
        value={user.dateOfBirth}
        placeholder="Date of Birth"
        onChange={handleChange}
      ></input>{" "}
      {/* Add input field for date of birth */}
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
