import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./Gift.module.scss";
import images from "~/assets/images";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

const LIST = [
  {
    id: 1,
    username: "Anh Lâm họ Phát ",
    avatar: images.cat,
    address: "S502, Vinhome GrandPark, Nguyen Xien, Quan 9",
    typePet: "Penelope",
  },
  {
    id: 12,
    username: "Anh ahihi ",
    avatar: images.cat,
    address: "S502, Vinhome GrandPark, Nguyen Xien, Quan 9",
    typePet: "Louis",
  },
  {
    id: 12,
    username: "Anh huhuhaha ",
    avatar: images.cat,
    address: "S502, Vinhome GrandPark, Nguyen Xien, Quan 9",
    typePet: "Penelop",
  },
  {
    id: 12,
    username: "Anh tikitaka ",
    avatar: images.cat,
    address: "S502, Vinhome GrandPark, Nguyen Xien, Quan 9",
    typePet: "Penelop",
  },
];

function Gift() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [noteReject, setNoteReject] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = cookie.get("token");
        console.log(token);
        if (token) {
          const decodedUserData = jwtDecode(token);

          const res = await axios.post(
            "http://localhost:3000/orders/ownerGift",
            {
              id: decodedUserData.id,
            }
          );
          if (res.data.code === 200) {
            let list = res.data.paging.map((item) => {
              let petId = item.petId;
              let tmp = res.data.data.filter((pet) => {
                return pet.pet.id === petId;
              });
              return {
                id: item.id,
                petId: petId,
                username: item.user.userName,
                reason: item.note,
                typePet: tmp[0].pet.petName,
              };
            });

            // ===============================
            const transformedList = list.reduce((result, item) => {
              const existingItem = result.find(
                (i) => i.typePet === item.typePet
              );

              if (existingItem) {
                existingItem.data.push({
                  id: item.id,
                  petId: item.petId,
                  username: item.username,
                  avatar: item.avatar,
                  reason: item.reason,
                });
              } else {
                result.push({
                  typePet: item.typePet,
                  data: [
                    {
                      id: item.id,
                      petId: item.petId,
                      username: item.username,
                      avatar: item.avatar,
                      reason: item.reason,
                    },
                  ],
                });
              }

              return result;
            }, []);
            setList(transformedList);
            setIsLoading(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleAccept = async (id, petId) => {
    const res = await axios.put("http://localhost:3000/gifts/accepted_gift", {
      petId: petId,
      id: id,
    });
    if (res.data.code === 200) {
      window.location.href = "/giftpage";
    }
  };

  const handleReject = () => {};

  const handleClickReject = () => {
    handleClickOpen();
    setId(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNoteReject("");
  };

  const handleSubmitForm = () => {
    handleReject(id);
    handleClose();
  };

  return (
    <div className={cx("gift-wrapper")}>
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
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("gift-hero")}>
        <header className={cx("header")}>
          <h2 className={cx("heading")}>PENDING GIFT</h2>
        </header>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>PendingGift</span>
        </span>
      </div>
      {/* Main */}
      {isLoading === true ? (
        <main className={cx("main")}>
          <header className={cx("header")}>
            <h3 className={cx("heading")}>Pending Gift</h3>
          </header>
          {list.length > 0 ? (
            <div className={cx("body")}>
              {/* Cash payment */}
              {list.map((item, index) => (
                <div key={index} className={cx("cash")}>
                  <h3 className={cx("heading")}>{item.typePet}</h3>
                  {/* Content */}
                  <div className={cx("content")}>
                    {/* Column */}
                    <div className={cx("list-gift")}>
                      <table className={cx("table")}>
                        <thead className={cx("table-header")}>
                          <tr>
                            <th className={cx("table-item", "title")}>NO</th>
                            <th className={cx("table-item", "title")}>NAME</th>
                            <th className={cx("table-item", "title")}>
                              REASON
                            </th>
                            <th className={cx("table-item", "title")}>
                              APPROVE
                            </th>
                          </tr>
                        </thead>
                        <tbody className={cx("table-body")}>
                          {item.data.map((x, pos) => {
                            return (
                              <tr key={pos} className={cx("row")}>
                                <td className={cx("table-item", "number")}>
                                  {pos + 1}
                                </td>
                                <td className={cx("table-item", "name")}>
                                  <h4 className={cx("username")}>
                                    {x.username}
                                  </h4>
                                </td>

                                <td
                                  className={cx(
                                    "table-item",
                                    "address",
                                    "username"
                                  )}
                                >
                                  {x.reason}
                                </td>
                                <td className={cx("table-item", "approve")}>
                                  <div className={cx("list-approve")}>
                                    <div
                                      className={cx("icon", "check")}
                                      onClick={() =>
                                        handleAccept(x.id, x.petId)
                                      }
                                    >
                                      <img
                                        src={images.checkMark}
                                        alt="icon"
                                        className={cx("img")}
                                      />
                                    </div>
                                    {/* <div
                                      className={cx("icon", "wrong")}
                                      // onClick={() => handleReject(item.id)}
                                      onClick={() => handleClickReject(item.id)}
                                    >
                                      <img
                                        src={images.wrongMark}
                                        alt="icon"
                                        className={cx("img")}
                                      />
                                    </div> */}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 style={{ fontSize: "6.5rem", textAlign: "center" }}>
              No gifts are being requested
            </h2>
          )}
        </main>
      ) : (
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Gift;
