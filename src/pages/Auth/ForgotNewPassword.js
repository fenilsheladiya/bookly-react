import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotNewPassword = () => {
    const [Password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
 

    const navigate = useNavigate();
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put("/api/v1/auth/forgot-password-newpassword", {
          Password,
          CPassword
        });
        if (res && res.data.success == true) {
          toast.success(res.data && res.data.message);
          navigate('/login')
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
  
            <span>Passsword</span>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="box"
              id="exampleInputEmail1"
              placeholder="Enter Your password "
            
            />

<span>Confirm Passsword</span>
            <input
              type="password"
              value={CPassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="box"
              id="exampleInputEmail1"
              placeholder="Enter Your Confirm password "
            
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
    );
}

export default ForgotNewPassword
