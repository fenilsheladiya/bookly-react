import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgetPassword.js";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/users.js";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Banner from "./pages/Banner.js";
import Banner2 from "./pages/Banner2.js";
import Blogs from "./pages/Blogs.js";
import ForgotPasswordOtp from "./pages/Auth/ForgotPasswordOtp.js";
import ForgotNewPassword from "./pages/Auth/ForgotNewPassword.js";
import Wish from "./pages/Wish.js";
import Lodder from "./pages/Lodder.js";
import CreateBlogs from "./pages/Admin/createBlog.js";
import BlogDetails from "./pages/BlogDetails.js";
import BlogsAll from "./pages/BlogsAll.js";
import AdminBlogs from "./pages/Admin/Blogs.js";
import Featured from "./pages/Featured.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import Contactt from "./pages/Admin/contactt.js";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/banner" element={<Banner/>}/>
        <Route path="/banner2" element={<Banner2/>}/>
        <Route path="/loader" element={<Lodder/>}/>
        <Route path="/featured" element={<Featured/>}/>
        <Route path="/blog" element={<BlogsAll/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wish />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/CreateBlogs" element={<CreateBlogs/>} />
          <Route path="admin/blogs" element={<AdminBlogs/>} />
          <Route path="admin/blogs" element={<AdminBlogs/>} />
          <Route path="admin/contact" element={<Contactt/>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/forgot-password_otp" element={<ForgotPasswordOtp />} />
        <Route path="/forgot-password_update" element={<ForgotNewPassword />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/about" element={<About />} />     
        <Route path="/contact" element={<Contact />} />     
        <Route path="/policy" element={<Policy />} />     
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
