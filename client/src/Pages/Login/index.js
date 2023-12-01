// Import library
import classNames from "classnames/bind";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Import component
import Wrapper from "~/components/Layout/Author/Wrapper";
import InputItem from "~/components/Layout/Author/InputItem";
import Validation from "~/components/Layout/Author/Validation/login";
import images from "~/assets/images";

// Import CSS
import styles from "./Login.module.scss";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

    const form = { email: email, password: password };
    let err = Validation(form);
    setError(err);
    try {
      // console.log(err.password);
      const res = await axios.post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data.code === 200) {
        if (res.data.paging === "US") {
          window.location.href = "/home";
          // } else if (res.data.paging === "SF" || res.data.paging === "AD") {
          //   window.location.href = "/staff";
        } else if (res.data.paging === "AD" || res.data.paging === "SF") {
          window.location.href = "/homeadmin";
        }
      }
    } catch (error) {
      let res = error.response;
      // console.log(res.data);
      setErrMsg(res.data.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
      console.log("enter");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("heading")}>Welcome Back</h1>
      <div className={cx("desc")}>
        Please sign in to access your full account
      </div>
      <Wrapper>
        {isLoading === false && (
          <form onKeyPress={handleKeyPress} className={cx("wrapper-form")}>
            <div className={cx("input-item")}>
              <InputItem
                type="text"
                title="Email"
                placeholder="Email"
                value={email}
                setValue={setEmail}
                validation={Validation}
              />
              {error.email && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.email}
                </p>
              )}
            </div>

            <div className={cx("input-item")}>
              <InputItem
                type="password"
                title="Password"
                placeholder="Password"
                value={password}
                setValue={setPasword}
              />
              {error.password && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.password}
                </p>
              )}
            </div>

            <div className={cx("footer")}>
              <div className={cx("remeber")}>
                <input
                  type="checkbox"
                  id="rememberme"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="rememberme" className={cx("remember")}>
                  Remember me
                </label>
              </div>
              <div>
                {errMsg && error.password === "" && error.email === "" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: 10,
                      marginBottom: 10,
                      paddingLeft: 5,
                      textAlign: "center",
                    }}
                  >
                    {errMsg}
                  </p>
                )}
              </div>
              <div className={cx("submit")} onClick={handleSubmit}>
                Sign in
              </div>
              <div></div>
              <Link to="/forgotpass">
                <h3 className={cx("forgot-pass")}>Forgot your password ?</h3>
              </Link>
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
        {isLoading === true && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Wrapper>
    </div>
  );
}

export default Login;
