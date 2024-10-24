import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 dashboard">
        <div className="row dashboard ">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 ">
          <h1 className="heading">
                {" "}
                <span>All Product List</span>{" "}
              </h1>
            <div className="d-flex  flex-wrap justify-content-start products">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link "
                >
                  <div className="card m-3" style={{ width: "25rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top "
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {" "}
                        {p.name.substring(0, 25)}...
                      </h5>
                      <p className="card-text">
                        {" "}
                        {p.description.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
