import classNames from "classnames/bind";
import styles from "./PreviewBlog.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import { useState } from "react";

import { useEffect } from "react";

import "react-quill/dist/quill.snow.css";

import cookie from "js-cookie";
import jwtDecode from "jwt-decode";

const cx = classNames.bind(styles);

function PreviewBlog() {
  const [value, setValue] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData);
      } else {
        window.location.href = "/login";
      }

      let res = JSON.parse(window.localStorage.getItem("previewBlog"));
      setValue({
        title: res.title,
        image: res.image.preview || res.image,
        content: res.text,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={cx("blog-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("blog-hero")}>
        <h2 className={cx("heading")}>BLOG</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Previewblog</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        <div className={cx("container")}>
          <div className={cx("top")}>
            <h1 className={cx("heading")}>{value.title}</h1>
            <session className={cx("info-author")}>
              <div className={cx("profile")}>
                <a className={cx("link")}>
                  <span>Author: </span>
                  <h4 className={cx("username")}>{userData.username}</h4>
                </a>
              </div>
              <div className={cx("date")}>
                <span>Date: </span>
                <h5 className={cx("date-text")}>24-11-2023</h5>
              </div>
            </session>
          </div>
          {/* {value.image && (
           
          )} */}
          <img src={value.image} alt="img" className={cx("thumbnail")} />
          <div className={cx("content")} id="text">
            <div dangerouslySetInnerHTML={{ __html: value.content }}></div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PreviewBlog;
