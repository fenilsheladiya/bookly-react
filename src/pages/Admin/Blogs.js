import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ShimmerButton } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [id, setId] = useState("");

  //get blog
  const getAllBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  //delete a product
  const handleDelete = async (blogId) => {
    try {
      let answer = window.confirm("Are You Sure want to delete this blog ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/product/delete-blog/${blogId}`);
      toast.success("Product DEleted Succfully");
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      navigate("/dashboard/admin/blogs");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 dashboard">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <section className="arrivals" id="arrivals">
              <h1 className="heading">
                {" "}
                <span>All Blog</span>{" "}
              </h1>

              <div className="swiper arrivals-slider">
                <div className="swiper-wrapper d-flex flex-wrap">
                  {blogs?.map((p) => (
                    <>
                      <div className="swiper-slide box">
                        <div className="image" key={p._id}>
                          <img
                            src={`/api/v1/product/blog-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.title}
                          />
                        </div>
                        <div className="content">
                          <h3> {p.title.substring(0, 15)}...</h3>
                          <p
                            className="card-text"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {p.description.substring(0, 30)}...
                          </p>
                          <button
                            className="btnn btn-danger"
                            onClick={() => handleDelete(p._id)}
                          >
                            DELETE 
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBlogs;
