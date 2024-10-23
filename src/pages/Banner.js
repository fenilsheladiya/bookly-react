import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="row">
          <div className="content">
            <h3>upto 75% off</h3>
            <p>
              A limited-time offer is any kind of discount, deal, special gift,
              or reward a buyer can get if they make a purchase from you during
              a certain time period.
            </p>
          </div>

          <div className="swiper books-slider">
            <div className="swiper-wrapper">
              <Swiper
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
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-1.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-2.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-3.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-4.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-5.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-6.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-7.png" alt="" />
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to="/" className="swiper-slide">
                    <img src="assets/image/book-8.png" alt="" />
                  </Link>
                </SwiperSlide>
                ...
              </Swiper>
            </div>
            <img src="assets/image/stand.png" className="stand" alt="" />
          </div>
        </div>
      </section>

      <section className="icons-container">
        <div className="icons">
          <i className="fas fa-shipping-fast"></i>
          <div className="content">
            <h3>free shipping</h3>
            <p>order over $100</p>
          </div>
        </div>

        <div className="icons">
          <i className="fas fa-lock"></i>
          <div className="content">
            <h3>secure payment</h3>
            <p>100 secure payment</p>
          </div>
        </div>

        <div className="icons">
          <i className="fas fa-redo-alt"></i>
          <div className="content">
            <h3>easy returns</h3>
            <p>10 days returns</p>
          </div>
        </div>

        <div className="icons">
          <i className="fas fa-headset"></i>
          <div className="content">
            <h3>24/7 support</h3>
            <p>call us anytime</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
