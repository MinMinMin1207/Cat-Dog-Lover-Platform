// Import Library
import React from "react";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TippyHeadless from "@tippyjs/react/headless";
// Import components

// Import SCSS
import styles from "./Tooltip.module.scss";

const cx = classNames.bind(styles);

function Tooltip({ title, component, icon = false }) {
  return (
    <TippyHeadless
      interactive
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("box")} tabIndex="-1" {...attrs}>
          {component}
        </div>
      )}
    >
      <div className={cx("heading")}>
        <span className={cx("title")}>{title}</span>
        {icon === false && (
          <FontAwesomeIcon icon={faChevronDown} className={cx("icon")} />
        )}
      </div>
    </TippyHeadless>
  );
}

export default Tooltip;
