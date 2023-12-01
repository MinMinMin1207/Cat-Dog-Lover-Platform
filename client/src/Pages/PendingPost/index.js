import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./PendingPost.module.scss";
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

function PendingPost() {
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState(FILTER[0]);

  const [open, setOpen] = useState(false);

  const [noteReject, setNoteReject] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (filter.value !== "product") {
        const res = await axios.get(
          `http://localhost:3000/pets/pending_${filter.value}`
        );
        setList(res.data.data);
        console.log(1);
      } else {
        const res = await axios.get(
          `http://localhost:3000/products/pending_product`
        );
        if (res.data.code === 200) {
          setList(res.data.data);
        } else {
          setList([]);
        }
      }
    }
    fetchData();
  }, [filter]);

  console.log(list);

  const handleClickFilter = (item) => {
    setFilter(item);
  };

  const handleAccept = async (id) => {
    if (filter.value !== "product") {
      const result = await axios.put(`http://localhost:3000/pets/accept_pet`, {
        id: id,
      });
      if (result) {
        console.log("successfully");
        window.location.href = "/acceptedpost";
      } else {
        console.log("err");
      }
    } else {
      const result = await axios.put(
        `http://localhost:3000/products/accept_product`,
        {
          id: id,
        }
      );
      if (result) {
        console.log("successfully");
        window.location.href = "/acceptedpost";
      } else {
        console.log("err");
      }
    }
  };

  const handleReject = async (id) => {
    if (filter.value !== "product") {
      const result = await axios.put(`http://localhost:3000/pets/reject_pet`, {
        id: id,
        note: noteReject,
      });
      if (result) {
        console.log("successfully");
        window.location.href = "/rejectedpost";
      } else {
        console.log("err");
      }
    } else {
      const result = await axios.put(
        `http://localhost:3000/products/reject_product`,
        {
          id: id,
          note: noteReject,
        }
      );
      if (result) {
        console.log("successfully");
        window.location.href = "/rejectedpost";
      } else {
        console.log("err");
      }
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
          <h1 className={cx("heading")}>Pending Post</h1>
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
        {list.length > 0 ? (
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
                      <td className={cx("table-item", "name")}>
                        {item.petName}
                      </td>
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
                      <td className={cx("table-item", "type")}>
                        {item.species}
                      </td>
                    )}
                    {filter.value === "product" && (
                      <td className={cx("table-item", "type")}>Product</td>
                    )}
                    <td className={cx("table-item", "approve")}>
                      <div className={cx("list-approve")}>
                        <Link
                          to={`/productdetail/filter=${filter.link}&&keyword=${item.id}`}
                        >
                          <div className={cx("icon", "view")}>
                            <img
                              src={images.viewIcon}
                              className={cx("img")}
                              alt="icon"
                            />
                          </div>
                        </Link>
                        <div
                          className={cx("icon", "check")}
                          onClick={() => handleAccept(item.id)}
                        >
                          <img
                            src={images.checkMark}
                            className={cx("img")}
                            alt="icon"
                          />
                        </div>
                        <div
                          className={cx("icon", "wrong")}
                          // onClick={() => handleReject(item.id)}
                          onClick={() => handleClickReject(item.id)}
                        >
                          <img
                            src={images.wrongMark}
                            className={cx("img")}
                            alt="icon"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className={cx("toast")}>No Pending post at {filter.value}</h2>
        )}
      </div>
    </div>
  );
}

export default PendingPost;
