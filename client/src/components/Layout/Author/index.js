import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Author.module.scss";
import Navigation from "~/components/Navigation";
import Footer from "../../FooterHomeGuest";

const cx = classNames.bind(styles);

function Author({ children, className }) {
  //Active true ? Login : Register
  const location = useLocation();

  const [active, setActive] = useState(() => {
    let pathname = location.pathname;
    if (pathname === "/login") return true;
    else if (pathname === "/register") return false;
  });

  const leftClick = () => {
    setActive(true);
  };

  const rightClick = () => {
    setActive(false);
  };

  return (
    <div
      className={cx("author-wrapper", {
        [className]: className,
      })}
    >
      <div className="container">
        <header className={cx("header")}>
          <Navigation />
        </header>
        <div className={cx("form-body")}>
          <h1 className={cx("title")}>My account</h1>
          <div className={cx("nav-link")}>
            <Link
              to="/login"
              className={cx("action", "sign-in", {
                active: active === true,
              })}
              onClick={leftClick}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={cx("action", "register", {
                active: active === false,
              })}
              onClick={rightClick}
            >
              Register
            </Link>
          </div>
        </div>
        <div className={cx("form")}>{children}</div>
      </div>
      <footer className={cx("footer")}>
        <Footer />
      </footer>
    </div>
  );
}

export default Author;
