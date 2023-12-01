import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./OrderHistory.module.scss";
import images from "~/assets/images";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const cx = classNames.bind(styles);

function Pet_Order_History() {
  const [cash, setCash] = useState([]);
  const [bank, setBank] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:3000/orders/list_pet_order");
      if (res.data.code === 200) {
        let listCash = [];
        let listBank = [];
        res.data.data.forEach((item, index) => {
          // let paging = res.data.filter((x) => x.orderId === item.id);
          // console.log(paging);
          if (item.paymentMethod === "cash") {
            listCash.push({
              orderId: item.id,
              productNames: item.pet.petName,
              price: item.pet.petPrice,
              orderDate: item.createdAt.slice(0, 10),
            });
          } else if (item.paymentMethod === "vnpay") {
            listBank.push({
              orderId: item.id,
              productNames: item.pet.petName,
              price: item.pet.petPrice,
              orderDate: item.createdAt.slice(0, 10),
            });
          }
        });
        setCash(listCash);
        setBank(listBank);
        setIsLoading(true);
      }
    }
    fetchData();
  }, []);

  const handleViewOrder = (id) => {
    window.localStorage.setItem("petOrder", JSON.stringify({ id }));
  };

  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>PET ORDER HISTORY</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>ViewBillHistory</span>
        </span>
      </div>
      {/* Main */}
      {isLoading === true ? (
        <main className={cx("main")}>
          {/* Header */}
          <header className={cx("header")}>
            <h2 className={cx("title")}>Your Order History</h2>
          </header>
          {/* Body */}
          <div className={cx("body")}>
            {/* Cash payment */}
            <div className={cx("cash")}>
              <h3 className={cx("heading")}>Cash payment</h3>
              {/* Content */}
              <div className={cx("content")}>
                {/* Column */}
                <table className={cx("table")}>
                  <thead className={cx("table-header")}>
                    <tr>
                      <th className={cx("table-item", "title")}>NO</th>
                      <th className={cx("table-item", "title")}>PET</th>
                      <th className={cx("table-item", "title")}>PRICE</th>
                      <th className={cx("table-item", "title")}>ORDER DATE</th>
                      <th className={cx("table-item", "title")}>VIEW</th>
                    </tr>
                  </thead>
                  <tbody className={cx("table-body")}>
                    {cash.map((item, index) => {
                      return (
                        <tr key={index} className={cx("row")}>
                          <td className={cx("table-item", "number")}>
                            {index + 1}
                          </td>
                          <td className={cx("table-item", "product")}>
                            <h4 className={cx("username")}>
                              {item.productNames}
                            </h4>
                          </td>

                          <td className={cx("table-item", "price")}>
                            <NumericFormat
                              displayType="text"
                              value={item.price}
                              thousandSeparator=","
                            />{" "}
                            VND
                          </td>
                          <td className={cx("table-item", "date")}>
                            {item.orderDate}
                          </td>
                          <td
                            className={cx("table-item")}
                            onClick={() => handleViewOrder(item.orderId)}
                          >
                            <Link to="/petcheckoutorder">
                              <img src={images.viewIcon} alt="img" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Bank payment */}
            <div className={cx("cash", "bank")}>
              <h3 className={cx("heading")}>Bank payment</h3>
              {/* Content */}
              {bank.length > 0 && (
                <div className={cx("content")}>
                  {/* Column */}
                  <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                      <tr>
                        <th className={cx("table-item", "title")}>NO</th>
                        <th className={cx("table-item", "title")}>PRODUCTS</th>
                        <th className={cx("table-item", "title")}>PRICE</th>
                        <th className={cx("table-item", "title")}>
                          ORDER DATE
                        </th>
                        <th className={cx("table-item", "title")}>VIEW</th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {bank.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "product")}>
                              <h4 className={cx("username")}>
                                {item.productNames}
                              </h4>
                              <div className={cx("product-list")}></div>
                            </td>
                            <td className={cx("table-item", "price")}>
                              <NumericFormat
                                displayType="text"
                                value={item.price}
                                thousandSeparator=","
                              />{" "}
                              VND
                            </td>
                            <td className={cx("table-item", "date")}>
                              {item.orderDate}
                            </td>
                            <td
                              className={cx("table-item")}
                              onClick={() => handleViewOrder(item.orderId)}
                            >
                              <Link to="/petcheckoutorder">
                                <img src={images.viewIcon} alt="img" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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

export default Pet_Order_History;
