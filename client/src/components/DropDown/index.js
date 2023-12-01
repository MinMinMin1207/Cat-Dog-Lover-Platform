import classNames from "classnames/bind";
import styles from "./DropDown.module.scss";
import { useState } from "react";

import { Select } from "antd";
const cx = classNames.bind(styles);

function DropDownMenu({ className, title, ListValue, value, setValue }) {
  return (
    <div
      className={cx("dropdown-wrapper", {
        [className]: className,
      })}
    >
      {title && (
        <label htmlFor="" className={cx("label")}>
          {title}
        </label>
      )}
      <Select
        // defaultValue={value}
        className={cx("input")}
        value={value}
        onChange={(value) => setValue(value)}
      >
        {ListValue.map((item, index) => {
          return (
            <Select.Option key={index} value={item.value}>
              {item.title}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}

export default DropDownMenu;
