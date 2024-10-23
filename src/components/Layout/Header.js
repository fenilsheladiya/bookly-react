import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBook } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "../styles/Header.css";
import { useWish } from "../../context/wishlist";

const Header = () => {
  const [cart] = useCart();
  const [wish] = useWish();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [searchActive, setSearchActive] = useState(false);
  // const [loginActive, setLoginActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  // const toggleLogin = () => {
  //   setLoginActive(!loginActive);
  // };

  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout success");
  };
  return (
    <>
      <div>
        {" "}
        {/* ama akho code convert karyo script valo chat gpt mathi lidhyo */}
        <header className="header">
          <div className="header-1">
            <NavLink to="/" className="logo a">
              <i className="fas fa-book" /> bookly
            </NavLink>
            <SearchInput />
            <div className="icons">
              <div
                id="search-btn"
                className={`fas fa-search ${searchActive ? "active" : ""}`}
                onClick={toggleSearch}
              />
              <NavLink to="/wishlist"className="a" >
                {wish?.length > 0 ? (
                  <Badge count={wish.length} showZero offset={[10, -5]}>
                    <div className="fas fa-heart"></div>
                  </Badge>
                ) : (
                  <div className="fas fa-heart"></div>
                )}
              </NavLink>
              <NavLink to="/cart" className="a">
                {cart?.length > 0 ? (
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    <div className="fas fa-shopping-cart"></div>
                  </Badge>
                ) : (
                  <div className="fas fa-shopping-cart"></div>
                )}
              </NavLink>

              {!auth.user ? (
                <NavLink
                  to="/login"
                  id="login-btn"
                  className="a fas fa-user"
                  // className={`a fas fa-user ${loginActive ? "active" : ""}`}
                  // onClick={toggleLogin}
                />
              ) : (
                <ul className="a main_menuu">
                  <li>
                    <NavLink to="/" className="a">
                      {auth?.user?.name}
                      <i className="fas fa-chevron-down side_icon"></i>
                    </NavLink>
                    <ul className="sub_menuu">
                      <li>
                        <Link
                          className="a"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          dashboard
                        </Link>
                        <Link className="a" onClick={handlelogout} to="/login">
                          {" "}
                          logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="header-2 ">
            <nav className="navbarr">
              <NavLink className="a" to="/" href="#home">
                home
              </NavLink>
              <ul className="main_menu a">
                <li>
                  <NavLink className="a" to={"/categories"} href="#">
                    Categories
                  </NavLink>
                  <ul className="sub_menu">
                    {categories?.map((c) => (
                      <li>
                        <Link className="a" to={`/category/${c.slug}`}>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <NavLink className="a" to="/featured" href="#">
                featured
              </NavLink>
          
              <NavLink className="a" to="/blog" href="#blogs">
                blogs
              </NavLink>
              <NavLink className="a" to="/contact" href="#blogs">
                Contact
              </NavLink>
            </nav>
          </div>
        </header>
        {/* header section ends */}
        {/* bottom navbar   */}
        <nav className="bottom-navbar">
          <NavLink to="/" href="#home" className="fas fa-home" />
          <NavLink to="/categories" href="#featured" className="fas fa-list" />
          <NavLink to="/a" href="#arrivals" className="fas fa-tags" />
          <NavLink to="/r" href="#reviews" className="fas fa-comments" />
          <NavLink to="/b" href="#blogs" className="fas fa-blog" />
        </nav>
        {/* login form */}
        {/* <div className={`login-form-container ${loginActive ? "active" : ""}`}>
          <div
            id="close-login-btn"
            onClick={() => setLoginActive(false)}
            className="fas fa-times"
          />
          <form action>
            <h3>sign in</h3>
            <span>username</span>
            <input
              type="email"
              name="email"
              className="box"
              placeholder="enter your email"
            />
            <span>password</span>
            <input
              type="password"
              name="password"
              className="box"
              placeholder="enter your password"
            />
            <div className="checkbox">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label htmlFor="remember-me"> remember me</label>
            </div>
            <input type="submit" defaultValue="sign in" className="btn" />
            <p>
              forget password ?{" "}
              <NavLink to="/" href="#">
                click here
              </NavLink>
            </p>
            <p>
              don't have an account ?{" "}
              <NavLink to="/" href="#">
                create one
              </NavLink>
            </p>
          </form>
        </div> */}
      </div>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> 
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" href="#">
              <FaBook /> Bookly
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      to="/"
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handlelogout}
                          to="/login"
                          className="dropdown-item "
                          href="#"
                        >
                          {" "}
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Header;
