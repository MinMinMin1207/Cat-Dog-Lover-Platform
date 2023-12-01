import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarItem.module.scss";

const cx = classNames.bind(styles);

const defaultFn = () => {};

export default function SidebarItem({ item, onClick = defaultFn }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cx("sidebar", {
        open: open === true,
      })}
    >
      <div className={cx("menu")}>
        {item.heading && <h3 className={cx("heading")}>{item.heading}</h3>}
        <div className={cx("row")} onClick={() => onClick(item)}>
          {item.childrens ? (
            <>
              <div className={cx("text")}>
                <img src={item.icon} alt="icon" className={cx("icon")} />
                <h3 className={cx("title")}>{item.title}</h3>
              </div>
              <span className={cx("icon")}>
                <i
                  className="bi-chevron-down"
                  onClick={() => setOpen(!open)}
                ></i>
              </span>
            </>
          ) : (
            <div className={cx("text")}>
              <img src={item.icon} alt="icon" className={cx("icon")} />
              <h3 className={cx("title")}>{item.title}</h3>
            </div>
          )}
        </div>
        <div className={cx("content")}>
          {open === true && (
            <div>
              {item.childrens &&
                item.childrens.map((menu, index) => (
                  <SidebarItem key={index} item={menu} onClick={onClick} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
