import React, { useState, useEffect } from "react";
import "../styles/Homepage.css";

const Lodder = () => {
    const [showLoader, setShowLoader] = useState(true); //loader mate

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header .header-2");
      if (window.scrollY > 80) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fadeOut = () => {
      setTimeout(() => {
        setShowLoader(false);
      }, 4000);
    };

    fadeOut();
  }, []);
  return (
    <div>
      {showLoader && (
        <div className="loader-container">
          <img src="assets/image/loader-img.gif" alt="" />
        </div>
      )}
    </div>
  )
}

export default Lodder
