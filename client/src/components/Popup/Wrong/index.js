import classNames from "classnames/bind";
import styles from "./Wrong.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Wrong({ title, className }) {
  return (
    <div
      className={cx("wrapper", {
        [className]: className,
      })}
    >
      <div className={cx("icon-box")}>
        <FontAwesomeIcon icon={faXmark} className={cx("icon")} />
      </div>
      <h3 className={cx("title")}>{title}</h3>
    </div>
  );
}

export default Wrong;
