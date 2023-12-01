import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ className, children }) {
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <div className={classes}>
      <span className={cx("button-title")}>{children}</span>
    </div>
  );
}

export default Button;
