import classNames from "classnames/bind";
import styles from "./AllPostAdmin.module.scss";
import axios from "axios";
import images from "~/assets/images";
import { useState, useEffect } from "react";

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

function AllPostAdmin() {
  useEffect(() => {}, []);

  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(FILTER[0]);

  useEffect(() => {
    async function fetchData() {
      if (filter.value !== "product") {
        const res = await axios.get(
          `http://localhost:3000/pets/all_${filter.value}`
        );
        console.log(res.data.data);
        setList(res.data.data);
      } else {
        const res = await axios.get(
          `http://localhost:3000/products/all_product`
        );
        setList(res.data.data);
      }
    }
    fetchData();
  }, [filter]);

  console.log(list);

  const handleClickFilter = (item) => {
    setFilter(item);
  };

  return (
    <div className={cx("allpost-wrapper")}>
      {/* ----------------------------- */}
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>Posts</h1>
          <div className={cx("center")}>
            <span>Filter: </span>
            {FILTER.map((item, index) => (
              <img
                key={index}
                src={item.img}
                alt={item.alt}
                className={cx("img", {
                  active: item.value === filter.value,
                })}
                onClick={() => handleClickFilter(item)}
              />
            ))}
          </div>
        </div>
        <table className={cx("table")}>
          <thead className={cx("table-header")}>
            <tr>
              <th className={cx("table-item", "author")}>Author</th>
              <th className={cx("table-item", "name")}>Name</th>
              <th className={cx("table-item", "price")}>Price</th>
              <th className={cx("table-item", "type")}>Type</th>
              <th className={cx("table-item", "approve")}>Approve</th>
            </tr>
          </thead>
          <tbody className={cx("table-body")}>
            {list.map((item, index) => {
              return (
                <tr key={index} className={cx("table-post")}>
                  <td className={cx("table-item", "author")}>
                    {item.post.user.email}
                  </td>
                  {filter.value !== "product" && (
                    <td className={cx("table-item", "name")}>{item.petName}</td>
                  )}
                  {filter.value === "product" && (
                    <td className={cx("table-item", "name")}>
                      {item.productName}
                    </td>
                  )}
                  {filter.value !== "product" && item.petPrice === 0 && (
                    <td className={cx("table-item", "price")}>Gift</td>
                  )}
                  {filter.value !== "product" && item.petPrice !== 0 && (
                    <td className={cx("table-item", "price")}>
                      {item.petPrice} VND
                    </td>
                  )}
                  {filter.value === "product" && (
                    <td className={cx("table-item", "price")}>
                      {item.price} VND
                    </td>
                  )}

                  {filter.value !== "product" && (
                    <td className={cx("table-item", "type")}>{item.species}</td>
                  )}
                  {filter.value === "product" && (
                    <td className={cx("table-item", "type")}>Product</td>
                  )}
                  {item.status === "accepted" && (
                    <td className={cx("table-item", "accepted")}>Accepted</td>
                  )}
                  {item.status === "pending" && (
                    <td className={cx("table-item", "pending")}>Pending</td>
                  )}
                  {item.status === "rejected" && (
                    <td className={cx("table-item", "rejected")}>Rejected</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPostAdmin;
