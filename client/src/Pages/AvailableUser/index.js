import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./AvailableUser.module.scss";
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
  const [id, setId] = useState("");

  const [open, setOpen] = useState(false);

  const [noteReject, setNoteReject] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3000/users/available_user`);
      setList(res.data.data);
    }
    fetchData();
  }, []);
  console.log(list);

  const handleReject = () => {
    async function fetchData() {
      const res = await axios.put("http://localhost:3000/users/ban_User", {
        id: id,
        ban: noteReject,
      });
      if (res.data.code === 200) {
        window.location.href = "/banuser";
      }
    }
    fetchData();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNoteReject("");
  };

  const handleClickReject = (id) => {
    handleClickOpen();
    setId(id);
  };

  const handleSubmitForm = () => {
    handleClose();
    handleReject();
  };

  return (
    <div className={cx("pending-wrapper")}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please state the reasons for rejecting the following product from
            the store (specify reasons such as invalid title, non-compliant
            image).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reject"
            type="email"
            fullWidth
            variant="standard"
            value={noteReject}
            onChange={(e) => setNoteReject(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitForm}>Submit</Button>
        </DialogActions>
      </Dialog>

      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>All User</h1>
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
              <th className={cx("table-item", "banUser")}>Ban</th>
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
                  <td className={cx("table-item", "dob")}>{item.dob}</td>
                  <td className={cx("table-item", "available")}>Available</td>
                  <td
                    className={cx("table-item", "ban")}
                    onClick={() => handleClickReject(item.id)}
                  >
                    Ban
                  </td>
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
