import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import "../styles/Homepage.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [radio, setRadio] = useState([]);
  const [checked, setChecked] = useState([]);
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
    <div>
      {/*          <!-- blogs section starts  -->
       */}
      <section className="blogs" id="blogs">
        <h1 className="heading">
          {" "}
          <span>our blogs</span>{" "}
        </h1>

        <div className="swiper blogs-slider">
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              loop={true}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {blogs?.map((p) => (
                <SwiperSlide>
                  <div className="swiper-slide box">
                    <div className="image">
                      <img  src={`/api/v1/product/blog-photo/${p._id}`} alt="" />
                    </div>
                    <div className="content">
                    <h3> {p.title.substring(0, 15)}...</h3> 
                      <p>
                      {p.description.substring(0, 40)}...
                      </p>
                      <Link
                    to={`/blogs/${p.slug}`}
                    onClick={() => navigate(`/blogs/${p.slug}`)}
                    className="btn"
                  >Read more</Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>
        </div>
      </section>
      {/* blogs end */}
    </div>
  );
};

export default Blogs;
