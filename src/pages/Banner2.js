import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const Banner2 = () => {
    const [email, setEmail] = useState("");
    
  // form function
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/subscriber", { 
        email,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setEmail("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
        
{/* <!-- deal section starts  --> */} 

<section className="deal">

    <div className="content">
        <h3>deal of the day</h3>
        <h1>upto 50% off</h1>
        <p>A limited-time offer is any kind of discount, deal, special gift, or reward a buyer can get if they make a purchase from you during a certain time period.</p>
    </div>

    <div className="image">
        <img src="assets/image/deal-img.jpg" alt="" />
    </div>

</section>

{/* <!-- deal section ends -->
        
{/* <!-- newsletter section starts -->  */}

<section className="newsletter">

    <form onSubmit={handleSubmit}>
        <h3>subscribe for latest updates</h3>
        <input
          type="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="exampleInputEmail1"
          placeholder="Enter Your Email "
          required
          name="email"
          className="box"
        />

<button type="submit" className="btn">
          subscribe
        </button>
    </form>

</section>

{/* {/* <!-- newsletter section ends --> */}
      
    </div>
  )
}

export default Banner2
