import classNames from "classnames/bind";
import styles from "./BlogItem.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import { useState } from "react";

import { useEffect } from "react";

import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { useParams } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

function BlogItem() {
  const [value, setValue] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/blogs/${param.id}`);
        if (res.data.code === 200) {
          setValue(res.data.data);
        }
      } catch (err) {}
      setIsLoading(true);
    }
    fetchData();
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
          <span className={cx("title")}>Blog</span>
        </span>
      </div>
      {/* Main */}
      {isLoading === true ? (
        <main className={cx("main")}>
          {value.title && value.content && (
            <div className={cx("container")}>
              <div className={cx("top")}>
                <h1 className={cx("heading")}>{value.title}</h1>
                <session className={cx("info-author")}>
                  <div className={cx("profile")}>
                    <a href="#!" className={cx("link")}>
                      <span>Author: </span>
                      <h4 className={cx("username")}>
                        {value.post.user.userName}
                      </h4>
                    </a>
                  </div>
                  <div className={cx("date")}>
                    <span>Date: </span>
                    <h5 className={cx("date-text")}>
                      {value.createdAt.slice(0, 10)}
                    </h5>
                  </div>
                </session>
              </div>
              {/* {value.image && (
           
          )} */}
              <img
                src={`http://localhost:3000/${value.image}`}
                alt="img"
                className={cx("thumbnail")}
              />
              <div className={cx("content")} id="text">
                <div dangerouslySetInnerHTML={{ __html: value.content }}></div>
              </div>
            </div>
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

export default BlogItem;
