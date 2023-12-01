import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

const cx = classNames.bind(styles);

function Service({ title, children }) {
  return (
    <div className={cx("service-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("service-hero")}>
        <h2 className={cx("heading")}>SERVICES</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>{title}</span>
        </span>
      </div>
      <main className={cx("main")}>{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Service;
