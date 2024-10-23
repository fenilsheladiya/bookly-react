import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const res = await axios.post("${process.env.REACT_APP_API_URL}/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      console.log(res.data)
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    // <Layout title="Register - Ecommer App"/> // </Layout>
    // ama khali position sticky api che khali scroll thay ne atle
    <div className="login-form-container position-sticky">
      <a href="/">
        <div id="close-login-btn" className="fas fa-times"></div>
      </a>

      <form onSubmit={handleSubmit}>
        <h4 className="title">Register FORM</h4>
        {/* <span>username</span> */}
        <span>Name</span>
        <input
          type="text"
          autoFocus
          onChange={(e) => setName(e.target.value)}
          id="exampleInputEmail1"
          placeholder="Enter Your Name"
          name="email"
          className="box"
        />

        <span>Email</span>
        <input
          type="email"
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

        <span>Phone</span>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          className="box"
          id="exampleInputEmail1"
          placeholder="Enter Your Phone"
        />

        <span>Address</span>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          className="box"
          id="exampleInputEmail1"
          placeholder="Enter Your Address"
        />

        <span>Answer</span>
        <input
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          className="box"
          id="exampleInputEmail1"
          placeholder="What is Your Favorite sports"
        />

        <div className="checkbox">
          <input type="checkbox" name="" id="remember-me" />
          <label htmlFor="remember-me"> remember me</label>
        </div>

        <button type="submit" className="btn">
          Register
        </button>
        <p>
          forget password ?{" "}
          <NavLink to="/forgot-password" href="#">
            click here
          </NavLink>
        </p>
        <p>
          Alerady have account ?{" "}
          <NavLink to="/login" href="#">
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

export default Register;
