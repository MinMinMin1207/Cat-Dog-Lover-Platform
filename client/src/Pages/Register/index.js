// Import library
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import cookie from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Import component
import Wrapper from "~/components/Layout/Author/Wrapper";
import InputItem from "~/components/Layout/Author/InputItem";
import {
  register as ValidateRegister,
  registerRest as ValidateRegisterRest,
} from "~/components/Layout/Author/Validation/register";
import images from "~/assets/images";
import Check from "~/components/Popup/Check";

// Import CSS
import styles from "./Register.module.scss";

import DropDownMenu from "~/components/DropDown";

const cx = classNames.bind(styles);

const GENDER = [
  {
    title: "Male",
    value: "Male",
  },
  {
    title: "Fmale",
    value: "Fmale",
  },
  {
    title: "Different",
    value: "Different",
  },
];

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(GENDER[0].value);
  const [errMsg, setErrMsg] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const [error, setError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false); // Show popup add to cart
  const [checkRegister, setCheckRegister] = useState(false); // Show popup add to cart

  useEffect(() => {
    if (isLoading === true) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showCart === true) {
      const timer = setTimeout(() => {
        setShowCart(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showCart]);

  useEffect(() => {
    if (checkRegister === true) {
      const timer = setTimeout(() => {
        setCheckRegister(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [checkRegister]);

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        setCheckEmail(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const form = {
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };
    let err = ValidateRegister(form);
    setError(err);
    try {
      if (
        err.email === "" &&
        err.password === "" &&
        err.confirmPassword === ""
      ) {
        const res = await axios.post("http://localhost:3000/users/register", {
          email: email,
          password: password,
        });
        if (res.data.code === 200) {
          setShowCart(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
          console.log("Register successfully");
        }
      }
    } catch (error) {
      let res = error.response;
      console.log(res.data.message);
      setErrMsg(res.data.message);
      console.log(errMsg);
    }
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);

    console.log(fullName, dateOfBirth, phoneNumber, username, gender);
    const form = {
      fullName: fullName.trim(),
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber.trim(),
      username: username.trim(),
    };
    let err = ValidateRegisterRest(form);
    setError(err);
    try {
      if (
        err.fullName === "" &&
        err.dateOfBirth === "" &&
        err.phoneNumber === "" &&
        err.username === "" &&
        err.gender === ""
      ) {
        const res = await axios.put(
          "http://localhost:3000/users/registerinfomation",
          {
            fullName: fullName.trim(),
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber.trim(),
            userName: username.trim(),
            gender: gender,
          }
        );
        if (res.data.code === 200) {
          console.log("Register successfully");
          setCheckRegister(true);
          setTimeout(() => {
            window.location.href = "/home";
          }, 5000);
        }
      }
    } catch (error) {
      let res = error.response;
      console.log(res.data);
    }
  };

  const handleKeyPressSubmit = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleKeyPressCreate = (event) => {
    if (event.key === "Enter") {
      handleCreateAccount();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Check
        title="Please check your email for more updated information"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      <Check
        title="You have successfully registered"
        className={cx({
          "show-cart": checkRegister === true,
        })}
      />
      <h1 className={cx("heading")}>Create Account</h1>
      <Wrapper className={cx("wrapper-form")}>
        {isLoading === false && (
          <>
            <div className={cx("desc")}>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </div>
            {checkEmail === false && (
              <form onKeyPress={handleKeyPressSubmit}>
                {/* Input item email*/}
                <div className={cx("input-item")}>
                  <InputItem
                    type="text"
                    title="Email address *"
                    placeholder="Email address"
                    value={email}
                    setValue={setEmail}
                  />
                  {error.email && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.email}
                    </p>
                  )}
                </div>

                {/* Input item password */}
                <div className={cx("input-item")}>
                  <InputItem
                    type="password"
                    title="Password *"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                  />
                  {error.password && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.password}
                    </p>
                  )}
                </div>

                {/* Input item confirm password */}
                <div className={cx("input-item")}>
                  <InputItem
                    type="password"
                    title="Confirm Password *"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                  />
                  {error.confirmPassword && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className={cx("footer")}>
                  <div className={cx("submit")} onClick={handleSubmit}>
                    Submit
                  </div>
                  <div>
                    {errMsg && (
                      <p
                        style={{
                          color: "red",
                          marginTop: 10,
                          paddingLeft: 5,
                          textAlign: "center",
                        }}
                      >
                        {errMsg}
                      </p>
                    )}
                  </div>
                  <div className={cx("login-dif")}>
                    <p className={cx("title")}>Or you can sign in with</p>
                    <div className={cx("list-icon")}>
                      <a href="http://localhost:3000/auth/google">
                        <img src={images.googleIcon} alt="Login google" />
                      </a>
                      {/* <img src={images.facebookIcon} alt="Login facebook" /> */}
                    </div>
                  </div>
                </div>
              </form>
            )}

            {checkEmail === true && (
              <form onKeyPress={handleKeyPressCreate}>
                {/* Input item full name*/}
                <div className={cx("input-item")}>
                  <InputItem
                    type="text"
                    title="Full Name *"
                    placeholder="Full Name"
                    value={fullName}
                    setValue={setFullName}
                  />
                  {error.fullName && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.fullName}
                    </p>
                  )}
                </div>

                {/* Input item date of birth */}
                <div className={cx("input-item")}>
                  <InputItem
                    type="date"
                    title="Date of Birth *"
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                  />
                  {error.dateOfBirth && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Input item confirm phone number */}
                <div className={cx("input-item")}>
                  <InputItem
                    type="text"
                    title="Phone Number *"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                  />
                  {error.phoneNumber && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Input item confirm username */}
                <div className={cx("input-item")}>
                  <InputItem
                    type="text"
                    title="Username *"
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                  />
                  {error.username && (
                    <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                      {error.username}
                    </p>
                  )}

                  {/* Input item confirm gender */}

                  <DropDownMenu
                    title="Select Post Purpose *"
                    ListValue={GENDER}
                    value={gender}
                    setValue={setGender}
                    className={cx("input-item", "input-desc")}
                  />
                </div>

                {/* Footer */}
                <div className={cx("footer")}>
                  <div className={cx("submit")} onClick={handleCreateAccount}>
                    Create Account
                  </div>
                </div>
              </form>
            )}
          </>
        )}
        {isLoading === true && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Wrapper>
    </div>
  );
}

export default Register;
