import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./RejectedPost.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

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

function RejectedPost() {
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState(FILTER[0]);

  const [open, setOpen] = useState(false);

  const [noteBan, setNoteBan] = useState("");

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  useEffect(() => {
    async function fetchData() {
      if (filter.value !== "product") {
        const res = await axios.get(
          `http://localhost:3000/pets/rejection_${filter.value}`
        );
        console.log(res.data.data);
        setList(res.data.data);
        console.log(1);
      } else {
        const res = await axios.get(
          `http://localhost:3000/products/rejection_product`
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleShowBan = (item) => {
    setNoteBan(item.ban);
    handleClickOpen();
  };

  return (
    <div className={cx("pending-wrapper")}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          The reason the post was rejected
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{noteBan}</Typography>
        </DialogContent>
      </BootstrapDialog>
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>Rejected Post</h1>
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
              <th className={cx("table-item", "approve")}>Reason</th>
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
                    <>
                      <td className={cx("table-item", "rejected")}>Rejected</td>
                      <td
                        className={cx("table-item", "show-ban")}
                        onClick={() => handleShowBan(item)}
                      >
                        <img
                          src={images.showban}
                          alt="show ban"
                          className={cx("icon")}
                        />
                      </td>
                    </>
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

export default RejectedPost;
