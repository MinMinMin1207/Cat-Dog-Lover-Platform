import classNames from "classnames/bind";
import styles from "./Product.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartHide } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartShow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Check from "~/components/Popup/Check";
import Wrong from "~/components/Popup/Wrong";
import { addToCart } from "../../Redux/cartSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

function Product() {
  let params = useParams();
  const [userData, setUserData] = useState({});
  const [follow, setFollow] = useState(false);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({
    data: { quantity: 1 },
    user: {
      userId: "",
    },
  });
  const [showCart, setShowCart] = useState(""); // Show popup add to cart
  const [showWrong, setWrong] = useState(""); // Show popup Wrong to cart
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // fetchData
  useEffect(() => {
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
      }
    } catch (err) {
      console.log(err);
    }

    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/products/${params.id}`);
      if (res.data.code === 200) {
        setProduct(res.data.data);
        setCart({
          data: {
            ...cart.data,
            id: res.data.data.id,
            img: `http://localhost:3000/${res.data.data.image}`,
            title: res.data.data.productName,
            price: res.data.data.price,
            desc: res.data.data.post.content,
            cartQty: res.data.data.quantity,
            size: res.data.data.size,
          },
          user: {
            userId: res.data.data.post.userId,
            userName: res.data.data.post.user.userName,
          },
        });
      }
      setIsLoading(true);
    }
    fetchData();
  }, []);

  console.log(product.expiredDate);

  useEffect(() => {
    if (isLoading === true) {
      if (userData.id !== product.post.userId && product.status !== "accepted")
        window.location.href = "/home";
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWrong(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showWrong]);

  const handleFollow = () => {
    setFollow(!follow);
  };

  const handleDecrease = () => {
    if (cart.data.quantity - 1 > 0)
      setCart((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            quantity: prev.data.quantity - 1,
          },
        };
      });
  };

  const handleIncrease = () => {
    if (cart.data.quantity + 1 <= product.quantity)
      setCart((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            quantity: prev.data.quantity + 1,
          },
        };
      });
  };

  const handleAddtoCart = () => {
    let cartItem = JSON.parse(window.localStorage.getItem("cartItem"));
    if (cartItem !== null && cartItem.length > 0) {
      let quantityCart = cartItem.map((item) =>
        item.data.filter((x) => x.id === cart.data.id)
      );
      if (quantityCart[0].length > 0) {
        if (
          quantityCart[0][0].quantity + cart.data.quantity <=
          product.quantity
        ) {
          dispatch(addToCart(cart));
          setShowCart(true);
        } else {
          setWrong(true);
        }
      } else {
        dispatch(addToCart(cart));
        setShowCart(true);
      }
    } else {
      dispatch(addToCart(cart));
      setShowCart(true);
    }
  };

  function convertDigitIn(str) {
    return str.split("-").reverse().join("-");
  }

  return (
    <div className={cx("product-wrapper")}>
      <Check
        title="The product has been added to the cart"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      <Wrong
        title="You already have enough quantity product in your cart "
        className={cx({
          "show-cart": showWrong === true,
        })}
      />
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("product-hero")}>
        <h2 className={cx("heading")}>PRODUCT DETAILS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Shopping</span>
        </span>
      </div>
      {/* Main */}
      {isLoading === true ? (
        <main className={cx("main")}>
          {/* Product */}
          <div className={cx("product")}>
            <div className={cx("images-product")}>
              <img
                src={`http://localhost:3000/${product.image}`}
                alt="Images"
                className={cx("img")}
              />
            </div>
            <div className={cx("property-product")}>
              <div>
                <h2 className={cx("name-product")}>{product.productName}</h2>
                <span className={cx("author")}>
                  by
                  <span className={cx("name")}>
                    {cart.user && cart.user.userName}
                  </span>
                </span>
              </div>
              <span className={cx("price")}>
                <NumericFormat
                  displayType="text"
                  value={product.price}
                  thousandSeparator=","
                />
                <span style={{ marginLeft: 5 }}>VND</span>
              </span>
              <div className={cx("availability")}>
                <span className={cx("title")}>Availability: </span>
                <span className={cx("number")}>
                  {product.quantity} Left in Stock
                </span>
              </div>
              {/* Desc */}
              <p className={cx("desc")}>{cart.data.desc}</p>
              {/* Size */}
              <div className={cx("size")}>
                {product.size === "L" && product.size === "S" && product.size === "M" && (
                  <>
                  <span className={cx("title")}>Size: </span>
                  <span className={cx("number-size")}>{product.size}</span>
                  </>
                )}
                
                {product.size !== "L" && product.size !== "S" && product.size !== "M" && (
                  <>
                  <span className={cx("title")}>Weight: </span>
                  {product.size} kg
                  </>
                )}
              </div>
              {/* Expire */}
              <div className={cx("expired")}>
                <span className={cx("title")}>Expired date: </span>
                {product.expiredDate !== null && (
                  <span className={cx("number-size")}>
                    {convertDigitIn(product.expiredDate)}
                  </span>
                )}
                {product.expiredDate === null && (
                  <span className={cx("number-size")}>None</span>
                )}
              </div>

              {/* Qty */}
              {userData.id !== cart.user.userId && (
                <div className={cx("qty")}>
                  <span className={cx("title")}>Qty: </span>
                  <div className={cx("box-qty")}>
                    <span className={cx("minus")} onClick={handleDecrease}>
                      -
                    </span>
                    <span className={cx("number")}>{cart.data.quantity}</span>
                    <span className={cx("plus")} onClick={handleIncrease}>
                      +
                    </span>
                  </div>
                </div>
              )}
              {userData.id !== cart.user.userId &&
                product.quantity !== 0 &&
                product.status === "accepted" && (
                  <>
                    {/* Add to cart */}
                    <div className={cx("action-cart")}>
                      <div className={cx("cart")} onClick={handleAddtoCart}>
                        ADD TO CART
                      </div>
                      <div className={cx("follow")} onClick={handleFollow}>
                        <FontAwesomeIcon
                          icon={faHeartHide}
                          className={cx("icon", {
                            hide: follow === false,
                          })}
                        />
                        <FontAwesomeIcon
                          icon={faHeartShow}
                          className={cx("icon", {
                            show: follow === true,
                          })}
                        />
                      </div>
                    </div>
                    {/* Add to cart */}
                    {/* <div className={cx("action-buy")}>
                  <div className={cx("buy")}>BUY IT NOW</div>
                </div> */}
                  </>
                )}
              {userData.id === cart.user.userId &&
                product.quantity !== 0 &&
                product.status === "accepted" && (
                  <>
                    {/* Add to cart */}
                    <div className={cx("action-cart")}>
                      <Link to={`/updateproduct/${cart.data.id}`}>
                        <div className={cx("cart")}>UPDATE INFO</div>
                      </Link>
                      <div className={cx("follow")} onClick={handleFollow}>
                        <FontAwesomeIcon
                          icon={faHeartHide}
                          className={cx("icon", {
                            hide: follow === false,
                          })}
                        />
                        <FontAwesomeIcon
                          icon={faHeartShow}
                          className={cx("icon", {
                            show: follow === true,
                          })}
                        />
                      </div>
                    </div>
                    {/* Add to cart */}
                    {/* <div className={cx("action-buy")}>
                  <div className={cx("buy")}>SET UNAVAILABLE</div>
                </div> */}
                  </>
                )}
              {product.quantity === 0 && product.status === "accepted" && (
                <>
                  <div className={cx("action-cart")}>
                    <div className={cx("ivdcart")}>ADD TO CART</div>
                    <div className={cx("follow")} onClick={handleFollow}>
                      <FontAwesomeIcon
                        icon={faHeartHide}
                        className={cx("icon", {
                          hide: follow === false,
                        })}
                      />
                      <FontAwesomeIcon
                        icon={faHeartShow}
                        className={cx("icon", {
                          show: follow === true,
                        })}
                      />
                    </div>
                  </div>
                </>
              )}
              {userData.id === cart.user.userId && (
                <>
                  <div className={cx("action-cart")}>
                    <div className={cx("action-status")}>
                      <span className={cx("title")}>Status: </span>
                      {product.status === "pending" && (
                        <div className={cx("status", "pending")}>Pending</div>
                      )}
                      {product.status === "rejected" && (
                        <div className={cx("status", "rejected")}>Rejected</div>
                      )}
                    </div>
                    {product.status === "rejected" && (
                      <div className={cx("action-status")}>
                        <span className={cx("title")}>Reason: </span>
                        <p className={cx("desc")}>{product.ban}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      ) : (
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Product;
