import classNames from "classnames/bind";
import styles from "./ServiceOrder.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import images from "~/assets/images";
import { useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { useState } from "react";

const cx = classNames.bind(styles);

function ServiceOrder() {
  const [listDone, setListDone] = useState([]);
  const [listReject, setListReject] = useState([]);
  const [listPending, setListPending] = useState([]);

  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [isLoadingPending, setIsLoadingPending] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);

  const [totalDone, setTotalDone] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = cookie.get("token");
      if (token) {
        const decodedUserData = jwtDecode(token);
        const resPending = await axios.get(
          `http://localhost:3000/bookings/pending_book_user/${decodedUserData.id}`
        );
        console.log(resPending);
        if (resPending.data.code === 200) {
          setListPending(resPending.data.data);
        }
        setIsLoadingPending(true);
      }
    }
    fetchData();
  }, []);

  console.log(listPending);

  useEffect(() => {
    async function fetchData() {
      const token = cookie.get("token");
      if (token) {
        const decodedUserData = jwtDecode(token);
        const resDone = await axios.get(
          `http://localhost:3000/bookings/accept_book_user/${decodedUserData.id}`
        );
        console.log(resDone);
        if (resDone.data.code === 200) {
          setListDone(resDone.data.data);
        }
        setIsLoadingDone(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = cookie.get("token");
      if (token) {
        const decodedUserData = jwtDecode(token);
        const resReject = await axios.get(
          `http://localhost:3000/bookings/reject_book_user/${decodedUserData.id}`
        );
        console.log(resReject);
        if (resReject.data.code === 200) {
          setListReject(resReject.data.data);
        }
        setIsLoadingReject(true);
      }
    }
    fetchData();
  }, []);

  // const handleViewOrder = (id) => {
  //   window.localStorage.setItem("Checkout", JSON.stringify({ id }));
  // };

  const handleViewOrder = (id) => {
    window.localStorage.setItem("serviceOrder", JSON.stringify({ id }));
  };

  return (
    <div className={cx("manage-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("manage-hero")}>
        <h2 className={cx("heading")}>SERVICE ORDERS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Bill orders</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* List Pending */}
        {isLoadingPending === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Service Booking</h2>
            </header>
            {/* Body */}
            <div className={cx("body")}>
              {/* Cash payment */}
              <div className={cx("cash")}>
                {/* Content */}
                <div className={cx("content")}>
                  {/* Column */}
                  <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                      <tr>
                        <th className={cx("table-item", "title")}>NO</th>
                        <th className={cx("table-item", "title")}>
                          SERIVCE NAME
                        </th>
                        <th className={cx("table-item", "title")}>FULLNAME</th>
                        <th className={cx("table-item", "title")}>
                          TIME BOOKING
                        </th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {listPending.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "number")}>
                              {item.serviceName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.fullName}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.createdAt.slice(0, 10)}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.status}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoadingDone === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Service Booked</h2>
            </header>
            {/* Body */}
            <div className={cx("body")}>
              {/* Cash payment */}
              <div className={cx("cash")}>
                {/* Content */}
                <div className={cx("content")}>
                  {/* Column */}
                  <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                      <tr>
                        <th className={cx("table-item", "title")}>NO</th>
                        <th className={cx("table-item", "title")}>
                          SERIVCE NAME
                        </th>
                        <th className={cx("table-item", "title")}>USERNAME</th>
                        <th className={cx("table-item", "title")}>
                          TIME BOOKING
                        </th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                        <th className={cx("table-item", "title")}>BILL</th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {listDone.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "number")}>
                              {item.serviceName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.fullName}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.createdAt.slice(0, 10)}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.status}
                            </td>
                            <td
                              className={cx("table-item", "bill")}
                              onClick={() => handleViewOrder(item.id)}
                            >
                              <Link to="/servicebill">
                                <img src={images.viewIcon} alt="img" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* <div className={cx("total")}>
                    <h4 className={cx("title-price")}>Total: </h4>
                    <div className={cx("price")}>
                      <span className={cx("number")}>
                        <NumericFormat
                          displayType="text"
                          value={(totalDone * 97) / 100}
                          thousandSeparator=","
                        />{" "}
                        VND
                      </span>
                      <span className={cx("desc")}>
                        of total count from first day of store
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <span className={cx("foot-desc")}>
                This list has been assessed and determined in accordance with
                our terms and services.
              </span> */}
            </div>
          </div>
        )}
        {isLoadingReject === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Service Reject</h2>
            </header>
            {/* Body */}
            <div className={cx("body")}>
              {/* Cash payment */}
              <div className={cx("cash")}>
                {/* Content */}
                <div className={cx("content")}>
                  {/* Column */}
                  <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                      <tr>
                        <th className={cx("table-item", "title")}>NO</th>
                        <th className={cx("table-item", "title")}>
                          SERIVCE NAME
                        </th>
                        <th className={cx("table-item", "title")}>USERNAME</th>
                        <th className={cx("table-item", "title")}>
                          TIME BOOKING
                        </th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                        <th className={cx("table-item", "title")}>Reason</th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {listReject.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "number")}>
                              {item.serviceName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.fullName}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.createdAt.slice(0, 10)}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.status}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.ban}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* <div className={cx("total")}>
                    <h4 className={cx("title-price")}>Total: </h4>
                    <div className={cx("price")}>
                      <span className={cx("number")}>
                        <NumericFormat
                          displayType="text"
                          value={(totalDone * 97) / 100}
                          thousandSeparator=","
                        />{" "}
                        VND
                      </span>
                      <span className={cx("desc")}>
                        of total count from first day of store
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <span className={cx("foot-desc")}>
                This list has been assessed and determined in accordance with
                our terms and services.
              </span> */}
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ServiceOrder;
