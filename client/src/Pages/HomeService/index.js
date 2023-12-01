import Service from "~/components/Service";
import classNames from "classnames/bind";
import styles from "./HomeService.module.scss";
import { NumericFormat } from "react-number-format";
import images from "~/assets/images";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

function HomeService() {
  const [listService, setListService] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/services");
      if (res.data.code === 200) {
        setListService(res.data.data);
      }
      setIsLoading(true);
    }
    fetchData();
  }, []);

  console.log(listService);

  return (
    <div className={cx("service-wrapper")}>
      <Service title="Services">
        {isLoading === true ? (
          <div className={cx("container")}>
            <div className={cx("related")}>
              <div className={cx("list-service")}>
                {listService.map((item, index) => {
                  return (
                    <div key={index} className={cx("list-relate")}>
                      {/* Relate */}
                      <Link to={`/serviceitem/${item.id}`}>
                        <div className={cx("relate")}>
                          <div className={cx("box")}>
                            <img
                              src={`http://localhost:3000/${item.image}`}
                              className={cx("img")}
                              alt="img"
                            />
                          </div>
                          <h4 className={cx("name")}>{item.serviceName}</h4>
                          <div className={cx("list-price")}>
                            <div className={cx("price")}>
                              <NumericFormat
                                displayType="text"
                                value={item.servicePrice}
                                thousandSeparator=","
                              />
                              <span style={{ marginLeft: 5 }}>VND</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Backdrop
            sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Service>
    </div>
  );
}

export default HomeService;
