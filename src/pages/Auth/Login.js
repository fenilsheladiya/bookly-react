import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";
// import "../../styles/Header.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const res = await axios.post("${process.env.REACT_APP_API_URL}/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="login-form-container">
      <NavLink to="/" href="#">
        <div id="close-login-btn" className="fas fa-times"></div>
      </NavLink>

      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>
        <span>Email</span>
        <input
          type="temail"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          id="exampleInputEmail1"
          placeholder="Enter Your Email "
          name="email"
          className="box"
        />

        <span>password</span>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="exampleInputPassword1"
          className="box"
          placeholder="enter your password"
        />

        <div className="checkbox">
          <input type="checkbox" name="" id="remember-me" />
          <label htmlFor="remember-me"> remember me</label>
        </div>

        <button type="submit" className="btn">
          LOGIN
        </button>
        <p>
          forget password ?{" "}
          <NavLink to="/forgot-password" href="#">
            click here
          </NavLink>
        </p>
        <p>
          don't a have account ?{" "}
          <NavLink to="/register" href="#">
            click here
          </NavLink>
        </p>
      </form>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 4000 }}
        reverseOrder={true}
      />
    </div>
  );
};

export default Login;
