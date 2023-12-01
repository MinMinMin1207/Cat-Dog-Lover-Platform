import classNames from "classnames/bind";
import styles from "./boxProduct.module.scss";
import images from "~/assets/images";
import { NumericFormat } from "react-number-format";

const cx = classNames.bind(styles);

function BoxProduct({ className, img, alt, tag, price, title, rate, typeTag }) {
  return (
    <div
      className={cx("box-wrapper", {
        [className]: className,
      })}
    >
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
      <div className={cx("box-content")}>
        <h3 className={cx("title")}>{title}</h3>
        {rate && (
          <div className={cx("rate")}>
            <img src={images.start} />
            <img src={images.start} />
            <img src={images.start} />
            <img src={images.start} />
            <img src={images.start} />
          </div>
        )}
        {price > 0 && (
          <span className={cx("price")}>
            <NumericFormat
              displayType="text"
              value={price}
              thousandSeparator=","
            />
            <span style={{ marginLeft: 5 }}> VND</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default BoxProduct;
