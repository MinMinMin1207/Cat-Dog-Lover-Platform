import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./BlogAcceptAdmin.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

function BlogAcceptAdmin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3000/blogs/acception_blog`);
      console.log(res.data.data);
      setList(res.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className={cx("pending-wrapper")}>
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>Accepted Blog</h1>
        </div>
        <table className={cx("table")}>
          <thead className={cx("table-header")}>
            <tr>
              <th className={cx("table-item", "author")}>Number</th>
              <th className={cx("table-item", "name")}>Name</th>
              <th className={cx("table-item", "title")}>Title</th>
              <th className={cx("table-item", "price")}>Date</th>
              <th className={cx("table-item", "approve")}>Status</th>
            </tr>
          </thead>
          {list.length > 0 && (
            <tbody className={cx("table-body")}>
              {/* Row */}
              {list.map((item, index) => {
                return (
                  <tr key={index} className={cx("table-post")}>
                    <td className={cx("table-item")}>{index + 1}</td>
                    <td className={cx("table-item")}>
                      {item.post.user.userName}
                    </td>
                    <td className={cx("table-item")}>{item.title}</td>
                    <td className={cx("table-item")}>
                      {item.createdAt.slice(0, 10)}
                    </td>

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
          )}
        </table>
      </div>
    </div>
  );
}

export default BlogAcceptAdmin;
