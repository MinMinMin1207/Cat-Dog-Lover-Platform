// Import Library
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

// Import components
import images from "~/assets/images";
import Button from "~/components/Button";

// Import SCSS
import styles from "./Navigation.module.scss";
import NavItem from "./NavItem";
import Service from "./Service";

const cx = classNames.bind(styles);

function Navigation({ current }) {
  return (
    <header className={cx("header")}>
      <section className={cx("navigation")}>
        <section className={cx("nav-left")}>
          {/* NavItem */}
          <Link
            to="/"
            className={cx("link-to", {
              active: current === "home",
            })}
          >
            <NavItem title="Home" tooltip={false} />
          </Link>
          <NavItem title="Service" tooltip={true} component={<Service />} />
          <NavItem title="About" tooltip={false} />
          <Link
            to="/contact"
            className={cx("link-to", {
              active: current === "contact",
            })}
          >
            <NavItem title="Contact" tooltip={false} />
          </Link>
        </section>
        <section className={cx("logo")}>
          <img src={images.logo} alt="Logo" className={cx("img")} />
          <div className={cx("text-logo")}>
            <span className={cx("paws")}>Paws</span>
            <span className={cx("and")}>and</span>
            <span className={cx("whiskers")}>Whiskers</span>
          </div>
        </section>
        <section className={cx("nav-right")}>
          <span>+84 380 975 12</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M7.5 4.5H28.5C29.2956 4.5 30.0587 4.81607 30.6213 5.37868C31.1839 5.94129 31.5 6.70435 31.5 7.5V28.5C31.5 29.2956 31.1839 30.0587 30.6213 30.6213C30.0587 31.1839 29.2956 31.5 28.5 31.5H7.5C6.70435 31.5 5.94129 31.1839 5.37868 30.6213C4.81607 30.0587 4.5 29.2956 4.5 28.5V7.5C4.5 6.70435 4.81607 5.94129 5.37868 5.37868C5.94129 4.81607 6.70435 4.5 7.5 4.5ZM18 25.5L19.08 24.51C22.95 21 25.5 18.69 25.5 15.855C25.5 13.545 23.685 11.73 21.375 11.73C20.07 11.73 18.825 12.345 18 13.305C17.582 12.8173 17.0647 12.4245 16.4827 12.1529C15.9006 11.8813 15.2673 11.7371 14.625 11.73C12.315 11.73 10.5 13.545 10.5 15.855C10.5 18.69 13.05 21 16.92 24.51L18 25.5Z"
              fill="black"
            />
          </svg>
          {/* <div className={cx("button")}>
            <span className={cx("button-title")}>Book now</span>
          </div> */}
          <Button className={cx("button")}>
            <Link to="/login" style={{ zIndex: "2" }} className={cx("login")}>
              Login
            </Link>
          </Button>
        </section>
      </section>
    </header>
  );
}

export default Navigation;
