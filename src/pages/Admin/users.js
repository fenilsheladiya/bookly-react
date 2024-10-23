import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

function Users() {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useAuth();
  const [subscribere, setSubscriber] = useState([]);

  const getuser = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-user");
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getuser();
    console.log("user:", user);
  }, [auth?.token]);

  //all subscriber
  const getsubsciber = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-subscriber");
      setSubscriber(data?.subscribe);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getsubsciber();
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
              {" "}
              <span>All user</span>{" "}
            </h1>
            <table className="table fs-3 mb-5">
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th scope="col">No</th>
                  <th scope="col">Name</th> <th scope="col">Email</th>{" "}
                  <th scope="col">Phone No</th> <th scope="col">Address</th>{" "}
                  <th scope="col">Date</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody >
                {" "}
                {user?.map((o, i) => {
                  return (
                    <tr key={i}>
                      {" "}
                      <th scope="row">{i + 1}</th>
                      <td >{o?.name}</td>
                       <td>{o?.email}</td>
                      <td>{o?.phone}</td> <
                        td>{o?.address}</td>{" "}
                      <td>{moment(o?.createAt).fromNow()}</td>{" "}
                    </tr>
                  );
                })}{" "}
              </tbody>{" "}
            </table>
            <br />
            <br />
            <h1 className="heading mt-5">
              {" "}
              <span>All Subscriber</span>{" "}
            </h1>
            <table className="table fs-3 mb-5">
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th scope="col">No</th> <th scope="col">Email</th>{" "}
                  <th scope="col">Date</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {subscribere?.map((o, i) => {
                  return (
                    <tr key={i}>
                      {" "}
                      <th scope="row">{i + 1}</th>
                      <td>{o?.email}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>{" "}
                    </tr>
                  );
                })}{" "}
              </tbody>{" "}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
