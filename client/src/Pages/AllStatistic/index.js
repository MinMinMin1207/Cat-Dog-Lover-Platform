import classNames from "classnames/bind";
import styles from "./AllStatistic.module.scss";
import { NumericFormat } from "react-number-format";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function AllStatistic() {
  return (
    <div className={cx("all-wrapper")}>
      <div className={cx("box-statistic")}>
        <div className={cx("box")}>
          <div className={cx("header-box")}>
            <h4 className={cx("price")}>
              <NumericFormat
                displayType="text"
                value={1950000}
                thousandSeparator=","
              />{" "}
              VND
            </h4>
            <div className={cx("row", "desc")}>
              <h4 className={cx("name")}>All Earnings</h4>
              <img src={images.barchart} alt="icon" className={cx("icon")} />
            </div>
          </div>
          <div className={cx("footer-box")}></div>
        </div>
      </div>
    </div>
  );
}

export default AllStatistic;
