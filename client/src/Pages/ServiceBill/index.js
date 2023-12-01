import classNames from "classnames/bind";
import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./ServiceBill.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";

import images from "~/assets/images";

const cx = classNames.bind(styles);

function ServiceBill() {
  const [userData, setUserData] = useState("");
  const checkOut = JSON.parse(window.localStorage.getItem("serviceOrder"));
  const orderID = useRef(checkOut.id);
  const [priceShip, setPriceShip] = useState(0);
  // const [delivery, setDelivery] = useState({data:[delivery]})
  const [bill, setBill] = useState({ data: [] });
  const [order, setOrder] = useState({ paging: [] });
  const [isLoading, setIsLoading] = useState(false);

  const [check, setCheck] = useState(false);

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
      let res = await axios.get(
        `http://localhost:3000/bookings/${orderID.current}`
      );
      console.log(res);
      if (res.data.code === 200) {
        setOrder(res.data);
        setBill(res.data);
        setCheck(true);
      }
      setIsLoading(true);
    }
    fetchData();
  }, []);

  console.log(bill);

  // useEffect(() => {
  //   if (check === true) {
  //     console.log(bill);
  //     console.log(userData.id);
  //     console.log(bill.data.userId); // nguoi mua
  //     console.log(bill.paging[0].product.post.userId); // nguoi ban

  //     if (userData.role === "US") {
  //       if (
  //         userData.id !== bill.data.userId &&
  //         userData.id !== bill.paging[0].product.post.userId
  //       ) {
  //         window.location.href = "/home";
  //       }
  //     }
  //   }
  // }, [check]);

  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>ServiceBill</span>
        </span>
      </div>
      {/* Body */}
      {isLoading === true ? (
        <div className={cx("body")}>
          {/* Header */}
          <div className={cx("header")}>
            <p className={cx("para")}>
              Thank you. Your order has been received.
            </p>
            <div className={cx("info-basic")}>
              <div className={cx("info")}>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Order Number:</h4>
                  <span className={cx("desc")}>{orderID.current}</span>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Order Date:</h4>
                  <span className={cx("desc")}>{bill.data.createdAt}</span>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Order Total:</h4>
                  <span className={cx("desc")}>
                    {" "}
                    <NumericFormat
                      displayType="text"
                      value={bill.data.service.servicePrice}
                      thousandSeparator=","
                    />{" "}
                    VND
                  </span>
                </div>
              </div>
              <div className={cx("info")}>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Full Name:</h4>
                  <span className={cx("desc")}>{bill.data.fullName}</span>
                </div>

                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Phone:</h4>
                  <span className={cx("desc")}>{bill.data.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={cx("content")}>
            <h2 className={cx("heading")}>Order Details</h2>
            {/* Form */}
            <div className={cx("form")}>
              {/* Product Item*/}
              <div className={cx("product-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title", "product-col")}>Service</h3>
                  <h3 className={cx("title", "total-col")}>Total</h3>
                </div>
                <div className={cx("list-product")}>
                  <div className={cx("row", "item")}>
                    <p className={cx("name")}>{bill.data.serviceName}</p>
                    <div className={cx("total", "total-col")}>
                      <span className={cx("price")}>
                        <NumericFormat
                          displayType="text"
                          value={bill.data.service.servicePrice}
                          thousandSeparator=","
                        />
                        <span style={{ marginLeft: 2 }}>VND</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Subtotal Item*/}
              <div className={cx("subtotal-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Subtotal: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>
                      <NumericFormat
                        displayType="text"
                        value={bill.data.service.servicePrice}
                        thousandSeparator=","
                      />{" "}
                      VND
                    </span>
                    <span className={cx("vat")}></span>
                  </div>
                </div>
              </div>

              {/* Payment Item*/}
              <div className={cx("payment-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Payment Method: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>
                      {bill.data.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
              {/* Order Item*/}
              <div className={cx("order-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Order Total: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>
                      <NumericFormat
                        displayType="text"
                        value={bill.data.service.servicePrice}
                        thousandSeparator=","
                      />{" "}
                      VND
                    </span>
                  </div>
                </div>
              </div>
              {/* Note Item*/}
              <div className={cx("note-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Note Total: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("name")}>{bill.data.note}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default ServiceBill;
