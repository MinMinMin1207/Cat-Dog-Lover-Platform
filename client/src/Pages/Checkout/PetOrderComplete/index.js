import classNames from "classnames/bind";
import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./OrderComplete.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { NumericFormat } from "react-number-format";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";

import images from "~/assets/images";

const cx = classNames.bind(styles);

const STATUS_DELIVERY = [
  {
    id: 0,
    value: "pending",
    title: "Pending",
    img: images.deliveryshop,
  },
  {
    id: 1,
    value: "packaged",
    title: "Packaged",
    img: images.deliverypackage,
  },
  {
    id: 2,
    value: "delivered",
    title: "Delivered",
    img: images.deliveryship,
  },
  {
    id: 3,
    value: "done",
    title: "Received",
    img: images.deliveryget,
  },
];

function OrderDetails() {
  const [userData, setUserData] = useState("");

  const checkOut = JSON.parse(window.localStorage.getItem("petOrder"));
  const orderID = useRef(checkOut.id);
  const [priceShip, setPriceShip] = useState(0);
  // const [delivery, setDelivery] = useState({data:[delivery]})
  const [bill, setBill] = useState([]);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [statusDeli, setStatusDeli] = useState(STATUS_DELIVERY[0]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        `http://localhost:3000/orders/petOrder/${orderID.current}`
      );
      if (res.data.code === 200) {
        setIsLoading(true);
        setOrder(res.data.paging);
        setBill(res.data.data);
        setPriceShip(res.data.data.ship);
        setCheck(true);
        setStatusDeli(
          ...STATUS_DELIVERY.filter(
            (item) => item.value === res.data.data.status
          )
        );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (check === true) {
      console.log(userData.id);
      console.log(order.userId); // nguoi mua
      console.log(bill.pet.post.userId); // thang ban'

      if (userData.role === "US") {
        if (
          userData.id !== order.userId &&
          userData.id !== bill.pet.post.userId
        ) {
          window.location.href = "/home";
        }
      }
    }
  }, [check]);

  useEffect(() => {}, [statusDeli]);

  const handleClickDelivery = async (item) => {
    if (userData.role === "US" && userData.id === bill.pet.post.userId) {
      if (bill.status === "pending" && item.value === "packaged") {
        setStatusDeli(item);
        await axios.put("http://localhost:3000/orders/pakaged_order", {
          id: bill.id,
        });
      } else if (bill.status === "packaged" && item.value === "delivered") {
        setStatusDeli(item);
        await axios.put("http://localhost:3000/orders/delivered_order", {
          id: bill.id,
        });
      }
    } else if (
      userData.role === "US" &&
      userData.id === order.userId &&
      bill.status === "delivered" &&
      item.value === "done"
    ) {
      setStatusDeli(item);
      await axios.put("http://localhost:3000/orders/done_order", {
        id: bill.id,
      });
    }
  };

  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>OrderComplete</span>
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
                  <span className={cx("desc")}>{order.createdAt}</span>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Order Total:</h4>
                  <div className={cx("desc")}>
                    <NumericFormat
                      displayType="text"
                      value={
                        bill.pet.petPrice +
                        priceShip +
                        (bill.pet.petPrice * 3) / 100
                      }
                      thousandSeparator=","
                    />
                    <span style={{ marginLeft: 2 }}>VND</span>
                  </div>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Payment Method:</h4>
                  <span className={cx("desc")}>{bill.paymentMethod}</span>
                </div>
              </div>
              <div className={cx("info")}>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Receiver Name:</h4>
                  <span className={cx("desc")}>
                    {order.receiverName && order.receiverName}
                  </span>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Receiver Phone:</h4>
                  <span className={cx("desc")}>
                    0{order.receiverPhone && order.receiverPhone}
                  </span>
                </div>
                {/* Order */}
                <div className={cx("order", "number")}>
                  <h4 className={cx("title")}>Receiver Address:</h4>
                  <span className={cx("desc")}>
                    {order.receiverAddress && order.receiverAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className={cx("delivery")}>
            <h2 className={cx("heading")}>Delivery Details</h2>
            <div className={cx("list-delivery")}>
              {STATUS_DELIVERY.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cx("status", {
                      active: statusDeli.id >= index,
                    })}
                    onClick={() => handleClickDelivery(item)}
                  >
                    <>
                      <img
                        src={item.img}
                        className={cx("img")}
                        alt={item.value}
                      />
                      <div
                        className={cx("desc", {
                          active: index - 1 === statusDeli.id,
                        })}
                      >
                        {item.title}
                      </div>
                    </>
                  </div>
                );
              })}
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
                  <h3 className={cx("title", "product-col")}>Pet</h3>
                  <h3 className={cx("title", "total-col")}>Total</h3>
                </div>
                <div className={cx("list-product")}>
                  <div className={cx("row", "item")}>
                    <p className={cx("name")}>{bill.pet.petName}</p>
                    <div className={cx("total", "total-col")}>
                      <span className={cx("price")}>
                        <NumericFormat
                          displayType="text"
                          value={bill.pet.petPrice}
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
                        value={bill.pet.petPrice}
                        thousandSeparator=","
                      />
                      <span style={{ marginLeft: 2 }}>VND</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Shipping Item*/}
              <div className={cx("subtotal-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Shipping: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>
                      <NumericFormat
                        displayType="text"
                        value={priceShip}
                        thousandSeparator=","
                      />{" "}
                      <span style={{ marginLeft: 1 }}>VND</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* VAT Item*/}
              <div className={cx("vat-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>VAT: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>
                      <NumericFormat
                        displayType="text"
                        value={(bill.pet.petPrice * 3) / 100}
                        thousandSeparator=","
                      />
                      <span style={{ marginLeft: 3 }}>VND</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Payment Item*/}
              <div className={cx("payment-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Payment Method: </h3>
                  <div className={cx("tota  l", "total-col")}>
                    <span className={cx("price")}>{bill.paymentMethod}</span>
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
                        value={
                          bill.pet.petPrice +
                          priceShip +
                          (bill.pet.petPrice * 3) / 100
                        }
                        thousandSeparator=","
                      />
                      <span style={{ marginLeft: 3 }}>VND</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Note Item*/}
              <div className={cx("note-item")}>
                <div className={cx("row")}>
                  <h3 className={cx("title")}>Note Total: </h3>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("name")}>{bill.note}</span>
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

export default OrderDetails;
