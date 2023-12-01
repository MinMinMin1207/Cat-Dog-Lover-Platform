import classNames from "classnames/bind";
import styles from "./InputItem.module.scss";
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function InputItem({
  value,
  setValue,
  title,
  placeholder,
  type,
  list,
  listValue,
  className,
  readonly,
  min,
  max,
}) {
  const [active, setActive] = useState(true);
  const [typeValue, setTypeValue] = useState(type);

  const handleActive = () => {
    setActive(!active);
    if (typeValue === "password") {
      setTypeValue("text");
    } else if (typeValue === "text") {
      setTypeValue("password");
    }
  };

  return (
    <div
      className={cx({
        [className]: className,
      })}
    >
      {title && (
        <label htmlFor={title} className={cx("label")}>
          {title}
        </label>
      )}
      <div className={cx("input")}>
        <div className={cx("input-type")}>
          <input
            type={typeValue}
            list={list}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id={title}
            className={cx("input-text")}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readonly}
            min={min}
            max={max}
          />
          {type === "password" && value.length > 0 && (
            <div className={cx("input-list")}>
              <div
                className={cx("input-show", {
                  active: active === true,
                })}
                onClick={handleActive}
              >
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className={cx("input-icon")}
                />
              </div>

              <div
                className={cx("input-hidden", {
                  active: active === false,
                })}
                onClick={handleActive}
              >
                <FontAwesomeIcon icon={faEye} className={cx("input-icon")} />
              </div>
            </div>
          )}

          {type === "list" && (
            <>
              <datalist id={list}>
                {listValue.map((item, index) => (
                  <option key={index} className={cx("option")}>
                    {item}
                  </option>
                ))}
              </datalist>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(InputItem);
