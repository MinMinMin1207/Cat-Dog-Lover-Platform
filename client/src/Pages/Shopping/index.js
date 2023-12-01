import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import images from "~/assets/images";
import BoxProduct from "~/components/Product/BoxProduct/boxProduct";
import ListProduct from "~/components/Product/ListProduct/ListProduct";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import styles from "./Shopping.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import DropDownMenu from "../../components/DropDown";
import { current } from "@reduxjs/toolkit";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

const LIST_SORT = [
  {
    title: "Sort by name",
    value: "sort_name",
  },
  {
    title: "Sort by price",
    value: "sort_price",
  },
];

const FILTER = [
  {
    img: images.filterProduct,
    alt: "Product",
    value: "product",
    link: "product",
  },
  {
    img: images.filterCat,
    alt: "Cat",
    value: "cat",
    link: "pet",
  },
  {
    img: images.filterDog,
    alt: "Dog",
    value: "dog",
    link: "pet",
  },
];

function Shopping() {
  const [pets, setPets] = useState([]);

  const [filter, setFilter] = useState({
    filter: FILTER[0].value,
    pageNumber: 1,
    link: FILTER[0].link,
  });

  const [sort, setSort] = useState(LIST_SORT[0]);

  const [totalPage, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: "30%",
      left: "30%",
      behavior: "smooth",
    });

    async function fetchData() {
      console.log(filter);
      if (filter.filter === "cat") {
        let res = await axios.get(
          `http://localhost:3000/pets/list_cat?page_no=${filter.pageNumber}`
        );
        if (res.data.code === 200) {
          setPets(res.data.data);
          setTotalPages(res.data.paging);
          setSort(sort);
          setIsLoading(true);
        }
      } else if (filter.filter === "dog") {
        let res = await axios.get(
          `http://localhost:3000/pets/list_dog?page_no=${filter.pageNumber}`
        );
        if (res.data.code === 200) {
          setPets(res.data.data);
          setTotalPages(res.data.paging);
          setSort(sort);
          setIsLoading(true);
        }
      } else if (filter.filter === "product") {
        let res = await axios.get(
          `http://localhost:3000/products/list_product?page_no=${filter.pageNumber}`
        );
        if (res.data.code === 200) {
          setPets(res.data.data);
          setTotalPages(res.data.paging);
          setSort(sort);
          setIsLoading(true);
        }
      }
    }
    fetchData();
  }, [filter]);

  // useEffect(() => {
  //   async function fetchData() {
  //     let res = await axios.get(`http://localhost:3000/products/list_product`);
  //     setPets(res.data.data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pets.length > 0) {
      if (sort === "sort_name") {
        let list = [...pets];
        list.sort((a, b) => {
          if (a.productName < b.productName) {
            return 1;
          } else if (a.productName > b.productName) {
            return -1;
          } else {
            return 0;
          }
        });
        setPets(list);
      } else if (sort === "sort_price") {
        let list = [...pets];
        list.sort((a, b) => {
          if (filter.filter === "product") return a.price - b.price;
          else return a.petPrice - b.petPrice;
        });
        setPets(list);
      }
    }
  }, [sort]);

  const handlePageClick = (item) => {
    let number = item.selected + 1;
    setFilter((prev) => {
      return {
        ...prev,
        pageNumber: number,
      };
    });
    setIsLoading(false);
    setCurrentPage(item.selected);
  };

  const handleClickFilter = (item) => {
    setFilter((prev) => {
      return {
        ...prev,
        filter: item.value,
        link: item.link,
      };
    });
    setIsLoading(false);
    setCurrentPage(0);
  };

  console.log(filter);

  const [activeMenu, setActiveMenu] = useState(true);

  const leftMenu = () => {
    setActiveMenu(true);
  };
  const rightMenu = () => {
    setActiveMenu(false);
  };

  return (
    <div className={cx("shop-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("shopping-hero")}>
        <h2 className={cx("heading")}>SHOPPING</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Shopping</span>
        </span>
      </div>
      {/* Main */}
      {isLoading === true ? (
        <main className={cx("main")}>
          {/* Main header */}
          <div className={cx("main-header")}>
            {/* Left */}
            <div className={cx("left")}>
              <div
                className={cx("menu", "menu-one", {
                  active: activeMenu === true,
                })}
                onClick={leftMenu}
              >
                <FontAwesomeIcon icon={faTableCellsLarge} />
              </div>
              {/* <div
              className={cx("menu", "menu-two", {
                active: activeMenu === false,
              })}
              onClick={rightMenu}
            >
              <FontAwesomeIcon icon={faBars} />
            </div> */}
              <span className={cx("result-search")}>
                Showing 1 - 12 of products
              </span>
            </div>
            {/* Center */}
            <div className={cx("center")}>
              <span>Filter: </span>
              {FILTER.map((item, index) => (
                <img
                  key={index}
                  src={item.img}
                  alt={item.alt}
                  className={cx("img", {
                    active: item.value === filter.filter,
                  })}
                  onClick={() => handleClickFilter(item)}
                />
              ))}
            </div>
            {/* Right */}
            <div className={cx("right")}>
              <span>Sort By:</span>
              <DropDownMenu
                className={cx("input-sort")}
                ListValue={LIST_SORT}
                value={sort}
                setValue={setSort}
              />
            </div>
          </div>

          {/* Shopping */}

          <div className={cx("main-content")}>
            {/* Store content */}
            {activeMenu === true && (
              <div className={cx("shopping-list")}>
                {pets.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/${filter.link}/${item.id}`}
                      className={cx("href")}
                    >
                      {filter.filter === "product" && (
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
                      {(filter.filter === "cat" || filter.filter === "dog") && (
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
            )}
            {/* Shopping content */}
            {/* {activeMenu === false && (
            <div className={cx("shopping-list-menu")}>
              {pets.map((item, index) => {
                return (
                  <ListProduct
                    id={item.id}
                    key={index}
                    img={`http://localhost:3000/${item.image}`}
                    title={item.productName}
                    rate={item.species}
                    price={item.price}
                    tag={item.size}
                    desc={item.post.content}
                  />
                );
              })}
            </div>
          )} */}
            <div className={cx("shop-page")}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                forcePage={currentPage}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={cx("pagination")}
                previousLinkClassName={cx("pagination__link")}
                nextLinkClassName={cx("pagination__link")}
                disabledClassName={cx("pagination__link--disabled")}
                activeClassName={cx("pagination__link--active")}
              />
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

export default Shopping;
