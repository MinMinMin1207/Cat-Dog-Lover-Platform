import classNames from "classnames/bind";
import styles from "./Introduction.module.scss";
import { useState, useEffect } from "react";
import images from "~/assets/images";
import { useParams } from "react-router-dom";
import axios from "axios";
import InputItem from "~/components/Layout/Author/InputItem";
import DropDownMenu from "~/components/DropDown";
import validateEditProfile from "../../Layout/Author/Validation/editProfile";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";

const cx = classNames.bind(styles);

const LIST_NAV = [
  {
    title: "General Information",
    value: "generalIF",
  },
  {
    title: "Contact Information",
    value: "contactIF",
  },
  {
    title: "Shipping Information",
    value: "shippingIF",
  },
];

const LIST_GENDER = [
  { title: "Male", value: "male" },
  {
    title: "Fmale",
    value: "fmale",
  },
  {
    title: "Different",
    value: "dff",
  },
];

function Introduction({ className, check }) {
  let params = useParams();
  const [active, setActive] = useState(LIST_NAV[0].value);
  const [checkUser, setCheckUser] = useState(false);
  const [userData, setUserData] = useState("");
  const [dob, setDob] = useState([]);

  const [edit, setEdit] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(LIST_GENDER[0]);

  const [errMsg, setErrMsg] = useState({});
  // format PhoneNumber

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/users/${params.id}`);
      setUserData(res.data.data);
      // console.log(userData);
      if (res.data.data.dob) {
        let date = res.data.data.dob.split("-");
        setDob(date);
        setDateOfBirth(`${date[0]}-${date[1]}-${date[2]}`);
      }
      setFullName(res.data.data.fullName);
      setUsername(res.data.data.userName);
      setPhoneNumber(res.data.data.phoneNumber);
    }

    async function fetchProduct() {}

    fetchData();
  }, []);

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData.id);
        console.log(params.id);
        if (decodedUserData.id === params.id) {
          setCheckUser(true);
        } else {
          setCheckUser(false);
        }
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleActive = (item) => {
    setActive(item.value);
  };

  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleBackEdit = () => {
    setEdit(false);
    window.scrollTo(0, 0);
  };

  const handleUpdateProfile = async () => {
    // console.log(1);
    const form = {
      fullName: fullName.trim(),
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber.trim(),
      username: username.trim(),
    };
    let err = validateEditProfile(form);
    setErrMsg(err);
    console.log(err);
    if (
      err.fullName === "" &&
      err.dateOfBirth === "" &&
      err.phoneNumber === "" &&
      err.username === ""
      // err.gender === ""
    ) {
      const res = await axios.put("http://localhost:3000/users/updateUser", {
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        userName: username,
        // gender: gender,
      });

      if (res.data.code === 200) {
        window.location.href = `/profile/${params.id}`;
      }
    }
    // try {

    // } catch (err) {
    //   let res = err.response;
    // }
  };
  console.log(checkUser);
  return (
    <div className={(cx("intro-wrapper"), className)}>
      {edit === false && (
        <>
          {/* Left */}
          <section className={cx("left")}>
            <div className={cx("main")}>
              <h2 className={cx("title")}>Introduction</h2>
              <div className={cx("list-nav")}>
                {LIST_NAV.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("nav", {
                        active: item.value === active,
                      })}
                      onClick={() => handleActive(item)}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Right */}
          <section className={cx("right")}>
            <div className={cx("main")}>
              {/* General */}
              {active === "generalIF" && (
                <>
                  {/* Top */}
                  <div className={cx("top")}>
                    <div className={cx("row")}>
                      <h3 className={cx("title")}>General Information</h3>
                      {check === true && (
                        <figure
                          className={cx("edit")}
                          onClick={handleEditProfile}
                        >
                          <img
                            src={images.updateIcon}
                            alt="Edit"
                            className={cx("icon")}
                          />
                          <span className={cx("name")}>Edit profile</span>
                        </figure>
                      )}
                    </div>
                    {/* List about */}
                    <div className={cx("list-about")}>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>{userData.userName}</h4>
                        <span className={cx("desc")}>User name</span>
                      </div>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>{userData.fullName}</h4>
                        <span className={cx("desc")}>Full Name</span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className={cx("bottom")}>
                    <h3 className={cx("title")}>About you</h3>
                    {/* List about */}
                    <div className={cx("list-about")}>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>{userData.gender}</h4>
                        <span className={cx("desc")}>Gender</span>
                      </div>
                      {/* About */}
                      {dob.length > 0 ? (
                        <div className={cx("about")}>
                          <h4 className={cx("name")}>
                            {dob[2]} - {dob[1]} - {dob[0]}
                          </h4>
                          <span className={cx("desc")}>Date of Birth</span>
                        </div>
                      ) : (
                        <div className={cx("about")}>
                          <h4 className={cx("name")}>NaN</h4>
                          <span className={cx("desc")}>Date of Birth</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* Contact */}
              {active === "contactIF" && (
                <>
                  {/* Top */}
                  <div className={cx("top")}>
                    <div className={cx("row")}>
                      <h3 className={cx("title")}>Contact Information</h3>
                      {checkUser === true && (
                        <>
                          <figure
                            className={cx("edit")}
                            onClick={handleEditProfile}
                          >
                            <img
                              src={images.updateIcon}
                              alt="Edit"
                              className={cx("icon")}
                            />
                            <span className={cx("name")}>Edit profile</span>
                          </figure>
                        </>
                      )}
                      {checkUser === false && <></>}
                    </div>
                    {/* List about */}
                    <div className={cx("list-about")}>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>{userData.email}</h4>
                        <span className={cx("desc")}>Emaill</span>
                      </div>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>{userData.phoneNumber}</h4>
                        <span className={cx("desc")}>Phone number </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Shipping */}
              {active === "shippingIF" && (
                <>
                  {/* Top */}
                  <div className={cx("top")}>
                    <div className={cx("row")}>
                      <h3 className={cx("title")}>Store Information</h3>
                    </div>
                    {/* List about */}
                    <div className={cx("list-about")}>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>10,000,000 products</h4>
                        <span className={cx("desc")}>Total Products </span>
                      </div>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>3 orders</h4>
                        <span className={cx("desc")}>
                          Total products have been sold{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className={cx("bottom")}>
                    <h3 className={cx("title")}>Cart Information</h3>
                    {/* List about */}
                    <div className={cx("list-about")}>
                      {/* About */}
                      <div className={cx("about")}>
                        <h4 className={cx("name")}>1,000,000 bills</h4>
                        <span className={cx("desc")}>
                          Total orders have bought
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}
      {edit === true && (
        <div className={cx("edit-profile")}>
          <h3 className={cx("title")}>Update Profile</h3>
          <div>
            <div className={cx("row")}>
              <InputItem
                type="text"
                title="User Name"
                placeholder="User Name *"
                value={username}
                setValue={setUsername}
                className={cx("input-item")}
              />
              {errMsg.username && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.username}
                </p>
              )}
              <InputItem
                type="date"
                title="Date of Birth"
                placeholder="Date of Birth *"
                value={dateOfBirth}
                setValue={setDateOfBirth}
                className={cx("input-item")}
              />
              {errMsg.dateOfBirth && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.dateOfBirth}
                </p>
              )}
            </div>
            <div className={cx("row")}>
              <InputItem
                type="text"
                title="Full Name"
                placeholder="Full Name *"
                value={fullName}
                setValue={setFullName}
                className={cx("input-item")}
              />
              {errMsg.fullName && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.fullName}
                </p>
              )}
              <InputItem
                type="text"
                title="Phone Number"
                placeholder="Phone Number *"
                value={phoneNumber}
                setValue={setPhoneNumber}
                className={cx("input-item")}
              />
              {errMsg.phoneNumber && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.phoneNumber}
                </p>
              )}
            </div>
            {/* Row address*/}
            {/* <div className={cx("row", "col")}>
              <InputItem
                type="text"
                title="Street address *"
                placeholder="Street address"
                value={streetAddress}
                setValue={setStreetAddress}
                className={cx("input-item")}
              />
              {errMsg.streetAddress && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.streetAddress}
                </p>
              )}
              <InputItem
                type="text"
                title=""
                placeholder="Apartment, suite, unit, etc. (optional)"
                value={streetOptional}
                setValue={setStreetOptional}
                className={cx("input-item")}
              />
              {errMsg.streetOptional && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {errMsg.streetOptional}
                </p>
              )}
            </div> */}

            <div className={cx("row")}>
              <DropDownMenu
                title="Select Post Purpose *"
                ListValue={LIST_GENDER}
                value={gender}
                setValue={setGender}
                className={cx("input-item", "input-desc")}
              />
            </div>
          </div>
          <div className={cx("actions")}>
            <div className={cx("action")} onClick={handleBackEdit}>
              Back
            </div>
            <div className={cx("action")} onClick={handleUpdateProfile}>
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Introduction;
