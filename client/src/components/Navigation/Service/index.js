import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function Service() {
  return (
    <div className={cx("service-wrapper")}>
      <div className={cx("service-body")}>
        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon01}
              className={cx("service-icon")}
              alt="Pet Walking"
            />
          </div>
          <span className={cx("service-name")}>Pet Walking</span>
        </div>

        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon02}
              className={cx("service-icon")}
              alt="Bathing"
            />
          </div>
          <span className={cx("service-name")}>Bathing</span>
        </div>

        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon03}
              className={cx("service-icon")}
              alt="Daycare"
            />
          </div>
          <span className={cx("service-name")}>Daycare</span>
        </div>

        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon04}
              className={cx("service-icon")}
              alt="Training"
            />
          </div>
          <span className={cx("service-name")}>Training</span>
        </div>

        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon05}
              className={cx("service-icon")}
              alt="Boarding"
            />
          </div>
          <span className={cx("service-name")}>Boarding</span>
        </div>

        {/* Service item */}
        <div className={cx("service-item")}>
          <div className={cx("service-box")}>
            <img
              src={images.serviceIcon06}
              className={cx("service-icon")}
              alt="Grooming"
            />
          </div>
          <span className={cx("service-name")}>Grooming</span>
        </div>
      </div>
    </div>
  );
}

export default Service;
