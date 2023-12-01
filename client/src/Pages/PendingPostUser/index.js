import classNames from "classnames/bind";
import styles from "./PendingPostUser.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import images from "~/assets/images";
import { NumericFormat } from "react-number-format";
import { useEffect, useState, useRef } from "react";
import cookie from "js-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const FILTER = [
  {
    img: images.filterProduct,
    alt: "Product",
    value: "product",
    link: "product",
  },
  {
    img: images.filterCat,
    alt: "Cat",
    value: "cat",
    link: "pet",
  },
  {
    img: images.filterDog,
    alt: "Dog",
    value: "dog",
    link: "pet",
  },
];

function PedingPostUser() {
  const [listPeding, setListPeding] = useState([]);
  const [listAccepted, setListAccepted] = useState([]);
  const [listRejected, setListRejected] = useState([]);

  const [filterPending, setFilterPeding] = useState(FILTER[0]);
  const [filterAccepted, setFilterAccepted] = useState(FILTER[0]);
  const [filterRejected, setFilterRejected] = useState(FILTER[0]);

  const [isLoadingPeding, setIsLoadingPending] = useState(false);
  const [isLoadingAccepted, setIsLoadingAccepted] = useState(false);
  const [isLoadingRejected, setIsLoadingRejected] = useState(false);

  useEffect(() => {
    try {
      const token = cookie.get("token");
      console.log(token);
      async function fetchData() {
        if (token) {
          const decodedUserData = jwtDecode(token);
          if (filterPending.value === "product") {
            const resPending = await axios.post(
              `http://localhost:3000/products/pending/manage_product`,
              { id: decodedUserData.id }
            );
            if (resPending.data.code === 200) {
              setListPeding(resPending.data.data);
              setIsLoadingPending(true);
            }
          } else if (filterPending.value === "cat") {
            const resPending = await axios.post(
              `http://localhost:3000/pets/pending/manage_cat`,
              { id: decodedUserData.id }
            );
            if (resPending.data.code === 200) {
              setListPeding(resPending.data.data);
              setIsLoadingPending(true);
            }
          } else if (filterPending.value === "dog") {
            const resPending = await axios.post(
              `http://localhost:3000/pets/pending/manage_dog`,
              { id: decodedUserData.id }
            );
            if (resPending.data.code === 200) {
              setListPeding(resPending.data.data);
              setIsLoadingPending(true);
            }
          }
        }
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [filterPending]);

  useEffect(() => {
    try {
      const token = cookie.get("token");
      console.log(token);
      async function fetchData() {
        if (token) {
          const decodedUserData = jwtDecode(token);
          if (filterAccepted.value === "product") {
            const resAccepted = await axios.post(
              `http://localhost:3000/products/accepted/manage_product`,
              { id: decodedUserData.id }
            );
            if (resAccepted.data.code === 200) {
              setListAccepted(resAccepted.data.data);
              setIsLoadingAccepted(true);
            }
          } else if (filterAccepted.value === "cat") {
            const resAccepted = await axios.post(
              `http://localhost:3000/pets/accepted/manage_cat`,
              { id: decodedUserData.id }
            );
            if (resAccepted.data.code === 200) {
              setListAccepted(resAccepted.data.data);
              setIsLoadingAccepted(true);
            }
          } else if (filterAccepted.value === "dog") {
            const resAccepted = await axios.post(
              `http://localhost:3000/pets/accepted/manage_dog`,
              { id: decodedUserData.id }
            );
            if (resAccepted.data.code === 200) {
              setListAccepted(resAccepted.data.data);
              setIsLoadingAccepted(true);
            }
          }
        }
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [filterAccepted]);

  useEffect(() => {
    try {
      const token = cookie.get("token");
      console.log(token);
      async function fetchData() {
        if (token) {
          const decodedUserData = jwtDecode(token);
          if (filterRejected.value === "product") {
            const resRejected = await axios.post(
              `http://localhost:3000/products/rejected/manage_product`,
              { id: decodedUserData.id }
            );
            if (resRejected.data.code === 200) {
              setListRejected(resRejected.data.data);
              setIsLoadingRejected(true);
            }
          } else if (filterRejected.value === "cat") {
            const resRejected = await axios.post(
              `http://localhost:3000/pets/rejected/manage_cat`,
              { id: decodedUserData.id }
            );
            if (resRejected.data.code === 200) {
              setListRejected(resRejected.data.data);
              setIsLoadingRejected(true);
            }
          } else if (filterRejected.value === "dog") {
            const resRejected = await axios.post(
              `http://localhost:3000/pets/rejected/manage_dog`,
              { id: decodedUserData.id }
            );
            if (resRejected.data.code === 200) {
              setListRejected(resRejected.data.data);
              setIsLoadingRejected(true);
            }
          }
        }
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [filterRejected]);

  const handleClickFilterPending = (item) => {
    setFilterPeding(item);
    setIsLoadingPending(false);
  };

  const handleClickFilterAccpeted = (item) => {
    setFilterAccepted(item);
    setIsLoadingAccepted(false);
  };

  const handleClickFilterRejected = (item) => {
    setFilterRejected(item);
    setIsLoadingRejected(false);
  };

  console.log(listRejected);

  return (
    <div className={cx("pending-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("pending-hero")}>
        <header className={cx("header")}>
          <h2 className={cx("heading")}>MANAGE POST</h2>
        </header>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>ManagePost</span>
        </span>
      </div>
      {/* Main  */}
      <main className={cx("main")}>
        <header className={cx("header")}>
          <h3 className={cx("heading")}>All Of Your Posts !</h3>
        </header>
        {/* body */}
        <div className={cx("body")}>
          {/* Pending */}
          <div className={cx("cash")}>
            <div className={cx("row-header")}>
              <h3 className={cx("heading")}>PENDING POSTS</h3>
              <div className={cx("filter")}>
                <span>Filter: </span>
                {FILTER.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt={item.alt}
                    className={cx("img", {
                      active: item.value === filterPending.value,
                    })}
                    onClick={() => {
                      handleClickFilterPending(item);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className={cx("content")}>
              {/* Column */}
              <div className={cx("list-gift")}>
                <table className={cx("table")}>
                  <thead className={cx("table-header")}>
                    <tr>
                      <th className={cx("table-item", "title")}>NO</th>
                      <th className={cx("table-item", "title")}>NAME</th>
                      <th className={cx("table-item", "title")}>PRICE</th>
                      <th className={cx("table-item", "title")}>TYPE</th>
                      <th className={cx("table-item", "title")}>SEE MORE</th>
                    </tr>
                  </thead>
                  {isLoadingPeding === true && (
                    <tbody className={cx("table-body")}>
                      {filterPending.value === "product" ? (
                        <>
                          {listPeding.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.product.productName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.product.price}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  Stuff
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/product/${item.product.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {listPeding.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.pet.petName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.pet.petPrice}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  {item.pet.species}
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/pet/${item.pet.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* ======================= */}
        {/* body */}
        <div className={cx("body")}>
          {/* Accpeted */}
          <div className={cx("cash")}>
            <div className={cx("row-header")}>
              <h3 className={cx("heading")}>ACCPETED POSTS</h3>
              <div className={cx("filter")}>
                <span>Filter: </span>
                {FILTER.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt={item.alt}
                    className={cx("img", {
                      active: item.value === filterAccepted.value,
                    })}
                    onClick={() => {
                      handleClickFilterAccpeted(item);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className={cx("content")}>
              {/* Column */}
              <div className={cx("list-gift")}>
                <table className={cx("table")}>
                  <thead className={cx("table-header")}>
                    <tr>
                      <th className={cx("table-item", "title")}>NO</th>
                      <th className={cx("table-item", "title")}>NAME</th>
                      <th className={cx("table-item", "title")}>PRICE</th>
                      <th className={cx("table-item", "title")}>TYPE</th>
                      <th className={cx("table-item", "title")}>SEE MORE</th>
                    </tr>
                  </thead>
                  {isLoadingAccepted === true && (
                    <tbody className={cx("table-body")}>
                      {filterAccepted.value === "product" ? (
                        <>
                          {listAccepted.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.product.productName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.product.price}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  Stuff
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/product/${item.product.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {listAccepted.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.pet.petName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.pet.petPrice}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  {item.pet.species}
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/pet/${item.pet.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* ======================= */}
        {/* body */}
        <div className={cx("body")}>
          {/* Accpeted */}
          <div className={cx("cash")}>
            <div className={cx("row-header")}>
              <h3 className={cx("heading")}>REJECTED POSTS</h3>
              <div className={cx("filter")}>
                <span>Filter: </span>
                {FILTER.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt={item.alt}
                    className={cx("img", {
                      active: item.value === filterRejected.value,
                    })}
                    onClick={() => {
                      handleClickFilterRejected(item);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className={cx("content")}>
              {/* Column */}
              <div className={cx("list-gift")}>
                <table className={cx("table")}>
                  <thead className={cx("table-header")}>
                    <tr>
                      <th className={cx("table-item", "title")}>NO</th>
                      <th className={cx("table-item", "title")}>NAME</th>
                      <th className={cx("table-item", "title")}>PRICE</th>
                      <th className={cx("table-item", "title")}>TYPE</th>
                      <th className={cx("table-item", "title")}>SEE MORE</th>
                    </tr>
                  </thead>
                  {isLoadingRejected === true && (
                    <tbody className={cx("table-body")}>
                      {filterRejected.value === "product" ? (
                        <>
                          {listRejected.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.product.productName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.product.price}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  Stuff
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/product/${item.product.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {listRejected.map((item, index) => {
                            return (
                              <tr key={index} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {index + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {item.pet.petName}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "price"
                                  )}
                                >
                                  <NumericFormat
                                    displayType="text"
                                    value={item.pet.petPrice}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </td>
                                <td className={cx("table-item", "type")}>
                                  {item.pet.species}
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <Link to={`/pet/${item.pet.id}`}>
                                    <img src={images.viewIcon} alt="img" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PedingPostUser;
