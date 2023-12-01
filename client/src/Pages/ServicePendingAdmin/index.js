import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./ServicePendingAdmin.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cx = classNames.bind(styles);

function BlogPendingAdmin() {
  const [list, setList] = useState([]);

  const [open, setOpen] = useState(false);

  const [noteReject, setNoteReject] = useState("");

  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:3000/bookings/pending_booking"
        );
        setList(res.data.data);
        if (res.data.code === 200) setIsLoading(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/bookings/accept_booking",
        {
          id: id,
        }
      );
      if (res) {
        console.log("successfully");
        window.location.href = "/serviceacceptadmin";
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/bookings/reject_booking",
        {
          id: id,
          note: noteReject,
        }
      );
      if (res.data.code === 200) {
        console.log("successfully");
        window.location.href = "/servicerejectedadmin";
      }
    } catch (err) {
      console.log(err);
    }
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
    handleReject(id);
    handleClose();
  };

  const handlePreviewBlog = (item) => {
    window.localStorage.setItem(
      "previewBlog",
      JSON.stringify({
        title: item.title,
        image: `http://localhost:3000/${item.image}`,
        text: item.content,
      })
    );
    console.log(item.image);
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
          <h1 className={cx("heading")}>Pending Services</h1>
        </div>
        {list.length > 0 ? (
          <table className={cx("table")}>
            <thead className={cx("table-header")}>
              <tr>
                <th className={cx("table-item", "price")}>Number</th>
                <th className={cx("table-item", "price")}>Service Name</th>
                <th className={cx("table-item", "name")}>Full Name</th>
                <th className={cx("table-item", "price")}>Date</th>
                <th className={cx("table-item", "approve")}>Approve</th>
              </tr>
            </thead>
            <tbody className={cx("table-body")}>
              {/* Row */}
              {list.map((item, index) => {
                return (
                  <tr key={index} className={cx("table-post")}>
                    <td className={cx("table-item")}>{index + 1}</td>
                    <td className={cx("table-item")}>
                      {item.service.serviceName}
                    </td>
                    <td className={cx("table-item")}>{item.fullName}</td>
                    <td className={cx("table-item")}>
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className={cx("table-item", "approve")}>
                      <div className={cx("list-approve")}>
                        <div
                          className={cx("icon", "check")}
                          onClick={() => handleAccept(item.id)}
                        >
                          <img src={images.checkMark} className={cx("img")} />
                        </div>
                        <div
                          className={cx("icon", "wrong")}
                          // onClick={() => handleReject(item.id)}
                          onClick={() => handleClickReject(item.id)}
                        >
                          <img src={images.wrongMark} className={cx("img")} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          // <h2 className={cx("toast")}>No Pending post at {filter.value}</h2>
          <p></p>
        )}
      </div>
    </div>
  );
}

export default BlogPendingAdmin;
