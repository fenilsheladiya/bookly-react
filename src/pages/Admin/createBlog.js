import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CreateBlogs = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("photo", photo);
      const { data } = await axios.post("/api/v1/product/create-blog", blogData);
      if (data?.success) {
        toast.success("Blog Created Successfully");
        navigate("/dashboard/admin");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        // Server responded with a status code outside of 2xx
        toast.error(error.response.data.error); // Display the specific error message
      } else {
        // Request was made but no response was received or response does not contain error data
        toast.error("Something went wrong");
      }
    }
  };
  

  return (
    <Layout title={"Dashboard - Create blog"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <h1 className="heading">
                {" "}
                <span>Create Blog</span>{" "}
              </h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="write a title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Add Blogs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlogs;