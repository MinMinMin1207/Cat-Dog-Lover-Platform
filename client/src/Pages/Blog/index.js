import classNames from "classnames/bind";
import styles from "./Blog.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import images from "~/assets/images";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import useDebounce from "~/hook/useDebounce";

const cx = classNames.bind(styles);

function Blog() {
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const [list, setList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const navigate = useNavigate();

  let debounced = useDebounce(search, 500);

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

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/blogs/acception_blog");
      if (res.data.code === 200) {
        setIsLoading(true);
        setList(res.data.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!debounced.trim()) {
      async function fetchData() {
        const res = await axios.get(
          "http://localhost:3000/blogs/acception_blog"
        );
        if (res.data.code === 200) {
          setList(res.data.data);
        }
      }
      fetchData();
      return;
    }

    const fetchApi = async () => {
      setLoadingSearch(true);
      const result = await axios.post(
        `http://localhost:3000/blogs/search_blog`,
        {
          keyword: search,
        }
      );
      setList(result.data.data);
      setLoadingSearch(false);
    };
    fetchApi();
  }, [debounced]);

  // const handleClickPostBlog = () => {
  //   navigate(`/blog/${id}`);
  // };

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
          <header className={cx("main-header")}>
            <Link to="/postblog">
              <div className={cx("action")}>POST BLOG</div>
            </Link>
          </header>
          <div className={cx("main-body")}>
            <div className={cx("top")}>
              <div className={cx("heading")}>
                <h2 className={cx("title")}>List of blog posts</h2>
                <p className={cx("desc")}>
                  Collection of articles sharing tips on raising dogs and cats
                </p>
              </div>
              <div className={cx("search")}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={cx("search-item")}
                />
              </div>
            </div>
            <div className={cx("list-blogs")}>
              {list.map((item, index) => (
                <div key={index} className={cx("blog-item")}>
                  <img
                    src={`http://localhost:3000/${item.image}`}
                    alt="Blog 1"
                    className={cx("img-blog")}
                  />
                  <div className={cx("body")}>
                    <div className={cx("date")}>
                      <div className={cx("dot")}></div>
                      <span className={cx("text")}>
                        {item.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className={cx("border")}></div>
                    <div className={cx("para")}>
                      <h4 className={cx("title")}>{item.title}</h4>
                      <Link to={`/blog/${item.id}`} className={cx("action")}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Blog;
