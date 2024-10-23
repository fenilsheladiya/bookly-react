import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import Lodder from "./Lodder";
import { ShimmerButton } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { useWish } from "../context/wishlist";


const CategoryProduct = () => {
  const params = useParams();
  const [cart,setCart] =useCart()
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [wish, setWish] = useWish();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span> {category?.name} product</span>{" "}
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
      </div>
      <Lodder/>
    </Layout>
  );
};

export default CategoryProduct;
