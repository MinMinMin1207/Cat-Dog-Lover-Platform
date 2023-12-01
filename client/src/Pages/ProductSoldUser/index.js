import classNames from "classnames/bind";
import styles from "./ProductSold.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const cx = classNames.bind(styles);

function ProductSold() {
  return (
    <div className={cx("manage-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("manage-hero")}>
        <h2 className={cx("heading")}>PRODUCTS SOLD</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>PrductsSoldOut</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Header */}
        <header className={cx("header")}>
          <h2 className={cx("title")}>List of products have been sold</h2>
        </header>
        {/* Body */}
        <div className={cx("body")}>
          {/* Cash payment */}
          <div className={cx("cash")}>
            {/* <h3 className={cx("heading")}>Cash payment</h3> */}
            {/* Content */}
            <div className={cx("content")}>
              {/* Column */}
              <table className={cx("table")}>
                <thead className={cx("table-header")}>
                  <tr>
                    <th className={cx("table-item", "title")}>NO</th>
                    <th className={cx("table-item", "title")}>NAME</th>
                    <th className={cx("table-item", "title")}>TYPE</th>
                    <th className={cx("table-item", "title")}>UNIT PRICE</th>
                    <th className={cx("table-item", "title")}>VIEW</th>
                    <th className={cx("table-item", "title")}>COST</th>
                  </tr>
                </thead>
                <tbody className={cx("table-body")}>
                  <tr className={cx("row")}>
                    <td className={cx("table-item", "number")}>1</td>
                    <td className={cx("table-item", "product")}>
                      <h4 className={cx("username")}>
                        carefresh®️ Small Pet Bedding - Natural - 500 grams
                      </h4>
                    </td>
                    <td className={cx("table-item", "date")}>Stuff</td>

                    <td className={cx("table-item", "price")}>
                      <NumericFormat
                        displayType="text"
                        value={170000}
                        thousandSeparator=","
                      />{" "}
                      VND
                    </td>
                    <td className={cx("table-item", "date")}>20</td>
                    <td className={cx("table-item", "price")}>
                      <NumericFormat
                        displayType="text"
                        value={170000}
                        thousandSeparator=","
                      />{" "}
                      VND
                    </td>
                  </tr>
                </tbody>
                <tfoot className={cx("table-footer")}>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={cx("table-item", "number")}>TOTAL</td>
                    <td className={cx("table-item", "price")}>
                      <span>
                        <NumericFormat
                          displayType="text"
                          value={6400000}
                          thousandSeparator=","
                        />{" "}
                        VND
                      </span>
                      <span className={cx("desc")}>
                        of total count from first day of store
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <span className={cx("foot-desc")}>
            This list has been assessed and determined in accordance with our
            terms and services.
          </span>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductSold;
