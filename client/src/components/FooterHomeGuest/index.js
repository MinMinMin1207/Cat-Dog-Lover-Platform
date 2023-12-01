import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from "./Footer.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Footer() {
  const handleScroolTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-container")}>
        {/* Header */}
        <div className={cx("header")}>
          <div className={cx("header-left")}>
            <img
              src={images.logo}
              alt="PawsandWhiskers"
              className={cx("logo-footer")}
            />
            <div className={cx("text-logo")}>
              <span className={cx("paws")}>Paws</span>
              <span className={cx("and")}>and</span>
              <span className={cx("whiskers")}>Whiskers</span>
            </div>
          </div>
          <div className={cx("header-right")}>
            <img className={cx("icon")} src={images.instaIcon} alt="Insta" />
            <img
              className={cx("icon")}
              src={images.facebookIcon}
              alt="Facebook"
            />
          </div>
        </div>
        {/* Border */}
        <div className={cx("borders")}>
          <div className={cx("border")}></div>
          <div className={cx("top")} onClick={handleScroolTop}>
            <img src={images.topFooter} alt="top" className={cx("icon")} />
          </div>
          <div className={cx("border")}></div>
        </div>
        {/* Heading */}
        <div className={cx("form")}>
          <h2 className={cx("heading")}>Are you ready to get started?</h2>
          <div className={cx("info")}>
            <Button className={cx("button-hero")}>Book now</Button>
            <div className={cx("address")}>
              <p className={cx("text", "number")}>+84 380 975 12</p>
              <p className={cx("text", "email")}>
                pawsandwhiskers.200@gmail.com
              </p>
            </div>
          </div>
          <div className={cx("row")}>
            <img
              src={images.footerHomeGuest}
              alt="Footer"
              className={cx("img")}
            />
            <div className={cx("list-text")}>
              <span className={cx("text")}>Privacy</span>
              <span className={cx("text")}>Terms</span>
              <span className={cx("text")}>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
