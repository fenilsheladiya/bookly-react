import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Contact = () => { // Change 'contact' to 'Contact'
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useAuth();

  const getUser = async () => { // Changed to camelCase convention
    try {
      const { data } = await axios.get("/api/v1/auth/all-contact");
      setUser(data?.contact);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUser(); // Changed function name to camelCase
    console.log("user:", user);
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 dashboard">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="heading">
              <span>All user</span>
            </h1>
            <table className="table fs-3 mb-5">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th> 
                  <th scope="col">Surname</th>
                  <th scope="col">Email</th>
                  <th scope="col">subject</th>
                  <th scope="col">message</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((o, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{o?.name}</td>
                    <td>{o?.surname}</td>
                    <td>{o?.email}</td>
                    <td>{o?.subject}</td>
                    <td>{o?.message}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact; // Changed 'contact' to 'Contact' for export
