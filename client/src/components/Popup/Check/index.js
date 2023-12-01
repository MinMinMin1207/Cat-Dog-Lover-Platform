import classNames from "classnames/bind";
import styles from "./Check.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Check({ title, className }) {
  return (
    <div
      className={cx("wrapper", {
        [className]: className,
      })}
    >
      <div className={cx("icon-box")}>
        <FontAwesomeIcon icon={faCheck} className={cx("icon")} />
      </div>
      <h3 className={cx("title")}>{title}</h3>
    </div>
  );
}

export default Check;
