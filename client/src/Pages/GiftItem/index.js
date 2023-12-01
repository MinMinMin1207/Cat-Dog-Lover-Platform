import classNames from "classnames/bind";
import styles from "./GiftItem.module.scss";

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
import { addToCart } from "../../Redux/cartSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cx = classNames.bind(styles);

function GiftItem() {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  let params = useParams();
  const [userData, setUserData] = useState("");
  const [follow, setFollow] = useState(false);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({
    data: { quantity: 1 },
    user: {
      userId: "",
    },
  });
  const [showCart, setShowCart] = useState(false); // Show popup add to cart
  const [reason, setReason] = useState("");
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
      let res = await axios.get(`http://localhost:3000/pets/${params.id}`);
      if (res.data.code === 200) {
        setProduct(res.data.data);
        setCart({
          data: {
            ...cart.data,
            id: res.data.data.id,
            img: `http://localhost:3000/${res.data.data.image}`,
            title: res.data.data.petName,
            price: res.data.data.petPrice,
            desc: res.data.data.post.content,
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

  const handleFollow = () => {
    setFollow(!follow);
  };

  const handleBuy = async () => {
    const res = await axios.post("http://localhost:3000/orders/giftOrder", {
      petId: product.id,
      note: reason,
    });
    if (res.data.code === 200) {
      setOpen(false);
      setShowCart(true);
      setTimeout(() => {
        window.location.href = "/giftpage";
      }, 3250);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={cx("product-wrapper")}>
      <Check
        title="You have successfully added a pet to the queue!"
        className={cx({
          "show-cart": showCart === true,
        })}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Gift</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It's a lovely Dog/Cat , Why do you want to adopt? Please tell me !!!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="FullName"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBuy}>Adopt</Button>
        </DialogActions>
      </Dialog>

      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("product-hero")}>
        <h2 className={cx("heading")}>GIFT DETAILS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Gift</span>
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
                <h2 className={cx("name-product")}>{product.petName}</h2>
                <span className={cx("author")}>
                  uploaded by
                  <span className={cx("name")}>
                    {cart.user && cart.user.userName}
                  </span>
                </span>
              </div>
              {product.petPrice > 0 && (
                <span className={cx("price")}>
                  <NumericFormat
                    displayType="text"
                    value={product.petPrice}
                    thousandSeparator=","
                  />
                  <span style={{ marginLeft: 5 }}>VND</span>
                </span>
              )}
              {/* <span className={cx("")}></span> */}
              <div className={cx("availability")}>
                <span className={cx("title")}>Breed: {product.breed}</span>
                <span className={cx("number")}></span>
              </div>
              <div className={cx("availability")}>
                <span className={cx("title")}>Species: {product.species}</span>
                <span className={cx("number")}></span>
              </div>
              {/* Desc */}
              <p className={cx("desc")}>{cart.data.desc}</p>
              {/* Size */}
              <div className={cx("size")}>
                <span className={cx("title")}>Age: </span>
                <span className={cx("number-size")}>
                  {product.age} years old
                </span>
              </div>
              {/* Qty */}
              {userData.id !== cart.user.userId && (
                <>
                  {/* Add to cart */}
                  <div className={cx("action-cart")}>
                    {/* <div className={cx("cart")} onClick={handleAddtoCart}>
                        ADD TO CART
                      </div> */}
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
                  <div className={cx("action-buy")} onClick={handleClickOpen}>
                    <div className={cx("buy")}>GRAB IT NOW</div>
                  </div>
                </>
              )}
              {userData.id === cart.user.userId &&
                product.status === "accepted" && (
                  <>
                    {/* Add to cart */}
                    <div className={cx("action-cart")}>
                      <Link to={`/updatepet/${cart.data.id}`}>
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
                    <div className={cx("action-buy")}>
                      <div className={cx("buy")}>SET UNAVAILABLE</div>
                    </div>
                  </>
                )}
              {userData.id === cart.user.userId && (
                <>
                  <div className={cx("action-cart")}>
                    <div className={cx("action-status")}>
                      {product.status === "pending" && (
                        <>
                          <span className={cx("title")}>Status: </span>
                          <div className={cx("status", "pending")}>Pending</div>
                        </>
                      )}
                      {product.status === "rejected" && (
                        <>
                          <span className={cx("title")}>Status: </span>
                          <div className={cx("status", "rejected")}>
                            Rejected
                          </div>
                        </>
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

export default GiftItem;
