import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
        <h4 style={{backgroundColor:"green ! important"}}>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action admin_link" 
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action admin_link" 
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/createBlogs"
            className="list-group-item list-group-item-action admin_link" 
          >
            Create Blogs
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action admin_link" 
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action admin_link" 
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action admin_link" 
          >
            Users
          </NavLink>
         
          <NavLink
            to="/dashboard/admin/Blogs"
            className="list-group-item list-group-item-action admin_link" 
          >
             Blogs
          </NavLink>
          <NavLink
            to="/dashboard/admin/contact"
            className="list-group-item list-group-item-action admin_link" 
          >
             contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
