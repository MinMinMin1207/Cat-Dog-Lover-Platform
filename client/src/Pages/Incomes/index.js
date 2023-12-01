import classNames from "classnames/bind";

import styles from "./Incomes.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Incomes(){


    return(
        <div className={cx("incomes-wrapper")}>
            <div className={cx("incomes-table")}>
                <div className={cx("incomes-header")}>
                    <h1 className={cx("heading")}>Incomes</h1>
                    <div className={cx("center")}></div>
                </div>
                <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                        <tr>
                            <th className={cx("table-item", "orderID")}>Order ID</th>
                            <th className={cx("table-item", "customerName")}>Customer Name</th>
                            <th className={cx("table-item", "orderCost")}>Order Cost</th>
                            <th className={cx("table-item", "fund")}>Fund *</th>
                        </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                        <tr>
                            <td className={cx("table-item", "orderID")}>1</td>
                            <td className={cx("table-item", "customerName")}>1</td>
                            <td className={cx("table-item", "orderCost")}>1</td>
                            <td className={cx("table-item", "fund")}>1</td>
                   
                        </tr>
                    </tbody>
                </table>
            </div>
            <span className={cx("foot-desc")}>
            * Fund is calculated based on the order amount minus taxes and other fees, in accordance with the <Link to="/termuser">service terms of the platform</Link>.
          </span>
          
        </div>
       
    );
}

export default Incomes;