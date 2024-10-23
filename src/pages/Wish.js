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

const Wish = () => {
  const [wish, setWish] = useWish();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  //detele item
  const removeCartItem = (pid) => {
    try {
      let mywish = [...wish];
      let index = mywish.findIndex((item) => item._id === pid);
      mywish.splice(index, 1);
      setWish(mywish);
      localStorage.setItem("wish", JSON.stringify(mywish));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center bg-light p-2 mb-1">
        {!auth?.user ? "Hello Guest" : `Hello  ${auth?.user?.name}`}
        <p className="text-center">
          {wish?.length
            ? `You Have ${wish.length} items in your wishlist `
            : " Your wishlist Is Empty"}
        </p>
      </h1>
      <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>Wishlist</span>{" "}
        </h1>

        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
            {wish?.photo == 0 ? (
              <>
                <div className="card m-2 d-flex">
                  {[1, 1, 1]?.map((item, index) => {
                    return <ShimmerButton width={120} />;
                  })}
                </div>
              </>
            ) : (
              wish?.map((p) => (
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
                      <br/>

                      <button
                        className="btnn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              ))
            )}
            <div className="m-2 p-3">
              {wish && wish.length < total && (
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
    </Layout>
  );
};

export default Wish;
