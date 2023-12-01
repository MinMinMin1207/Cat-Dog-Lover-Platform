import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./AcceptPost.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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

function AcceptPost() {
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState(FILTER[0]);

  useEffect(() => {
    async function fetchData() {
      if (filter.value !== "product") {
        const res = await axios.get(
          `http://localhost:3000/pets/acception_${filter.value}`
        );
        console.log(res.data.data);
        setList(res.data.data);
        console.log(1);
      } else {
        const res = await axios.get(
          `http://localhost:3000/products/acception_product`
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
    <div className={cx("pending-wrapper")}>
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>Accepted Post</h1>
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
              <th className={cx("table-item", "approve")}>Status</th>
            </tr>
          </thead>
          <tbody className={cx("table-body")}>
            {/* Row */}
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
                  {filter.value !== "product" && (
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

export default AcceptPost;
