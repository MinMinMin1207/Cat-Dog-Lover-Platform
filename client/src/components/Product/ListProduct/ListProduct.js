import classNames from "classnames/bind";
import styles from "./listProduct.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartHide } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartShow } from "@fortawesome/free-solid-svg-icons";
import Check from "~/components/Popup/Check";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice";

const cx = classNames.bind(styles);

function ListProduct({ id, img, alt, tag, price, title, rate, desc, typeTag }) {
  const [showCart, setShowCart] = useState(false);
  const [follow, setFollow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCart]);

  const handleFollow = () => {
    setFollow(!follow);
  };

  const handleAddToCart = () => {
    setShowCart(true);
    dispatch(
      addToCart({
        id: id,
        img: img,
        title: title,
        price: price,
        quantity: 1,
      })
    );
  };
  return (
    <div className={cx("box-wrapper")}>
      <Check
        title="The product has been added to the cart"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      <div className={cx("box-top")}>
        <img src={img} className={cx("image")} alt={alt} />
        {typeTag === "new" && (
          <div className={cx("tag-name", "tag-new")}>{tag}</div>
        )}
        {typeTag === "discount" && (
          <div className={cx("tag-name", "tag-discount")}>{tag}</div>
        )}
        {typeTag === "gift" && (
          <div className={cx("tag-name", "tag-gift")}>{tag}</div>
        )}
        {typeTag === "soldout" && (
          <div className={cx("tag-name", "tag-soldout")}>{tag}</div>
        )}
      </div>
      <div className={cx("box-body")}>
        <div className={cx("box-content")}>
          <h3 className={cx("title")}>{title}</h3>
          <div className={cx("rate")}>
            <img src={images.start} alt="start" />
            <img src={images.start} alt="start" />
            <img src={images.start} alt="start" />
            <img src={images.start} alt="start" />
            <img src={images.start} alt="start" />
          </div>
          <span className={cx("price")}>${price}</span>
        </div>
        <div className={cx("box-desc")}>{desc}</div>
        {/* <div className={cx("box-footer")}>
          <div className={cx("follow")} onClick={handleFollow}>
            <FontAwesomeIcon
              icon={faHeartHide}
              className={cx("icon", {
                hide: follow === false,
              })}
            />
            <FontAwesomeIcon
              icon={faHeartShow}
              className={cx("icon", {
                show: follow === true,
              })}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ListProduct;
