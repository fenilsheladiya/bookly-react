import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { ShimmerButton } from "react-shimmer-effects";
import Banner from "./Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Banner2 from "./Banner2";
import Blogs from "./Blogs";
import { useWish } from "../context/wishlist";
import Lodder from "./Lodder";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      <Banner /> {/*add banner page and icons  */}
      {/* card design */}
      <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>All Book</span>{" "}
        </h1>

        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
            {products?.photo == 0 ? (
              <>
                <div className="card m-2 d-flex">
                  {[1, 1, 1]?.map((item, index) => {
                    return <ShimmerButton width={120} />;
                  })}
                </div>
              </>
            ) : (
              products?.map((p) => (
                <>
                  <Link
                    to={`/product/${p.slug}`}
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="swiper-slide box"
                  >
                    <div className="image" key={p._id}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="content">
                      <h3> {p.name.substring(0, 15)}...</h3>
                      <p
                        className="card-text"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {p.description.substring(0, 30)}...
                      </p>

                      <div className="price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                        <span>$20.99</span>
                      </div>

                      <button
                        className="btn"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                      <br />

                      <button
                        className="btnn  btn-danger"
                        onClick={() => {
                          setWish([...wish, p]);
                          localStorage.setItem(
                            "wish",
                            JSON.stringify([...wish, p])
                          );
                          toast.success("Item Added to wishlist");
                        }}
                      >
                        Save wishlist
                      </button>

                      {/* <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div> */}
                    </div>
                  </Link>
                </>
              ))
            )}
            <div className="m-2 p-3">
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
            </div>
          </div>
        </div>
      </section>
      <Banner2 />
      <Blogs />
     <Lodder/>
    </Layout>
  );
};

export default HomePage;
