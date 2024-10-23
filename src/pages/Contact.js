import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/contact", {
        name,
        surname,
        email,
       subject,
       message,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      
        setName("");
        setSurname("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Contact us"}>

      <div className="mt-5">
        <div className="container my-5 ">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h1 className="mb-3">Contact Us</h1>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="your-name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
          onChange={(e) => setName(e.target.value)}
                      id="your-name"
                      name="your-name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="your-surname" className="form-label">
                      Your Surname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      id="your-surname"
                      name="your-surname"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="your-email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="your-email"
                      name="your-email"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="your-subject" className="form-label">
                      Your Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      id="your-subject"
                      name="your-subject"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="your-message" className="form-label">
                      Your Message
                    </label>
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="your-message"
                      name="your-message"
                      rows={5}
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          data-res="<?php echo $sum; ?>"
                          type="submit"
                          className="btn btn-dark w-100 fw-bold"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
