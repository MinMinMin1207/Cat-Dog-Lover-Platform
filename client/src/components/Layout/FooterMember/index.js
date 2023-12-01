import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "~/assets/images";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";


const cx = classNames.bind(styles);

function FooterMember({className}) {
  const [userData, setUserData] = useState("");

  const handleGetOption = () =>{
    window.location.href = `/profile/${userData.id}`;
  }

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData);
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      className={cx("footer-wrapper", {
        [className]: className,
      })}
    >
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>ABOUT US</h2>
        <div>
          <span className="nav-desc">
          Discover the best for your pets at Paws And Whisker. Join us for a seamless experience in pet care, community, and shopping.          </span>
          <div className={cx("list-icon")}>
            <img src={images.iconFB} className={cx("icon-img")} />
            <img src={images.iconX} className={cx("icon-img")} />
            <img src={images.iconInsta} className={cx("icon-img")} />
            <img src={images.iconGmail} className={cx("icon-img")} />
          </div>
        </div>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>USEFUL LINKS</h2>
        <ul>
          <li className={cx("nav-item")}><Link to = "/contactmember">Help & Contact Us</Link></li>
          <li className={cx("nav-item")}><Link to ="/policyuser">Privacy Policy</Link></li>
          <li className={cx("nav-item")}><Link to="/shop">Online Stores</Link></li>
          <li className={cx("nav-item")}><Link to="/termuser">Terms & Conditions</Link></li>
        </ul>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>HELP</h2>
        <ul>
          <li className={cx("nav-item")}>Wishlist</li>
          <li className={cx("nav-item")}>Pricing Plans</li>
          <li className={cx("nav-item")}>Order Tracking</li>
          <li className={cx("nav-item")}>Returns</li>
        </ul>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>QUICK MENU</h2>
        <ul>
        <li className={cx("nav-item")}><Link to="/shop">Shop</Link></li>
          <li className={cx("nav-item")} onClick={handleGetOption}>My-Account</li>
          <li className={cx("nav-item")}><Link to="/cart">Cart</Link></li>
          <li className={cx("nav-item")}><Link to="/checkout">Checkout</Link></li>
        </ul>
        
      </div>
    </div>
  );
}

export default FooterMember;
