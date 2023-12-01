import classNames from "classnames/bind";
import styles from "./AllSearch.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BoxProduct from "~/components/Product/BoxProduct/boxProduct";
import axios from "axios";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const cx = classNames.bind(styles);

function AllSearch() {
  const param = useParams();

  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let search = param.search;

  useEffect(() => {
    let split = search.split("&&");
    if (split.length === 2) {
      let tmpFilter = split[0].split("=")[1];
      let tmpKeyword = split[1].split("=")[1];
      if (tmpFilter === "product") {
        tmpFilter = "stuff";
      }
      setFilter(tmpFilter);
      setKeyword(tmpKeyword);
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    async function fetchData() {
      if (filter === "stuff") {
        let res = await axios.post(
          "http://localhost:3000/products/search_product/",
          {
            keyword: keyword,
          }
        );
        if (res.data.code === 200) {
          setData(res.data.data);
          setIsLoading(true);
        } else {
          setIsLoading(true);
        }
      } else if (filter === "dog") {
        let res = await axios.post("http://localhost:3000/pets/search_dog/", {
          keyword: keyword,
        });
        if (res.data.code === 200) {
          setData(res.data.data);
          setIsLoading(true);
        } else {
          setIsLoading(true);
        }
      } else if (filter === "cat") {
        let res = await axios.post("http://localhost:3000/pets/search_cat/", {
          keyword: keyword,
        });
        if (res.data.code === 200) {
          setData(res.data.data);
          setIsLoading(true);
        } else {
          setIsLoading(true);
        }
      }
    }
    fetchData();
  }, [keyword]);

  console.log(data);

  return (
    <div className={cx("search-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("search-hero")}>
        <h2 className={cx("heading")}>SEARCH</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Search</span>
        </span>
      </div>
      <main className={cx("main")}>
        {/* Main header */}
        <div className={cx("main-header")}>
          <div className={cx("heading")}>
            <h2 className={cx("title")}>Search Results: </h2>
            <p className={cx("keyword")}>{keyword}</p>
          </div>
          <div className={cx("heading")}>
            <h2 className={cx("title")}>Filter: </h2>
            <p className={cx("keyword", "filter")}>{filter}</p>
          </div>
        </div>
        {/* Main content */}
        {isLoading === true ? (
          <div className={cx("main-content")}>
            {data.length > 0 ? (
              <div className={cx("shopping-list")}>
                {data.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/${filter === "stuff" ? "product" : "pet"}/${
                        item.id
                      }`}
                      className={cx("href")}
                    >
                      {filter === "stuff" && (
                        <BoxProduct
                          key={index}
                          img={`http://localhost:3000/${item.image}`}
                          title={item.productName}
                          rate={item.species}
                          price={item.price}
                          tag={item.size}
                          typeTag=""
                          className={cx("box-product")}
                        />
                      )}
                      {(filter === "cat" || filter === "dog") && (
                        <BoxProduct
                          key={index}
                          img={`http://localhost:3000/${item.image}`}
                          title={item.petName}
                          rate={item.species}
                          price={item.petPrice}
                          tag={item.size}
                          typeTag=""
                          className={cx("box-product")}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <h2 className={cx("toast")}>Search value not found</h2>
            )}
          </div>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AllSearch;
