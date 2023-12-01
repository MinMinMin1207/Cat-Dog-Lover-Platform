import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./ProgressBar.module.scss";

const cx = classNames.bind(styles);

function ProgressBar({ steps }) {
  return (
    <div className={cx("progress-wrapper")}>
      <div className={cx("steps")}>
        <span className={cx("circle", "active")}>1</span>
        <span
          className={cx("circle", {
            active: steps >= 2,
            no_active: steps < 2,
          })}
        >
          2
        </span>
        <span
          className={cx("circle", {
            active: steps === 3,
            no_active: steps < 3,
          })}
        >
          3
        </span>
        <div className={cx("progress-bar")}>
          <span
            className={cx("indicator", "indicator-one", {
              one: steps >= 1,
            })}
          ></span>
          <span
            className={cx("indicator", "indicator-two", {
              two: steps >= 2,
              no_active: steps < 2,
            })}
          ></span>
          <span
            className={cx("indicator", "indicator-three", {
              three: steps === 3,
              no_active: steps < 3,
            })}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProgressBar);
