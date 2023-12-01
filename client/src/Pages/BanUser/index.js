import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./BanUser.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cx = classNames.bind(styles);

function AvailableUser() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3000/users/ban_user`);
      setList(res.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className={cx("pending-wrapper")}>
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>User ban</h1>
        </div>
        <table className={cx("table")}>
          <thead className={cx("table-header")}>
            <tr>
              <th className={cx("table-item", "ID")}>ID</th>
              <th className={cx("table-item", "fullName")}>Full Name</th>
              <th className={cx("table-item", "userName")}>User Name</th>
              <th className={cx("table-item", "email")}>Email</th>
              <th className={cx("table-item", "dob")}>Date of birth</th>
              <th className={cx("table-item", "status")}>Status</th>
              <th className={cx("table-item", "banUser")}>Reason</th>
            </tr>
          </thead>
          <tbody className={cx("table-body")}>
            {list.map((item, index) => {
              return (
                <tr key={index} className={cx("table-post")}>
                  <td className={cx("table-item", "author")}>{item.id}</td>
                  <td className={cx("table-item", "fullName")}>
                    {item.fullName}
                  </td>
                  <td className={cx("table-item", "userName")}>
                    {item.userName}
                  </td>
                  <td className={cx("table-item", "email")}>{item.email}</td>
                  <td className={cx("table-item", "dob")}>
                    {item.dob || "None"}
                  </td>
                  <td className={cx("table-item", "rejected")}>Ban</td>
                  <td className={cx("table-item", "reason")}>{item.ban}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableUser;
