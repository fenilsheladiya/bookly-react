import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
const { Option } = Select;

const CreateProduct = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


    //create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();  //api pachi name ne avu badhu no lakhvu pade atle append ma badhu avi jay
        productData.append("name", name);
        productData.append("author", author);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
         
    const { data } = await axios.post("/api/v1/product/create-product", productData);
    if (data?.success) {
      
      navigate("/dashboard/admin/products");
      toast.success("Product Created Successfully");
    
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      // Server responded with a status code outside of 2xx
      toast.error(error.response.data.error); // Display the specific error message
    } else {
      // Request was made but no response was received
      toast.error("Something went wrong");
    }
  }
};
  

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <h1 className="heading">
                {" "}
                <span>Create Product</span>{" "}
              </h1>
            <div className="m-1 w-75">
            <select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select p-3 fs-3 mb-3"
                onChange={(value) => {
                  setCategory(value.target.value);
                }}
              >
                {categories?.map((c) => (
                  <option   className="form-select p-3 fs-3 mb-3" key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])} //value ni jagyaye file levi file mathi select karvanu ave atle array 0 rakhvo array ave atle
                    style={{padding:"10px" , fontSize:"1.2rem"}}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)} // browser nin property ave photo show karavo hpy je select karyo hoy te
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={author}
                  placeholder="write a author"
                  className="form-control"
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{padding:"10px" , fontSize:"1.2rem"}}
                />
              </div>
              <div className="mb-3">
                <select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
