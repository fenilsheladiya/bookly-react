import Layout from "./../components/Layout/Layout";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";
import React, { useState, useEffect } from "react";
import "../styles/ProductDetailsStyles.css";
import { useWish } from "../context/wishlist";
import { ShimmerButton } from "react-shimmer-effects";
import { AiOutlineReload } from "react-icons/ai";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
const Search = () => {
  const [wish, setWish] = useWish();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const [values] = useSearch();
  return (
    <Layout title={"Search results"}>
      
      <section className="arrivals" id="arrivals">
        <h1 className="heading">
        <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </h1>

        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
          {values?.results.map((p) => (
                <>
                  <div className="swiper-slide box">
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

                      <br />

                      <Link
                        to={`/product/${p.slug}`}
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="btn"
                      >
                        More details
                      </Link>

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
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Search;
