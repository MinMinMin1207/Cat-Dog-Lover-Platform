import classNames from "classnames/bind";
import styles from "./Gift.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import BoxProduct from "~/components/Product/BoxProduct/boxProduct";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function GiftPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/gifts");
      if (res.data.code === 200) {
        setProducts(res.data.data);
        setIsLoading(true);
      }
    }

    fetchData();
  }, []);

  console.log(products);

  return (
    <div className={cx("gift-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("gift-hero")}>
        <h2 className={cx("heading")}>GIFT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Gift</span>
        </span>
      </div>
      {/* Main =========== */}
      {isLoading === true ? (
        <main className={cx("main")}>
          <div className={cx("main-content")}>
            <div className={cx("shopping-list")}>
              {products.map((item, index) => {
                return (
                  <Link to={`/gift/${item.id}`}>
                    <BoxProduct
                      key={index}
                      img={`http://localhost:3000/${item.image}`}
                      title={item.petName}
                      tag="Gift"
                      typeTag="gift"
                      className={cx("box-product")}
                    />
                  </Link>
                );
              })}
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

export default GiftPage;
