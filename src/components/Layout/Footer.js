import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
const Footer = () => {
  return (
    
// <!-- footer section starts  -->
// */}
           <section className="footer">
<hr/>
               <div className="box-container">

                   <div className="box">
                       <h3>our locations</h3>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> india </Link>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> USA </Link>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> russia </Link>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> france </Link>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> japan </Link>
                       <Link to="/"> <i className="fas fa-map-marker-alt"></i> africa </Link>
                   </div>

                   <div className="box">
                       <h3>quick links</h3>
                       <Link to="/"> <i className="fas fa-arrow-right"></i> home </Link>
                       <Link to="/featured"> <i className="fas fa-arrow-right"></i> featured </Link>
                       <Link to="/categories"> <i className="fas fa-arrow-right"></i> category </Link>
                       <Link to="/blog"> <i className="fas fa-arrow-right"></i> blogs </Link>
                   </div>

                   <div className="box">
                       <h3>extra links</h3>
                       <Link to="/contact"> <i className="fas fa-arrow-right"></i> Contact Us </Link>
                       <Link to="/dashboard/user/orders"> <i className="fas fa-arrow-right"></i> ordered items </Link>
                       <Link to="/policy"> <i className="fas fa-arrow-right"></i> privacy policy </Link>
                       <Link to="/about"> <i className="fas fa-arrow-right"></i> About us </Link>
                   </div>

                   <div className="box">
                       <h3>contact info</h3>
                       <Link to="/"> <i className="fas fa-phone"></i> +90543 96691 </Link>
                       <Link to="/"> <i className="fas fa-phone"></i> +87587 64198</Link>
                       <Link to="/"> <i className="fas fa-envelope"></i> Bookly@gmail.com </Link>
                       <img src="/assets/image/worldmap.png" className="map" alt="" />
                   </div>

               </div>

               <div className="share">
                   <Link to="/" className="fab fa-facebook-f"></Link>
                   <Link to="/" className="fab fa-twitter"></Link>
                   <Link to="/" className="fab fa-instagram"></Link>
                   <Link to="/" className="fab fa-linkedin"></Link>
                   <Link to="/" className="fab fa-pinterest"></Link>
               </div>

               <div className="credit"> created by <span>Bookly</span> | all rights reserved! </div>

           </section>

          //  {/* <!-- footer section ends --> */}
  );
};

export default Footer;
