import classNames from "classnames/bind";
import styles from "./ServiceItem.module.scss";

import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import images from "~/assets/images";

import InputItem from "~/components/Layout/Author/InputItem";
import Service from "~/components/Service";
import checkBooking from "~/components/Layout/Author/Validation/checkBooking";
import axios from "axios";
import { useParams } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import jwtDecode from "jwt-decode";
import cookie from "js-cookie";

import Check from "~/components/Popup/Check";
import Wrong from "~/components/Popup/Wrong";

const cx = classNames.bind(styles);

function ServiceItem() {
  const param = useParams();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState({});

  const [serviceItem, setServiceItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");

  const [id, setId] = useState("");

  const [checkTrue, setCheckTrue] = useState(false);
  const [checkFalse, setCheckFalse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckTrue(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [checkTrue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckFalse(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [checkFalse]);

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setId(decodedUserData.id);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleBookingNow = () => {
    const form = {
      date: date,
      time: time,
    };

    const err = checkBooking(form);
    setError(err);

    console.log(err);

    if (err.dateOfBirth === "" && err.time === "") {
      handleClickOpen();
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:3000/services/${param.id}`
        );
        if (res.data.code === 200) {
          setServiceItem(res.data.data);
          setIsLoading(true);
        }
      } catch (err) {
        setIsLoading(true);
      }
    }
    fetchData();
  }, [param.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = () => {
    setOpen(false);
    async function fetchData() {
      let form = {
        customerId: id,
        serviceId: param.id,
        paymentMethod: "Cash",
        serviceName: serviceItem.serviceName,
        note: note,
        fullName: fullName,
        phoneNumber: phoneNumber,
        bookTime: time,
        bookDate: date,
      };
      try {
        if (form.fullName !== "" && form.phoneNumber !== "") {
          await axios.post("http://localhost:3000/bookings", form);
          setDate("");
          setTime("");
          setFullName("");
          setPhoneNumber("");
          setNote("");
          setCheckTrue(true);
          setTimeout(() => {
            window.location.href = "/homeservice";
          }, 2000);
        } else {
          setCheckFalse(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  };

  return (
    <div className={cx("product-wrapper")}>
      <Service title="petwalking">
        {/* Main */}
        {isLoading === true ? (
          <main className={cx("main")}>
            <Check
              title="Booked successfully"
              className={cx({
                "show-cart": checkTrue === true,
              })}
            />
            <Wrong
              title="Booking failed, you did not fill in enough information"
              className={cx({
                "show-cart": checkFalse === true,
              })}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Booking now</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Experience hassle-free pet care with our convenient booking
                  service, tailored to meet the unique needs of your beloved
                  cats and dogs.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="FullName"
                  label="FullName"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="Phone number"
                  label="Phone number"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="Note"
                  label="Note"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleBooking}>Book</Button>
              </DialogActions>
            </Dialog>
            {/* Product */}
            <div className={cx("product")}>
              <div className={cx("images-product")}>
                <img
                  src={`http://localhost:3000/${serviceItem.image}`}
                  alt="Images"
                  className={cx("img")}
                />
              </div>
              <div className={cx("property-product")}>
                <div>
                  <h2 className={cx("name-product")}>
                    {serviceItem.serviceName}
                  </h2>
                  <span className={cx("datetime")}>
                    Tuesday – Sunday / 9h - 6h (available at all of our
                    branches)
                  </span>
                </div>
                <div className={cx("list-price")}>
                  <h4 className={cx("title")}>Price: </h4>
                  <div className={cx("price")}>
                    <NumericFormat
                      displayType="text"
                      className={cx("text")}
                      value={serviceItem.servicePrice}
                      thousandSeparator=","
                    />
                    <span style={{ marginLeft: 5 }}>VND</span>
                  </div>
                </div>
                {/* Desc */}
                <div className={cx("date")}>
                  <InputItem
                    type="date"
                    title="Date"
                    value={date}
                    setValue={setDate}
                  />
                  {error.dateOfBirth && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.dateOfBirth}
                    </p>
                  )}
                </div>
                <div className={cx("time")}>
                  <InputItem
                    type="time"
                    title="Time"
                    value={time}
                    setValue={setTime}
                    min="09:00"
                    max="18:00"
                  />
                  {error.time && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.time}
                    </p>
                  )}
                </div>
                <div className={cx("booking")} onClick={handleBookingNow}>
                  BOOKING NOW
                </div>
              </div>
            </div>
            {/* Detail */}
            <div className={cx("detail")}>
              <h4 className={cx("title")}>Details</h4>
              <p className={cx("desc")}>{serviceItem.content}</p>
            </div>
          </main>
        ) : (
          <Backdrop
            sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Service>
    </div>
  );
}

export default ServiceItem;
