import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/aboutUs.css";

function About() {
  return (
    <Layout title={"About us - Ecommer app"}>
      {/* <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div> */}

      <section className="section_all bg-light" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title_all text-center">
                <h3 className="font-weight-bold">
                  Welcome To <span className="text-custom">Bookly</span>
                </h3>
                <p className="section_subtitle mx-auto text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. <br />
                  Lorem Ipsum has been the industry's standard dummy text.
                </p>
                <div className>
                  <i className />
                </div>
              </div>
            </div>
          </div>
          <div className="row vertical_content_manage mt-5">
            <div className="col-lg-6">
              <div className="about_header_main mt-3">
                <div className="about_icon_box">
                    <p className="text_custom fs-1">
                    About Bookly
                    </p>
                </div>
                <h4 className="about_heading text-capitalize font-weight-bold mt-4">
                  We make books great again. Just kidding, books were always
                  great!
                </h4>
                <p className="text-muted  fs-4  mt-3">
                  Every month, we send our subscribers a box with the five best
                  books of the month. These are bestsellers and classic books
                  that deserve to be read and placed on your bookshelf. We
                  select books according to the preferences of our customers. In
                  addition, you can always attend our events, join the book club
                  or just visit our offline store in New York.
                </p>
               
              </div>
            </div>
            <div className="col-lg-6">
              <div className="img_about mt-3">
                <img
                  src="https://i.ibb.co/qpz1hvM/About-us.jpg"
                  alt
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4">
              <div className="about_content_box_all mt-3">
                <div className="about_detail text-center">
                  <div className="about_icon">
                    <i className="fas fa-pencil-alt" />
                  </div>
                  <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                    Creative Design
                  </h5>
                
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about_content_box_all mt-3">
                <div className="about_detail text-center">
                  <div className="about_icon">
                    <i className="fab fa-angellist" />
                  </div>
                  <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                    We make Best Result
                  </h5>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about_content_box_all mt-3">
                <div className="about_detail text-center">
                  <div className="about_icon">
                    <i className="fas fa-paper-plane" />
                  </div>
                  <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                    best platform{" "}
                  </h5>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default About;
