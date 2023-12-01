// Import Library
import React from "react";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TippyHeadless from "@tippyjs/react/headless";
// Import components

// Import SCSS
import styles from "../Navigation.module.scss";

const cx = classNames.bind(styles);

function NavItem({ title, tooltip, component }) {
  return (
    <>
      {tooltip === true && (
        <TippyHeadless
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              {component}
            </div>
          )}
        >
          <div className={cx("nav-item")}>
            <span className={cx("nav-title")}>{title}</span>
            <FontAwesomeIcon icon={faChevronDown} className={cx("nav-icon")} />
          </div>
        </TippyHeadless>
      )}
      {tooltip === false && (
        <div className={cx("nav-item")}>
          <span className={cx("nav-title")}>{title}</span>
        </div>
      )}
    </>
  );
}

export default NavItem;
