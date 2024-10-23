import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { useWish } from "../context/wishlist";
import toast from "react-hot-toast";
import { ShimmerButton } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
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
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id); /// jyare aa function call thay tyre related mate cid and pid store karshe
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row p-5 product-details">
        <div className="col-md-4">
          <img
            src={`/api/v1/product/product-photo/${products?._id}`}
            className="card-img-top object-fit-contain border border-0"
            alt={products.name}
            height="400"
            width={"200px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Book Details</h1>
          <hr />
          <h6 className="fs-1"> Name : {products.name}</h6>
          <h6 className="fs-4">Author : {products.author}</h6>
          <h6 className="fs-5">Description : {products.description}</h6>
          <h6 className="fs-4">
            Price :
            {products?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6 className="fs-4">Category : {products?.category?.name}</h6>
          <button
            className="btn"
            onClick={() => {
              setCart([...cart, products]);
              localStorage.setItem("cart", JSON.stringify([...cart, products]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>

          <br />
          <button
            className="btnn  btn-danger"
            onClick={() => {
              setWish([...wish, products]);
              localStorage.setItem("wish", JSON.stringify([...wish, products]));
              toast.success("Item Added to wishlist");
            }}
          >
            Save wishlist
          </button>
        </div>
      </div>
      <hr />

      <section className="arrivals" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>Similar Book</span>{" "}
        </h1>
        {relatedProducts.length < 1 && (
          <h1 className="heading">
            {" "}
            <span>No Similar Book Found</span>{" "}
          </h1>
        )}
        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
            {relatedProducts?.photo == 0 ? (
              <>
                <div className="card m-2 d-flex">
                  {[1, 1, 1]?.map((item, index) => {
                    return <ShimmerButton width={120} />;
                  })}
                </div>
              </>
            ) : (
              relatedProducts?.map((p) => (
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
    </Layout>
  );
};

export default ProductDetails;
