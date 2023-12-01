import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import images from "~/assets/images";
import SidebarItem from "./SidebarItem";

const cx = classNames.bind(styles);

function Sidebar({ list, setMenu, className }) {
  const handleGetMenu = (item) => {
    if (item.childrens === undefined || item.childrens === null) {
      setMenu(item.value);
    }
  };

  return (
    <div
      className={cx("sidebar-wrapper", {
        [className]: className,
      })}
    >
      <header className={cx("header")}>
        <section className={cx("logo")}>
          <img src={images.logo} alt="Logo" className={cx("img")} />
          <div className={cx("text-logo")}>
            <span className={cx("paws")}>Paws</span>
            <span className={cx("and")}>and</span>
            <span className={cx("whiskers")}>Whiskers</span>
          </div>
        </section>
      </header>
      <main className={cx("main")}>
        {list.map((item, index) => {
          return (
            <SidebarItem key={index} item={item} onClick={handleGetMenu} />
          );
        })}
      </main>
    </div>
  );
}

export default Sidebar;
