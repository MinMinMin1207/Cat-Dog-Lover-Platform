import classNames from "classnames/bind";
import styles from "./FormUpload.module.scss";
import Wrapper from "~/components/Upload/Wrapper";
import InputItem from "~/components/Layout/Author/InputItem";
import { useRef, useState } from "react";
import DropDownMenu from "~/components/DropDown";
import images from "~/assets/images";
import { ImageConfig } from "./ImageConfig";

const cx = classNames.bind(styles);

function FormUpload({
  id,
  title,
  setTitle,
  desc,
  setDesc,
  handleNextClick,
  handlePrevClick,
  PURPOSE,
  purpose,
  setPurpose,
  fileList,
  setFileList,
  error,
}) {
  const wrapperRef = useRef(null);
  const [textInput, setTextInput] = useState(() => {
    if (id === "Cat" || id === "Dog") {
      return {
        title: "Pet name *",
        placeholder: "Pet name",
      };
    } else {
      return {
        title: "Product name *",
        placeholder: "Product name",
      };
    }
  });
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFileList([...fileList, newFile]);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  return (
    <Wrapper className={cx("form-wrapper")}>
      <h1 className={cx("heading")}>Choose Your Category</h1>

      <div className={cx("contain-file")}>
        <div
          className={cx("file")}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <img src={images.imgIconDrag} alt="img" />
          <h4 className={cx("title")}>
            Add <span style={{ fontWeight: 600 }}>picture(s)</span>
          </h4>
          <p className={cx("desc")}>
            or drag <span style={{ fontWeight: 600 }}>image(s)</span> here...
          </p>
          <input
            type="file"
            value=""
            className={cx("input-file")}
            onChange={onFileDrop}
          />
        </div>
        {fileList.length > 0 && (
          <div className={cx("show-file")}>
            <div className={cx("title")}>List picture</div>
            {fileList.map((item, index) => (
              <div key={index} className={cx("drop-file-preview__item")}>
                <div className={cx("drop-file-preview__item__contain")}>
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    className={cx("imgFile")}
                  />
                  <div className={cx("drop-file-preview__item__info")}>
                    <p>{item.name}</p>
                  </div>
                </div>

                <span
                  className={cx("drop-file-preview__item__del")}
                  onClick={() => fileRemove(item)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        )}
        {error.file && (
          <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
            {error.file}
          </p>
        )}
      </div>

      <div className={cx("list-form")}>
        {/* Input item */}
        <InputItem
          type="text"
          title={textInput.title}
          placeholder={textInput.placeholder}
          value={title}
          setValue={setTitle}
          className={cx("input-item")}
        />
        {error.title && (
          <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
            {error.title}
          </p>
        )}
        {/* Text area */}
        <div className={cx("input-desc")}>
          <label htmlFor="Desc" className={cx("label-desc")}>
            Description *
          </label>
          <textarea
            type="text"
            placeholder="Enter something related to your pet here ..."
            id="Desc"
            className={cx("text-area")}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          {error.description && (
            <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
              {error.description}
            </p>
          )}
        </div>
        {/* Input item */}
        <DropDownMenu
          title="Select Post Purpose *"
          ListValue={PURPOSE}
          value={purpose}
          setValue={setPurpose}
          className={cx("input-item", "input-desc")}
        />
        {/* Action */}
        <div className={cx("list-action")}>
          <div className={cx("action")} onClick={handlePrevClick}>
            Back
          </div>
          <div className={cx("action", "active")} onClick={handleNextClick}>
            Next
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default FormUpload;
