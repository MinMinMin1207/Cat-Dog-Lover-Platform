import classNames from "classnames/bind";
import styles from "./ProductDetailAdmin.module.scss";
import images from "~/assets/images";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cx = classNames.bind(styles);

function ProductDetail() {
  const params = useParams();
  let value = params.id;

  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [noteReject, setNoteReject] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    let split = value.split("&&");
    if (split.length === 2) {
      let tmpFilter = split[0].split("=")[1];
      let tmpKeyword = split[1].split("=")[1];
      setFilter(tmpFilter);
      setKeyword(tmpKeyword);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (filter === "product") {
        let res = await axios.get(
          `http://localhost:3000/products/admin/${keyword}`
        );
        if (res.data.code === 200) {
          setData({
            price: res.data.data.price,
            username: res.data.data.post.user.userName,
            titleName: res.data.data.productName,
            quantity: res.data.data.quantity,
            size: res.data.data.size,
            image: `http://localhost:3000/${res.data.data.image}`,
            content: res.data.data.post.content,
          });
        }
      } else if (filter === "pet") {
        let res = await axios.get(
          `http://localhost:3000/pets/admin/${keyword}`
        );
        if (res.data.code === 200) {
          console.log(res);
          setData({
            price: res.data.data.petPrice,
            username: res.data.data.post.user.userName,
            titleName: res.data.data.petName,
            quantity: 1,
            image: `http://localhost:3000/${res.data.data.image}`,
            content: res.data.data.post.content,
          });
        }
      }
    }
    fetchData();
  }, [keyword]);

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
    <div className={cx("product-wrapper")}>
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
      <h1 className={cx("heading")}>
        {filter === "product"
          ? "Product detail"
          : filter === "cat"
          ? "Cat detail"
          : "Dog detail"}
      </h1>
      <main className={cx("main")}>
        {/* Product */}
        <div className={cx("product")}>
          <div className={cx("images-product")}>
            <img src={data.image} alt="Images" className={cx("img")} />
          </div>
          <div className={cx("property-product")}>
            <div>
              <h2 className={cx("name-product")}>{data.titleName}</h2>
              <span className={cx("author")}>
                by
                <span className={cx("name")}>{data.username}</span>
              </span>
            </div>
            <span className={cx("price")}>
              <NumericFormat
                displayType="text"
                value={data.price}
                thousandSeparator=","
              />
              <span style={{ marginLeft: 5 }}>VND</span>
            </span>
            <div className={cx("availability")}>
              <span className={cx("title")}>Availability: </span>
              <span className={cx("number")}>
                {data.quantity} Left in Stock
              </span>
            </div>
            {/* Desc */}
            <p className={cx("desc")}>{data.content}</p>
            {/* Size */}
            {data.size && (
              <div className={cx("size")}>
                <span className={cx("title")}>Size: </span>
                <span className={cx("number-size")}>{data.size}</span>
              </div>
            )}
            <div className={cx("actions")}>
              <div
                className={cx("action", "reject")}
                onClick={() => handleClickReject(keyword)}
              >
                REJECT
              </div>
              <div
                className={cx("action", "accept")}
                onClick={() => handleAccept(keyword)}
              >
                ACCEPT
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;
