import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BlogDetailsStyles.css";
import { useCart } from "../context/cart";
import { useWish } from "../context/wishlist";
import toast from "react-hot-toast";
import { ShimmerButton } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
const BlogDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-blog/${params.slug}`
      );
      setBlogs(data?.blog);
    } catch (error) {
      console.log(error);
    }
  };

  //get products
  const getAllBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-blog`);
      if (data?.success) {
        setLoading(false);
        setRelatedBlogs(data?.blogs);
      }
    } catch (error) {
        setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  
  }, []);

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/blog-photo/${Blogs?._id}`}
            className="card-img-top object-fit-contain border border-0"
            alt={Blogs.title}
            height="400"
            width={"200px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Blog Details</h1>
          <hr />
          <h6 className="fs-1"> Name : {Blogs.title}</h6>
          <h6 className="fs-5">Description : {Blogs.description}</h6>
        </div>
      </div>
      <hr />

      <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>Similar Blog</span>{" "}
        </h1>
        {relatedBlogs.length < 1 && (
          <h1 className="heading">
            {" "}
            <span>No Similar Blog Found</span>{" "}
          </h1>
        )}
        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
            {relatedBlogs?.photo == 0 ? (
              <>
                <div className="card m-2 d-flex">
                  {[1, 1, 1]?.map((item, index) => {
                    return <ShimmerButton width={120} />;
                  })}
                </div>
              </>
            ) : (
              relatedBlogs?.map((p) => (
                <>
                  <div className="swiper-slide box">
                    <div className="image" key={p._id}>
                      <img
                        src={`/api/v1/product/blog-photo/${p?._id}`}
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
                        {p.description.substring(0, 60)}...
                      </p>
                      <button
                        to={`/blogs/${p.slug}`}
                        onClick={() => navigate(`/blogs/${p.slug}`)}
                        className="btn"
                      >
                       Read MOre
                      </button>
                 
                    </div>
                    <br/>
                    
                    
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
