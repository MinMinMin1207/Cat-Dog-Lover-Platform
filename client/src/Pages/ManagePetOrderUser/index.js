import classNames from "classnames/bind";
import styles from "./ManagePetOrderUser.module.scss";
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

function ManagePetOrderUser() {
  const [listDone, setListDone] = useState([]);
  const [listPending, setListPending] = useState([]);

  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  const [totalDone, setTotalDone] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = cookie.get("token");
      if (token) {
        const decodedUserData = jwtDecode(token);
        const resPending = await axios.post(
          "http://localhost:3000/orders/manage_pet_order/pending",
          {
            id: decodedUserData.id,
          }
        );
        if (resPending.data.code === 200) {
          console.log(resPending.data);
          let list = [];
          resPending.data.paging.forEach((item, index) => {
            let paging = resPending.data.data.filter(
              (x) => x.id === item.petId
            );
            list.push({
              orderId: item.id,
              status: item.status,
              orderCost: paging[0].petPrice,
              customerNote: paging[0].note,
            });
          });
          setListPending(list);
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
          "http://localhost:3000/orders/manage_pet_order/done",
          {
            id: decodedUserData.id,
          }
        );
        if (resDone.data.code === 200) {
          console.log(resDone.data);
          let list = [];
          resDone.data.paging.forEach((item, index) => {
            let paging = resDone.data.data.filter((x) => x.id === item.petId);
            list.push({
              orderId: item.id,
              status: item.status,
              orderCost: paging[0].petPrice,
              customerNote: item.note,
            });
          });
          let total = list.reduce(
            (accumulator, currentValue) => accumulator + currentValue.orderCost,
            0
          );
          // setListPending(list);
          setTotalDone(total);
          setListDone(list);
        }
        setIsLoadingDone(true);
      }
    }
    fetchData();
  }, []);

  const handleViewOrder = (id) => {
    window.localStorage.setItem("petOrder", JSON.stringify({ id }));
  };

  return (
    <div className={cx("manage-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("manage-hero")}>
        <h2 className={cx("heading")}>MANAGE ORDERS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>ManageShop’Orders</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* List Pending */}
        {isLoadingPending === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Ordering Pets</h2>
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
                        <th className={cx("table-item", "title")}>ORDER ID</th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                        <th className={cx("table-item", "title")}>
                          ORDER COST
                        </th>
                        <th className={cx("table-item", "title")}>
                          CUSTOMER’S NOTE
                        </th>
                        <th className={cx("table-item", "title")}>DETAILS</th>
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
                              {item.orderId}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.status}
                            </td>
                            <td className={cx("table-item", "price")}>
                              <NumericFormat
                                displayType="text"
                                value={item.orderCost}
                                thousandSeparator=","
                              />{" "}
                              VND
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.customerNote !== "" && (
                                <h4 className={cx("username")}>
                                  {item.customerNote}
                                </h4>
                              )}
                              {item.customerNote === "" && (
                                <h4 className={cx("username")}>None</h4>
                              )}
                            </td>
                            <td
                              className={cx("table-item", "detail")}
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
            </div>
          </div>
        )}
        {isLoadingDone === true && (
          <div className={cx("orders")}>
            {/* Header */}
            <header className={cx("header")}>
              <h2 className={cx("title")}>Ordered Pets</h2>
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
                        <th className={cx("table-item", "title")}>ORDER ID</th>
                        <th className={cx("table-item", "title")}>STATUS</th>
                        <th className={cx("table-item", "title")}>
                          ORDER COST
                        </th>
                        <th className={cx("table-item", "title")}>
                          CUSTOMER’S NOTE
                        </th>
                        <th className={cx("table-item", "title")}>DETAILS</th>
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
                              {item.orderId}
                            </td>
                            <td className={cx("table-item", "status")}>
                              {item.status}
                            </td>

                            <td className={cx("table-item", "price")}>
                              <NumericFormat
                                displayType="text"
                                value={(item.orderCost * 97) / 100}
                                thousandSeparator=","
                              />{" "}
                              VND
                            </td>
                            <td className={cx("table-item", "product")}>
                              {item.customerNote !== "" && (
                                <h4 className={cx("username")}>
                                  {item.customerNote}
                                </h4>
                              )}
                              {item.customerNote === "" && (
                                <h4 className={cx("username")}>None</h4>
                              )}
                            </td>
                            <td
                              className={cx("table-item", "detail")}
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
                  <div className={cx("total")}>
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
                  </div>
                </div>
              </div>
              <span className={cx("foot-desc")}>
                This list has been assessed and determined in accordance with
                our terms and services.
              </span>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ManagePetOrderUser;
