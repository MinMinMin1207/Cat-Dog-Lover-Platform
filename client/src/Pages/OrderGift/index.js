import classNames from "classnames/bind";
import styles from "./OrderGift.module.scss";
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

function OrderGift() {
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
        const resPending = await axios.post(
          `http://localhost:3000/gifts/pending_gift`,
          {
            id: decodedUserData.id,
          }
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
        const resDone = await axios.post(
          `http://localhost:3000/gifts/accepted_gift`,
          {
            id: decodedUserData.id,
          }
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
        const resReject = await axios.post(
          `http://localhost:3000/gifts/rejected_gift`,
          {
            id: decodedUserData.id,
          }
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

  // const handleViewOrder = (id) => {
  //   window.localStorage.setItem("serviceOrder", JSON.stringify({ id }));
  // };

  const handleBuy = async (item) => {
    // to="/petcheckout"
    try {
      const res = await axios.get(`http://localhost:3000/pets/${item.petId}`);
      console.log(res);
      if (res.data.code === 200) {
        let form = {
          data: {
            quantity: 1,
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
        };
        window.localStorage.setItem("Pet", JSON.stringify(form));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx("manage-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("manage-hero")}>
        <h2 className={cx("heading")}>GIFT ORDERS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Gift orders</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* List Pending */}
        {isLoadingPending === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Gift Ordering</h2>
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
                        <th className={cx("table-item", "title")}>PET NAME</th>
                        <th className={cx("table-item", "title")}>BREED</th>
                        <th className={cx("table-item", "title")}>REASON</th>
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
                            <td className={cx("table-item", "status")}>
                              {item.pet.petName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.pet.breed}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.note}
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
              <h2 className={cx("title")}>Gift Ordered</h2>
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
                        <th className={cx("table-item", "title")}>PET NAME</th>
                        <th className={cx("table-item", "title")}>BREED</th>
                        <th className={cx("table-item", "title")}>REASON</th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                        <th className={cx("table-item", "title")}>
                          PLACEORDER
                        </th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {listDone.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.pet.petName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.pet.breed}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.note}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.status}
                            </td>
                            <td className={cx("table-item", "product")}>
                              <Link to="/petcheckout">
                                <div onClick={() => handleBuy(item)}>
                                  <img src={images.viewIcon} alt="img" />
                                </div>
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
              <h2 className={cx("title")}>Gift Rejected</h2>
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
                        <th className={cx("table-item", "title")}>PET NAME</th>
                        <th className={cx("table-item", "title")}>BREED</th>
                        <th className={cx("table-item", "title")}>REASON</th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                      {listReject.map((item, index) => {
                        return (
                          <tr key={index} className={cx("row")}>
                            <td className={cx("table-item", "number")}>
                              {index + 1}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.pet.petName}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.pet.breed}
                            </td>
                            <td className={cx("table-item", "price")}>
                              {item.note}
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.status}
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

export default OrderGift;
