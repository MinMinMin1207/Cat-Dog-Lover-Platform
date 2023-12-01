import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import Header from "~/components/Layout/Admin/Header";
import axios from "axios";

import images from "~/assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const SIDEBAR_MENU = [
  {
    heading: "Dashboard",
    title: "Dashboard",
    icon: images.subAddAdmin,
    role: "common",
    childrens: [
      {
        title: "Product",
        value: "productdashboard",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Pet",
        value: "petdashboard",
        role: "common",
        icon: images.chervonLeft,
      },
    ],
  },
  {
    heading: "User Management",
    title: "Account",
    icon: images.subUserAdmin,
    role: "staff",
    childrens: [
      {
        title: "User Account",
        icon: images.chervonLeft,
        role: "common",
        childrens: [
          {
            title: "Available",
            value: "availableuser",
            role: "common",
            icon: images.chervonLeft,
          },
          {
            title: "Ban",
            value: "banuser",
            role: "common",
            icon: images.chervonLeft,
          },
        ],
      },
    ],
  },
  {
    heading: "User Management",
    title: "Account",
    icon: images.subUserAdmin,
    role: "admin",
    childrens: [
      {
        title: "User Account",
        icon: images.chervonLeft,
        role: "admin",
        childrens: [
          {
            title: "Available",
            value: "availableuser",
            role: "admin",
            icon: images.chervonLeft,
          },
          {
            title: "Ban",
            value: "banuser",
            role: "admin",
            icon: images.chervonLeft,
          },
        ],
      },
      {
        title: "Staff Account",
        role: "admin",
        icon: images.chervonLeft,
        childrens: [
          {
            title: "Available",
            role: "admin",
            value: "availablestaff",
            icon: images.chervonLeft,
          },
        ],
      },
    ],
  },
  {
    title: "Post",
    role: "common",
    icon: images.subPostAdmin,

    childrens: [
      {
        title: "All",
        value: "allpost",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Pending Post",
        value: "pendingpost",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Accepted Post",
        value: "acceptedpost",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Rejected Post",
        role: "common",
        value: "rejectedpost",
        icon: images.chervonLeft,
      },
    ],
  },
  {
    title: "Blog",
    icon: images.blogIcon,
    role: "common",
    childrens: [
      {
        title: "Pending",
        value: "blogpending",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Accepted",
        value: "blogaccept",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Rejected",
        value: "blogrejected",
        role: "common",
        icon: images.chervonLeft,
      },
    ],
  },
  {
    title: "Service",
    role: "common",
    icon: images.serviceIcon1,
    childrens: [
      {
        title: "Pending",
        value: "servicepending",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Accepted",
        value: "serviceaccept",
        role: "common",
        icon: images.chervonLeft,
      },
      {
        title: "Rejected",
        value: "servicerejected",
        role: "common",
        icon: images.chervonLeft,
      },
    ],
  },
  {
    heading: "System",
    title: "Configuration",
    role: "admin",
    icon: images.subConfigAdmin,

    childrens: [
      {
        title: "Search",
        role: "admin",
        icon: images.chervonLeft,
      },
      {
        title: "History",
        role: "admin",
        icon: images.chervonLeft,
      },
    ],
  },
];

function clearToken() {
  document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/";
}

function WrapperAdmin({ children }) {
  const [userData, setUserData] = useState("");
  const [sidebar, setSideBar] = useState(SIDEBAR_MENU);

  const navigate = useNavigate();

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData);
        console.log(userData.role);
        if (decodedUserData.role === "SF") {
          setSideBar(
            SIDEBAR_MENU.filter(
              (item) => item.role === "common" || item.role === "staff"
            )
          );
        } else if (decodedUserData.role === "AD") {
          setSideBar(
            SIDEBAR_MENU.filter(
              (item) => item.role === "common" || item.role === "admin"
            )
          );
        }

        if (decodedUserData.role !== "SF" && decodedUserData.role !== "AD") {
          window.location.href = "/login";
          clearToken();
        }
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [menu, setMenu] = useState("");

  useEffect(() => {
    // if(menu === "")
    console.log(menu);
    if (menu === "Post Statistic") {
      navigate("/poststatisticadmin");
    } else if (menu === "pendingpost") {
      navigate("/pendingpost");
    } else if (menu === "allpost") {
      navigate("/allpost");
    } else if (menu === "allstatistic") {
      navigate("/allstatistic");
    } else if (menu === "acceptedpost") {
      navigate("/acceptedpost");
    } else if (menu === "rejectedpost") {
      navigate("/rejectedpost");
    } else if (menu === "availableuser") {
      navigate("/availableuser");
    } else if (menu === "banuser") {
      navigate("/banuser");
    } else if (menu === "blogpending") {
      navigate("/blogpendingadmin");
    } else if (menu === "blogrejected") {
      navigate("/blogrejectedadmin");
    } else if (menu === "servicepending") {
      navigate("/servicependingadmin");
    } else if (menu === "blogaccept") {
      navigate("/blogacceptadmin");
    } else if (menu === "servicerejected") {
      navigate("/servicerejectedadmin");
    } else if (menu === "serviceaccept") {
      navigate("/serviceacceptadmin");
    } else if (menu === "productdashboard") {
      navigate("/productdashboard");
    } else if (menu === "petdashboard") {
      navigate("/petdashboard");
    }else if (menu === "availablestaff") {
      navigate("/availablestaff");
    }
  }, [menu]);

  return (
    <div className={cx("admin-wrapper")}>
      {/* Sidebar */}
      <div className={cx("sidebar")}>
        <Sidebar
          list={sidebar}
          setMenu={setMenu}
          className={cx("sidebar-wrapper")}
        />
      </div>
      {/* Main */}
      <main className={cx("main")}>
        <Header className={cx("header")} />
        <div className={cx("body")}>{children}</div>
      </main>
    </div>
  );
}

export default WrapperAdmin;
