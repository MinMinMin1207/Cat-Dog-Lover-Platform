import classNames from "classnames/bind";
import styles from "./PostBlog.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import { useState } from "react";

import { useEffect } from "react";
import { Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Check from "~/components/Popup/Check";

const cx = classNames.bind(styles);

const toolbarOption = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const modules = {
  toolbar: toolbarOption,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "size",
  "color",
  "list",
  "bullet",
];

function PostBlog() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (popup === true) {
      const timer = setTimeout(() => {
        setPopup(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [popup]);

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleExport = () => {
    async function fetchData() {
      const formData = new FormData();
      if (title !== "" && image !== "" && text !== "") {
        formData.append("title", title);
        formData.append("content", text);
        formData.append("image", image);
        const res = await axios.post("http://localhost:3000/blogs", formData);
        setPopup(true);
        if (res.data.code === 200) {
          setTimeout(() => {
            window.location.href = "/blog";
          }, 5000);
        }
      }
    }
    fetchData();
  };

  const handleRemoveFile = () => {
    setImage("");
  };

  useEffect(() => {
    if (title !== "" && title !== "PawsAndWhishkers") document.title = title;
    else if (title === "" || title === "PawsAndWhishkers") {
      document.title = "PawsAndWhishkers";
    }
  }, [title]);

  const handlePreviewBlog = () => {
    window.localStorage.setItem(
      "previewBlog",
      JSON.stringify({
        title,
        image: image || "",
        text,
      })
    );
  };

  return (
    <div className={cx("blog-wrapper")}>
      <Check
        title="You have successfully posted, please wait for approval"
        className={cx({
          "show-cart": popup === true,
        })}
      />
      {/* Header */}
      <Header />
      {/* Main */}
      <main className={cx("main")}>
        <div className={cx("publish")}>
          <Link to="/previewblog" target="_blank">
            <div
              className={cx("preview", "action")}
              onClick={handlePreviewBlog}
            >
              Preview
            </div>
          </Link>
          <div className={cx("export", "action")} onClick={handleExport}>
            Export
          </div>
        </div>
        <div className={cx("form-blog")}>
          <textarea
            className={cx("form-title")}
            placeholder="Title"
            maxLength="100"
            value={title}
            onChange={handleChangeTitle}
          ></textarea>
          <div className={cx("upload-img")}>
            <h4 className={cx("title")}>Upload a thumbnail for your blog</h4>
            <div className={cx("upload")}>
              <input
                type="file"
                className={cx("input-file")}
                onChange={handlePreviewAvatar}
              />
              <p>{image.name}</p>
              <FontAwesomeIcon
                icon={faTrash}
                className={cx("icon")}
                onClick={handleRemoveFile}
              />
            </div>
          </div>
          {/* <div className={cx("tool-blog")}>
            <div className={cx("box")}>
              <div className={cx("tool")} onClick={handleToolHeader}>
                <FontAwesomeIcon icon={faHeading} className={cx("heading")} />
                <span className={cx("desc")}>Header</span>
              </div>
              <div className={cx("tool")} onClick={handleToolBold}>
                <FontAwesomeIcon icon={faBold} className={cx("bold")} />
                <span className={cx("desc")}>Bold</span>
              </div>
              <div className={cx("tool")} onClick={handleToolItalic}>
                <FontAwesomeIcon icon={faItalic} className={cx("italic")} />
                <span className={cx("desc")}>Italic</span>
              </div>
              <div className={cx("tool")} onClick={handleToolUnderline}>
                <FontAwesomeIcon
                  icon={faUnderline}
                  className={cx("underline")}
                />
                <span className={cx("desc")}>Underline</span>
              </div>
              <div className={cx("tool")} onClick={handleToolUl}>
                <FontAwesomeIcon icon={faListUl} className={cx("list-ul")} />
                <span className={cx("desc")}>Unordered list</span>
              </div>
              <div className={cx("tool")} onClick={handleToolOl}>
                <FontAwesomeIcon icon={faListOl} className={cx("list-ol")} />
                <span className={cx("desc")}>Ordered list</span>
              </div>
              <div className={cx("tool")} onClick={handleToolClear}>
                <FontAwesomeIcon icon={faTrash} className={cx("trash")} />
                <span className={cx("desc")}>Clear</span>
              </div>
            </div>
          </div> */}
          <div className={cx("content")}>
            <ReactQuill
              theme="snow"
              value={text}
              onChange={setText}
              modules={modules}
              // formats={formats}
              placeholder="Write something..."
              style={{ fontSize: "16px", height: "500px" }} // Adjust the default font size
            />
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer className={cx("footer")} />
    </div>
  );
}

export default PostBlog;
