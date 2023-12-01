import images from "~/assets/images";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState, useRef, useEffect } from "react";

import useDebounce from "~/hook/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import HeadlessTippy from "@tippyjs/react/headless";
import ProductItem from "~/components/Layout/ProductItem";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const LIST = [
  {
    title: "Stuff",
    value: "product",
  },
  {
    title: "Dog",
    value: "dog",
  },
  {
    title: "Cat",
    value: "cat",
  },
];

function Search({ className }) {
  const [filter, setFilter] = useState(LIST[0].value);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      console.log("Search: ", searchValue);
      if (filter !== "product") {
        const result = await axios.post(
          `http://localhost:3000/pets/search_${filter}_paging`,
          {
            keyword: searchValue,
          }
        );
        setSearchResult(result.data.data);
      } else {
        const result = await axios.post(
          `http://localhost:3000/${filter}s/search_${filter}_paging`,
          {
            keyword: searchValue,
          }
        );
        setSearchResult(result.data.data);
      }

      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      console.log("Search: ", searchValue);
      if (filter !== "product") {
        const result = await axios.post(
          `http://localhost:3000/pets/search_${filter}_paging`,
          {
            keyword: searchValue,
          }
        );
        setSearchResult(result.data.data);
      } else {
        const result = await axios.post(
          `http://localhost:3000/${filter}s/search_${filter}_paging`,
          {
            keyword: searchValue,
          }
        );
        setSearchResult(result.data.data);
      }

      setLoading(false);
    };
    fetchApi();
  }, [filter]);

  const handleChangeFilter = (item) => {
    setFilter(item.value);
  };

  // const handleClear = () => {
  //   setSearchValue("");
  //   setSearchResult([]);
  //   inputRef.current.focus();
  // };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    setSearchValue(searchValue);
  };

  console.log(searchResult);

  const handleSearchAll = () => {};

  const handleClickIcon = () => {
    handleHideResult();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/allSearch/filter=${filter}&&keyword=${searchValue}`);
      handleHideResult();
    }
  };

  return (
    <div
      className={cx("search-wrapper", {
        [className]: className,
      })}
    >
      <HeadlessTippy
        interactive
        visible={showResult === true}
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <div className={cx("list-filters")}>
              {LIST.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={cx("filter", {
                      active: item.value === filter,
                    })}
                    onClick={() => handleChangeFilter(item)}
                  >
                    {item.title}
                  </span>
                );
              })}
            </div>
            <div className={cx("border")}></div>
            <div className={cx("list-search")}>
              {/* Search item */}
              {filter !== "product"
                ? searchResult.map((item, index) => {
                    return (
                      <Link key={index} to={`/pet/${item.id}`}>
                        <div key={index} className={cx("search-item")}>
                          <figure className={cx("image")}>
                            <img
                              src={`http://localhost:3000/${item.image}`}
                              className={cx("img")}
                              alt="img"
                            />
                          </figure>
                          <div className={cx("info")}>
                            <div className={cx("info-box")}>
                              <h4 className={cx("title")}>Name: </h4>
                              <span className={cx("name")}>{item.petName}</span>
                            </div>
                            <div className={cx("info-box")}>
                              <h4 className={cx("title")}>Breed: </h4>
                              <span className={cx("name")}>{item.breed}</span>
                            </div>
                            <div className={cx("info-box")}>
                              <h4 className={cx("title")}>Price: </h4>
                              <span className={cx("name")}>
                                {item.petPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : searchResult.map((item, index) => {
                    return (
                      <Link key={index} to={`/product/${item.id}`}>
                        <div className={cx("search-item")}>
                          <figure className={cx("image")}>
                            <img
                              src={`http://localhost:3000/${item.image}`}
                              className={cx("img")}
                              alt="img"
                            />
                          </figure>
                          <div className={cx("info")}>
                            <div className={cx("info-box")}>
                              <h4 className={cx("title")}>Name: </h4>
                              <span className={cx("name")}>
                                {item.productName}
                              </span>
                            </div>
                            <div className={cx("info-box")}>
                              <h4 className={cx("title")}>Price: </h4>
                              <span className={cx("name")}>{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              {searchResult.length > 0 && (
                <h4 className={cx("more")}>Search more than ....</h4>
              )}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            className={cx("input")}
            ref={inputRef}
            type="text"
            placeholder="Search..."
            spellCheck={false}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
            onKeyPress={handleKeyPress}
          />

          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          <Link
            to={`/allSearch/filter=${filter}&&keyword=${searchValue}`}
            onClick={handleClickIcon}
          >
            <img src={images.iconSearch} alt="search" className={cx("icon")} />
          </Link>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
