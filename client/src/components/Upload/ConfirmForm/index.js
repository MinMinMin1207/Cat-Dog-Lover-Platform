import Wrapper from "~/components/Upload/Wrapper";
import classNames from "classnames/bind";
import styles from "./ConfirmForm.module.scss";
import InputItem from "~/components/Layout/Author/InputItem";
import DropDownMenu from "~/components/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const cx = classNames.bind(styles);

function ConfirmForm({
  id,
  qty,
  setQty,
  SIZE,
  BREED,
  size,
  setSize,
  purpose,
  handlePrevClick,
  handleUploadClick,
  SPECIES,
  species,
  setSpecies,
  breed,
  setBreed,
  age,
  setAge,
  price,
  setPrice,
  TYPEPRODUCT,
  typeProduct,
  setTypeProduct,
  error,
  expire,
  setExpire,
  listExpire,
  optionExpire,
  setOptionExpire,
}) {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper className={cx("confirm-wrapper")}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          SIZE GUIDE
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
          <Typography gutterBottom>
            <h1>
              Dear Customers, we want to ensure a seamless shopping experience
              for you. Please note that our products are categorized into three
              sizes for your convenience:
            </h1>
          </Typography>
          <Typography gutterBottom>
            <div>
              <p>- Small (S) for items weighing less than 1kg </p>
              <p> - Medium (M) for products between 1kg and 5kg </p>
              <p>- Large (L) for items exceeding 5kg.</p>
            </div>
          </Typography>
          <Typography gutterBottom>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      <div className={cx("form-wrapper")}>
        <h1 className={cx("heading")}>Confirm information</h1>
        <div className={cx("form")}>
          <h2 className={cx("title")}>Pet Details</h2>
          {/* Input Item */}
          {id !== "Stuff" && (
            <InputItem
              title="Species *"
              placeholder=""
              className={cx("input-item")}
              value={species}
              setValue={setSpecies}
              readonly="readonly"
            />
          )}

          {/* Input Item */}
          {id === "Stuff" && (
            <DropDownMenu
              title="Species *"
              ListValue={SPECIES}
              value={species}
              setValue={setSpecies}
              className={cx("input-item", "input-desc")}
            />
          )}

          {id === "Stuff" && (
            <DropDownMenu
              title="Type of Product *"
              ListValue={TYPEPRODUCT}
              value={typeProduct}
              setValue={setTypeProduct}
              className={cx("input-item", "input-desc")}
            />
          )}
          {id === "Stuff" && (
            <DropDownMenu
              title="Expire *"
              ListValue={listExpire}
              value={optionExpire}
              setValue={setOptionExpire}
              className={cx("input-item", "input-desc")}
            />
          )}

          {/* Input Item */}
          {id !== "Stuff" && (
            <div className={cx("col")}>
              <DropDownMenu
                title="Size *"
                ListValue={BREED}
                value={breed}
                setValue={setBreed}
                className={cx("input-item", "input-desc")}
              />
              {error.breed && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.breed}
                </p>
              )}
            </div>
          )}
          {/* Input Item */}
          <div className={cx("row")}>
            {id !== "Stuff" && (
              <div className={cx("col")}>
                <InputItem
                  title="Age *"
                  type="number"
                  placeholder="Age"
                  className={cx("input-item")}
                  value={age}
                  setValue={setAge}
                />
                {error.age && (
                  <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                    {error.age}
                  </p>
                )}
              </div>
            )}

            {id === "Stuff" &&
              (typeProduct === "toy" || typeProduct === "others") && (
                <div className={cx("size")}>
                  <DropDownMenu
                    title="Size *"
                    ListValue={SIZE}
                    value={size}
                    setValue={setSize}
                    className={cx("input-item", "input-desc")}
                  />
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className={cx("icon")}
                    onClick={handleClickOpen}
                  />
                </div>
              )}

            {id === "Stuff" && typeProduct === "food" && (
              <div className={cx("col")}>
                <InputItem
                  title="Weight *"
                  type="number"
                  placeholder="Weight(kg)"
                  className={cx("input-item")}
                  value={size}
                  setValue={setSize}
                />
                {error.qty && (
                  <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                    {error.qty}
                  </p>
                )}
              </div>
            )}

            {id === "Stuff" && (
              <div className={cx("col")}>
                <InputItem
                  title="Qty *"
                  type="number"
                  placeholder="Quantity"
                  className={cx("input-item")}
                  value={qty}
                  setValue={setQty}
                />
                {error.qty && (
                  <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                    {error.qty}
                  </p>
                )}
              </div>
            )}

            {id === "Stuff" && (
              <>
                {optionExpire !== "none" ? (
                  <InputItem
                    title="Expire *"
                    type="date"
                    className={cx("input-item")}
                    value={expire}
                    setValue={setExpire}
                  />
                ) : (
                  ""
                )}
              </>
            )}

            {purpose !== "Gift" && (
              <div className={cx("col")}>
                <InputItem
                  title="Price *"
                  type="number"
                  placeholder="Price"
                  className={cx("input-item")}
                  value={price}
                  setValue={setPrice}
                />
                {error.price && (
                  <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                    {error.price}
                  </p>
                )}
              </div>
            )}
          </div>
          {purpose === "Gift" && (
            <p className={cx("desc-price")}>
              Price has been set to $0 because as your post's intention is to
              offer it as a gift.
            </p>
          )}
        </div>
      </div>
      {/* Action */}
      <div className={cx("list-action")}>
        <div className={cx("action")} onClick={handlePrevClick}>
          BACK
        </div>
        <div className={cx("action", "active")} onClick={handleUploadClick}>
          UPLOAD
        </div>
      </div>
    </Wrapper>
  );
}

export default ConfirmForm;
