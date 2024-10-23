import Layout from "./../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import { ShimmerButton } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";

const BlogsAll = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    
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

  return (
    <Layout>
          <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>All Blog</span>{" "}
        </h1>

        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
            {blogs?.photo == 0 ? (
              <>
                <div className="card m-2 d-flex">
                  {[1, 1, 1]?.map((item, index) => {
                    return <ShimmerButton width={120} />;
                  })}
                </div>
              </>
            ) : (
                blogs?.map((p) => (
                <>
                  <div
                    
                    className="swiper-slide box"
                  >
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
                      <Link
                    to={`/blogs/${p.slug}`}
                    onClick={() => navigate(`/blogs/${p.slug}`)}
                    className="btn"
                  >Read more</Link>
                     
                

                      {/* <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div> */}
                    </div>
                  </div>
                </>
              ))
            )}
            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default BlogsAll
