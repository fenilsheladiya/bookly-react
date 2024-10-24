import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasswordOtp = () => {

    const [otpp, setOtp] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // eslint-disable-next-line no-template-curly-in-string
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-password-otp`, {
          otpp
        });
        if (res && res.data.success == true) {
          toast.success(res.data && res.data.message);
navigate('/forgot-password_update')
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
       
      }
    };
    return (
      <Layout title={"Forgot Password - Ecommerce APP"}>
        <div className="login-form-container">
          <NavLink to="/" href="#">
            <div id="close-login-btn" className="fas fa-times"></div>
          </NavLink>
  
          <form onSubmit={handleSubmit}>
            <h4 className="title">RESET PASSWORD</h4>
  
            <span>Enter otp</span>
            <input
              type="text"
              value={otpp}
              onChange={(e) => setOtp(e.target.value)}
              className="box"
              id="exampleInputEmail1"
              placeholder="Enter Your otp "
            maxLength={6}
            minLength={6}
            />
  {/* 
            <span>Sport Name </span>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="box"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
  
            <span>password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="box"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            /> */}
  
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
            <p>
              <NavLink to="/login" href="#" style={{ textDecoration: "none" }}>
                <i className="fas fa-arrow-left"></i> back{" "}
              </NavLink>
            </p>
          </form>
        </div>
      </Layout>
    )
}

export default ForgotPasswordOtp
