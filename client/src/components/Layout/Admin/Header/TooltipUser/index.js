import classNames from "classnames/bind";
import styles from "./TooltipUser.module.scss";

const cx = classNames.bind(styles);

function TooltipUser({ list, onClick }) {
  return (
    <div className={cx("box")}>
      {list.map((item, index) => {
        return (
          <div
            key={index}
            className={cx("nav-item")}
            onClick={() => onClick(item)}
          >
            <img src={item.icon} alt={item.title} className={cx("icon")} />
            <h4 className={cx("title")}>{item.title}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default TooltipUser;
