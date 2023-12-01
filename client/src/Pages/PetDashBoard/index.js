import classNames from "classnames/bind";
import images from "~/assets/images";

import styles from "./PetDashBoard.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

const cx = classNames.bind(styles);

function PetDashBoard() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:3000/orders/manage_pet_order/admin/done`
      );
      console.log(res.data.data);
      if (res.data.code === 200) {
        console.log(res.data);
        let list = [];
        res.data.paging.forEach((item, index) => {
          let paging = res.data.data.filter((x) => x.id === item.petId);
          list.push({
            orderId: item.id,
            status: item.status,
            orderCost: paging[0].petPrice,
            customerNote: item.note,
          });
        });
        let total = list.reduce(
          (accumulator, currentValue) => accumulator + currentValue.orderCost,
          0
        );
        // setListPending(list);
        setTotal((total * 3) / 100);
        setList(list);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={cx("pending-wrapper")}>
      <div className={cx("pending-post")}>
        <div className={cx("pending-header")}>
          <h1 className={cx("heading")}>Pet</h1>
          <div>
            Total:{" "}
            <NumericFormat
              displayType="text"
              value={total}
              thousandSeparator=","
            />{" "}
            VND
          </div>
        </div>
        <table className={cx("table")}>
          <thead className={cx("table-header")}>
            <tr>
              <th className={cx("table-item", "title")}>NO</th>
              <th className={cx("table-item", "title")}>ORDER ID</th>
              <th className={cx("table-item", "title")}>STATUS</th>
              <th className={cx("table-item", "title")}>ORDER COST</th>
              <th className={cx("table-item", "title")}>CUSTOMER’S NOTE</th>
            </tr>
          </thead>
          {list.length > 0 && (
            <tbody className={cx("table-body")}>
              {/* Row */}
              {list.map((item, index) => {
                return (
                  <tr key={index} className={cx("row")}>
                    <td className={cx("table-item", "number")}>{index + 1}</td>
                    <td className={cx("table-item", "number")}>
                      {item.orderId}
                    </td>
                    <td className={cx("table-item", "status")}>
                      {item.status}
                    </td>

                    <td className={cx("table-item", "price")}>
                      <NumericFormat
                        displayType="text"
                        value={(item.orderCost * 3) / 100}
                        thousandSeparator=","
                      />{" "}
                      VND
                    </td>
                    <td className={cx("table-item", "product")}>
                      {item.customerNote !== "" && (
                        <h4 className={cx("username")}>{item.customerNote}</h4>
                      )}
                      {item.customerNote === "" && (
                        <h4 className={cx("username")}>None</h4>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default PetDashBoard;
