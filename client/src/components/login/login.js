import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const login = () => {
    axios.post("http://localhost:5000/login", user).then((res) => {
      alert(res.data.message);
      // If login successful, save user information to localStorage
      if (res.data.message === "Login Successfull") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoginUser(res.data.user);
        history.push("/");
      }
    });
  };

  return (
    <div className="login">
      {/* <h1>Login</h1> */}
      <FaRegUserCircle    className="user-icon"/>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <div className="button" onClick={login}>
        LOGIN 
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/register")}>
        REGISTER
      </div>
    </div>
  );
};

export default Login;
