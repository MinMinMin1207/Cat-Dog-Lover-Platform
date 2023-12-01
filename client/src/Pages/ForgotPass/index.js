import classNames from "classnames/bind";
import styles from "./ForgotPass.module.scss";

import Navigation from "~/components/Navigation";
import Footer from "~/components/FooterHomeGuest";
import Wrapper from "~/components/Layout/Author/Wrapper";
import InputItem from "~/components/Layout/Author/InputItem";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Check from "~/components/Popup/Check";
import { validateEmail } from "~/components/Layout/Author/Validation/forgotPass";
import { validatePass } from "../../components/Layout/Author/Validation/forgotPass";

const cx = classNames.bind(styles);

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changePass, setChangePass] = useState("");
  const [userData, setUserData] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showCartEmail, setShowCartEmail] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState({});

  function clearToken() {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  }

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (showCartEmail === true) {
      const timer = setTimeout(() => {
        setShowCartEmail(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showCartEmail]);

  useEffect(() => {
    if (showPass === true) {
      const timer = setTimeout(() => {
        setShowPass(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [showPass]);

  useEffect(() => {
    if (isLoading === true) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSubmit = async () => {
    setIsLoading(true);

    const form = {
      email: email.trim(),
    };
    let err = validateEmail(form);
    setError(err);
    try {
      if (err.email === "") {
        const res = await axios.post(
          `http://localhost:3000/users/forgot_password`,
          {
            email: email,
          }
        );
        if (res.data.code === 200) {
          setShowCartEmail(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      }
    } catch (error) {
      let res = error.response;
      console.log(res.data.message);
      setErrMsg(res.data.message);
      console.log(errMsg);
    }
  };

  const handleChangePass = async () => {
    setIsLoading(true);

    const form = {
      password: password.trim(),
      confirmPassword: changePass.trim(),
    };
    let err = validatePass(form);
    setError(err);
    try {
      if (err.password === "" && err.confirmPassword === "") {
        const res = await axios.put(
          `http://localhost:3000/users/change_password`,
          {
            email: userData.email,
            password: password,
          }
        );
        if (res.data.code === 200) {
          setShowPass(true);
          setTimeout(() => {
            clearToken();
            window.location.href = "/login";
          }, 5000);
        } else {
          console.log("something error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPressSubmit = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleKeyPressChangePass = (event) => {
    if (event.key === "Enter") {
      handleChangePass();
    }
  };

  return (
    <div className={cx("forgot-wrapper")}>
      <div className={cx("container")}>
        {/* Header */}
        <header className={cx("header")}>
          <Navigation current="contact" />
        </header>
        {/* Main */}
        <main className={cx("main")}>
          <div className={cx("form-body")}>
            <h1 className={cx("title")}>Forgot password</h1>
            <div className={cx("form")}>
              <Wrapper className={cx("wrapper-form")}>
                {checkEmail === false ? (
                  <div className={cx("wrapper")}>
                    {isLoading === false ? (
                      <>
                        <Check
                          title="Please check your email to change your password"
                          className={cx({
                            "show-cart": showCartEmail === true,
                          })}
                        />
                        <form
                          className={cx("email")}
                          onKeyPress={handleKeyPressSubmit}
                        >
                          <InputItem
                            type="text"
                            title="Email"
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                            className={cx("input-item")}
                          />
                          {error.email && (
                            <p
                              style={{
                                color: "red",
                                marginTop: 10,
                                paddingLeft: 5,
                              }}
                            >
                              {error.email}
                            </p>
                          )}
                          <div className={cx("footer")}>
                            <div
                              className={cx("submit")}
                              onClick={handleSubmit}
                            >
                              Next
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </div>
                ) : (
                  <div className={cx("wrapper")}>
                    {isLoading === false ? (
                      <>
                        <Check
                          title="Password changed successfully, please log in"
                          className={cx({
                            "show-cart": showPass === true,
                          })}
                        />
                        <form
                          className={cx("password")}
                          onKeyPress={handleKeyPressChangePass}
                        >
                          <div className={cx("input-item")}>
                            <InputItem
                              type="password"
                              title="Password *"
                              placeholder="Password"
                              value={password}
                              setValue={setPassword}
                            />
                            {error.password && (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: 10,
                                  paddingLeft: 5,
                                }}
                              >
                                {error.password}
                              </p>
                            )}
                          </div>

                          <div className={cx("input-item")}>
                            <InputItem
                              type="password"
                              title="Change password *"
                              placeholder="Change password"
                              value={changePass}
                              setValue={setChangePass}
                            />
                            {error.confirmPassword && (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: 10,
                                  paddingLeft: 5,
                                }}
                              >
                                {error.confirmPassword}
                              </p>
                            )}
                          </div>

                          <div className={cx("footer")}>
                            <div
                              className={cx("submit")}
                              onClick={handleChangePass}
                            >
                              Reset password
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </div>
                )}
              </Wrapper>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPass;
