import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from "./Header.module.scss";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "~/components/Tooltip";
import TooltipUser from "~/components/Layout/Admin/Header/TooltipUser";
import Search from "~/components/Layout/Search";

const cx = classNames.bind(styles);

const LIST_USER = [
  {
    icon: images.iconProfile,
    title: "View profile",
    value: "viewprofile",
  },
  {
    icon: images.iconOrderHistory,
    title: "Order Product history",
    value: "orderhistory",
  },
  {
    icon: images.iconOrderHistory,
    title: "Order Pet history",
    value: "orderpethistory",
  },
  {
    icon: images.manageicon,
    title: "Manage posting",
    value: "managepostuser",
  },
  {
    icon: images.manageicon,
    title: "Manage product order",
    value: "manageorderuser",
  },
  {
    icon: images.manageicon,
    title: "Manage pet order",
    value: "managepetorderuser",
  },
  {
    icon: images.serviceIcon,
    title: "Service order",
    value: "serviceorderuser",
  },
  {
    icon: images.giftIcon,
    title: "Pending gift",
    value: "pendinggift",
  },
  {
    icon: images.giftIcon,
    title: "Ordered gift",
    value: "ordergift",
  },
  {
    icon: images.logout,
    title: "Logout",
    value: "logout",
  },
  {
    icon: images.convertIcon,
    title: "Manage admin page",
    value: "manageadmin",
  },
];

function HeaderMember() {
  const [option, setOption] = useState("");
  const [listUser, setListUser] = useState(LIST_USER);

  const navigate = useNavigate();

  const [userData, setUserData] = useState("");
  let cart = useSelector((state) => state.cart.cartItem);
  // console.log(cart);

  let numberCart = cart.reduce((total, item) => total + item.data.length, 0);

  function clearToken() {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  }

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData.role);
        if (decodedUserData.role === "AD" || decodedUserData.role === "SF") {
          setListUser(LIST_USER);
        } else {
          setListUser(LIST_USER.slice(0, LIST_USER.length - 1));
        }
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleGetOption = (option) => {
    if (option.value === "viewprofile") {
      // navigate(`/profile/${userData.id}`);
      window.location.href = `/profile/${userData.id}`;
    } else if (option.value === "orderhistory") {
      navigate(`/orderhistory`);
    } else if (option.value === "orderpethistory") {
      navigate(`/petorderhistory`);
    } else if (option.value === "managepostuser") {
      navigate(`/managepostuser`);
    } else if (option.value === "manageorderuser") {
      navigate(`/manageorderuser`);
    } else if (option.value === "manageadmin") {
      navigate(`/homeadmin`);
    } else if (option.value === "serviceorderuser") {
      navigate(`/serviceorderuser`);
    } else if (option.value === "pendinggift") {
      navigate(`/pendinggift`);
    } else if (option.value === "managepetorderuser") {
      navigate(`/managepetorderuser`);
    } else if (option.value === "ordergift") {
      navigate(`/ordergift`);
    } else if (option.value === "logout") {
      clearToken();
    }
  };

  return (
    <header className={cx("header")}>
      {/* Header left */}
      <div className={cx("header-left")}>
        <div className={cx("logo")}>
          <img
            src={images.logo}
            alt="Paws and Whiskers"
            className={cx("img-logo")}
          />
          <div className={cx("text-logo")}>
            <span className={cx("paws")}>Paws</span>
            <span className={cx("and")}>and</span>
            <span className={cx("whiskers")}>Whiskers</span>
          </div>
        </div>
        {/* Navbar left */}
        <nav className={cx("navbar")}>
          {/* Nav item */}
          <Link to="/home">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>HOME</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/shop">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>SHOP</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/homeservice">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>SERVICE</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/giftpage">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>GIFTS</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/contactmember">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>CONTACT</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/post">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>POST</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/blog">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>BLOG</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
        </nav>
      </div>
      {/* Header right */}
      <div className={cx("header-right")}>
        <Search className={cx("search")} />

        <Link to="/cart">
          <div className={cx("cart")}>
            <img src={images.iconCart} className={cx("icon-cart")} alt="cart" />
            <span>CART</span>
            <span className={cx("number-cart")}>{numberCart}</span>
          </div>
        </Link>
        {/* <div className={cx("mess")}>
          <img
            src={images.iconMessage}
            className={cx("icon-mess")}
            alt="message"
          />
        </div> */}
        {/* <div className={cx("bell")}>
          <img src={images.iconBell} className={cx("icon-bell")} alt="bell" />
        </div> */}
        <div className={cx("info-name")}>
          <img src={images.optionCat} className={cx("avatar")} alt="avatar" />
          <Tooltip
            title={`${userData.email}`}
            icon={true}
            component={
              <TooltipUser list={listUser} onClick={handleGetOption} />
            }
          />
          {/* <div className={cx("role")}>
            <div
              onClick={clearToken}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src={images.logout} alt="logout" />
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default HeaderMember;
