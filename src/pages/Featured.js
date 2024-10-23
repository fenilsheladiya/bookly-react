import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/FeaturedStyle.css";
import { ShimmerButton } from "react-shimmer-effects";
import { useWish } from "../context/wishlist";
import { Link } from "react-router-dom";

const Featured = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wish, setWish] = useWish();

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
    }, []);
    //get products
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/get-product`);
        setLoading(false);
        setProducts(data?.products);
      } catch (error) {
        setLoading(false);
        console.log(error);
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
        <div className="container-fluid row mt-3 home-page">
          <div className="col-md-2 filters">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="save"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-10 ">
          <section className="arrivalss" id="arrivals">
        <h1 className="heading">
          {" "}
          <span>All product</span>{" "}
        </h1>

        <div className="swiper arrivals-slider">
          <div className="swiper-wrapper d-flex flex-wrap">
           
           {   products?.map((p) => (
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
                        <b>
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                        </b>
                      </div>

                      <button
                        className="add"
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
                        className="save"
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
                  </Link>
                </>
              ))
            }
        
          </div>
        </div>
      </section>
            <div className="m-2 p-3">
              {/* {products && products.length < total && (
                <button
                  className="btn loadmore"
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
              )} */}
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Featured
