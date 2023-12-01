import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import Tooltip from "~/components/Tooltip";
import TooltipUser from "~/components/Layout/Admin/Header/TooltipUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const LIST = [
  {
    icon: images.settingAdmin,
    title: "Setting",
    value: "setting",
  },
  {
    icon: images.postAdmin,
    title: "My Messages",
    value: "mymessage",
  },
  {
    icon: images.convertIcon,
    title: "Home page",
    value: "homepage",
  },
  {
    icon: images.logoutAdmin,
    title: "Logout",
    value: "logout",
  },
];

function clearToken() {
  document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/";
}

function Header({ className }) {
  const [option, setOption] = useState("");

  const navigate = useNavigate();

  const handleGetOption = (option) => {
    if (option.value === "logout") {
      clearToken();
    } else if (option.value === "homepage") {
      navigate("/home");
    }
  };

  return (
    <div
      className={cx("header-wrapper", {
        [className]: className,
      })}
    >
      <section className={cx("left")}></section>
      <section className={cx("right")}>
        <div className={cx("user")}>
          <img
            src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
            className={cx("avatar")}
            alt="staff||admin"
          />
          <Tooltip
            title="admin"
            component={<TooltipUser list={LIST} onClick={handleGetOption} />}
          />
        </div>
      </section>
    </div>
  );
}

export default Header;
