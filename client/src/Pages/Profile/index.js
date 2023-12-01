import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import Introduction from "~/components/Profile/Introduction";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";

const cx = classNames.bind(styles);

const NAVIGATION = [
  {
    title: "Post",
    value: "Post",
  },
  {
    title: "Introduction",
    value: "Introduction",
  },
  {
    title: "Products",
    value: "Products",
  },
  {
    title: "Pictures",
    value: "Pictures",
  },
  {
    title: "Videos",
    value: "Videos",
  },
  {
    title: "More",
    value: "More",
  },
];

const OPTIONS = [
  {
    img: images.productsIcon,
    title: "Products",
    value: "products",
  },
  {
    img: images.petsIcon,
    title: "Pets",
    value: "pets",
  },
  {
    img: images.petsIcon,
    title: "Gift",
    value: "gift",
  },
];

function Profile() {
  let params = useParams();
  const [check, setCheck] = useState("");
  const [userData, setUserData] = useState("");
  const [navItem, setNavItem] = useState(NAVIGATION[0].value);
  const [option, setOption] = useState(OPTIONS[0].value);
  const [listPost, setListPost] = useState([]);

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        if (decodedUserData.id == params.id) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(check);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/users/${params.id}`);
      setUserData(res.data.data);
      console.log(userData);
    }

    async function fetchProduct() {}

    fetchData();
  }, []);

  useEffect(() => {
    if (option === "products") {
      console.log(params.id);
      async function fetchData() {
        let res = await axios.post(
          `http://localhost:3000/products/userProduct`,
          { id: params.id }
        );
        let list = res.data.data.map((item) => {
          return {
            id: item.product.id,
            productName: item.product.productName,
            img: `http://localhost:3000/${item.product.image}`,
            quantity: item.product.quantity,
            size: item.product.size,
            price: item.product.price,
            desc: item.content,
          };
        });
        setListPost(list);
      }

      fetchData();
    } else if (option === "pets") {
      async function fetchData() {
        let res = await axios.post(`http://localhost:3000/pets/userPet`, {
          id: params.id,
        });
        let list = res.data.data.map((item) => {
          return {
            id: item.pet.id,
            productName: item.pet.petName,
            img: `http://localhost:3000/${item.pet.image}`,
            quantity: item.pet.quantity,
            size: item.pet.size,
            price: item.pet.petPrice,
            desc: item.content,
          };
        });
        setListPost(list);
      }

      fetchData();
    } else if (option === "gift") {
      async function fetchData() {
        let res = await axios.post(`http://localhost:3000/gifts/userGift`, {
          id: params.id,
        });
        let list = res.data.data.map((item) => {
          return {
            id: item.pet.id,
            productName: item.pet.petName,
            img: `http://localhost:3000/${item.pet.image}`,
            quantity: item.pet.quantity,
            size: item.pet.size,
            price: item.pet.petPrice,
            desc: item.content,
          };
        });
        setListPost(list);
      }

      fetchData();
    }
  }, [option]);

  console.log(listPost);

  const handleClickNav = (item) => {
    setNavItem(item.value);
  };

  const handleChooseOption = (item) => {
    setOption(item.value);
  };

  return (
    <div className={cx("profile-wrapper")}>
      {/* Header */}
      <Header />
      {/* Main */}
      <main className={cx("main")}>
        {/* Header */}
        <header className={cx("header")}>
          <div className={cx("container")}>
            <section className={cx("images")}>
              {/* Cover photo */}
              <figure className={cx("cover-photo")}>
                <img
                  className={cx("img")}
                  src={images.optionCat}
                  alt="coverImg"
                />
                <div className={cx("actions-img")}>
                  {/* Item */}
                  <div className={cx("item")}>
                    <img
                      src={images.userAvatar}
                      alt="Create avatar"
                      className={cx("icon")}
                    />
                    <span>Create cover</span>
                  </div>
                  {/* Item */}
                  <div className={cx("item")}>
                    <img
                      src={images.editCover}
                      alt="Create avatar"
                      className={cx("icon")}
                    />
                    <span>Edit cover</span>
                  </div>
                </div>
              </figure>
              {/* Avatar */}
              <div className={cx("row")}>
                {/* left */}
                <div className={cx("left")}>
                  {/* Images */}
                  <figure className={cx("avatar")}>
                    <img
                      src={images.avatar}
                      alt="avatar"
                      className={cx("img")}
                    />
                  </figure>
                  {/* Basic info */}
                  <div className={cx("basic-info")}>
                    <div className={cx("info-name")}>
                      <h4 className={cx("name")}>{userData.fullName} </h4>
                      {/* <span className={cx("nickname")}>
                        &#40; Bentanick &#41;
                      </span> */}
                    </div>
                    <span className={cx("number-post")}>
                      {userData.userName}
                    </span>
                  </div>
                </div>
                {/* Right */}
                <div className={cx("right")}>
                  <div className={cx("actions")}>
                    {/* action */}
                    <Link to="/post">
                      <div className={cx("action", "create")}>
                        <img
                          src={images.plus}
                          alt="Create post"
                          className={cx("icon")}
                        />
                        <span className={cx("text")}>Create post</span>
                      </div>
                    </Link>
                    {/* action */}
                    {/* <div className={cx("action", "edit")}>
                      <img
                        src={images.pen}
                        alt="Edit your profile"
                        className={cx("icon")}
                      />
                      <span className={cx("text")}>Edit your profile</span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* border */}
              <div className={cx("border")}></div>
              {/* Navigation */}
              <div className={cx("navigation")}>
                {NAVIGATION.map((item, index) => (
                  <div
                    key={index}
                    className={cx("nav-item", {
                      active: navItem === item.value,
                    })}
                    onClick={() => handleClickNav(item)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </header>

        {/* Post */}
        {navItem === "Post" && (
          <div className={cx("body")}>
            <div className={cx("container")}>
              <div className={cx("body")}>
                {/* Sidebar */}
                <sidebar className={cx("sidebar")}>
                  {/* Bio */}
                  <section className={cx("bio")}>
                    <h2 className={cx("title")}>Bio</h2>
                    <span className={cx("slogan")}>
                      {userData.bio === null ? "edit bio here" : userData.bio}
                    </span>
                    <div className={cx("action")}>Edit Bio</div>
                    {/* List info */}
                    <div className={cx("info-list")}>
                      {/* Info */}
                      <div className={cx("info")}>
                        <img className={cx("icon")} src={images.store} />
                        <p className={cx("text")}>
                          Have
                          <span className={cx("name-info")}>10,000,000</span>
                          in Store
                        </p>
                      </div>
                      {/* Info */}
                      <div className={cx("info")}>
                        <img className={cx("icon")} src={images.house} />
                        <p className={cx("text")}>
                          Live at
                          <span className={cx("name-info")}>
                            Ho Chi Minh City
                          </span>
                        </p>
                      </div>
                      {/* Info */}
                      <div className={cx("info")}>
                        <img className={cx("icon")} src={images.shopping} />
                        <p className={cx("text")}>
                          Have bought
                          <span className={cx("name-info")}>
                            1,000,000 products
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={cx("action")}>Edit Profile</div>
                  </section>
                  {/* Picture */}
                  <section className={cx("picture")}>
                    <div className={cx("row")}>
                      <h2 className={cx("title")}>Picture</h2>
                      <span className={cx("text")}>View All</span>
                    </div>
                    <div className={cx("list-picture")}>
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                      <img
                        src={images.avatar}
                        alt="picture"
                        className={cx("img")}
                      />
                    </div>
                  </section>
                </sidebar>
                {/* body */}
                <div className={cx("content")}>
                  {/* Status */}
                  <div className={cx("status")}>
                    {/* Top */}
                    <div className={cx("top")}>
                      <img
                        src={images.avatar}
                        alt="avatart"
                        class={cx("avatar")}
                      />
                      <div className={cx("input-text")}>
                        <span className={cx("text")}>
                          What is in your mind ?
                        </span>
                      </div>
                    </div>
                    {/* Bottom */}
                    <div className={cx("bottom")}>
                      <div className={cx("list-icon")}>
                        {/* Icon */}
                        <div className={cx("icon")}>
                          <img src={images.reactionIcon} alt="reaction" />
                          <span className={cx("name-icon")}>Reaction</span>
                        </div>
                        {/* Icon */}
                        <div className={cx("icon")}>
                          <img src={images.pictureIcon} alt="reaction" />
                          <span className={cx("name-icon")}>Attachments</span>
                        </div>
                        {/* Icon */}
                        <div className={cx("icon")}>
                          <img src={images.privacyIcon} alt="reaction" />
                          <span className={cx("name-icon")}>Attachments</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store */}
                  <div className={cx("store")}>
                    {/* Top */}
                    <div className={cx("top")}>
                      <h3 className={cx("title")}>Store</h3>
                      {/* List action */}
                      <div className={cx("actions")}>
                        {/* Action */}
                        <div className={cx("action")}>
                          <img
                            src={images.filter}
                            className={cx("icon")}
                            alt="icon"
                          />
                          <span className={cx("name")}>Filter</span>
                        </div>
                        {/* Action */}
                        <div className={cx("action")}>
                          <img
                            src={images.setting}
                            className={cx("icon")}
                            alt="icon"
                          />
                          <span className={cx("name")}>Store Manage</span>
                        </div>
                      </div>
                    </div>
                    {/* Bottom */}
                    <div className={cx("bottom")}>
                      {/* List option */}
                      <div className={cx("list-options")}>
                        {OPTIONS.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={cx("option", {
                                active: option === item.value,
                              })}
                              onClick={() => handleChooseOption(item)}
                            >
                              <img src={item.img} alt={item.title} />
                              <span className={cx("text")}>{item.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Show list */}
                  <div className={cx("show-pets")}>
                    <div className={cx("list-pets")}>
                      {listPost.map((item, index) => {
                        return (
                          <div key={index} className={cx("pet")}>
                            {/* Top */}
                            <div className={cx("top")}>
                              <figure className={cx("image")}>
                                <img src={item.img} className={cx("img")} />
                                <span className={cx("tag")}>
                                  {item.price > 0 ? "NEW" : "GIFT"}
                                </span>
                              </figure>
                              <div className={cx("pet-info")}>
                                <h4 className={cx("name-pet")}>
                                  {item.productName}
                                </h4>
                                <h4 className={cx("date")}>
                                  September 15, 2023
                                </h4>
                                <span className={cx("price")}>
                                  <NumericFormat
                                    displayType="text"
                                    value={item.price}
                                    thousandSeparator=","
                                  />{" "}
                                  VND
                                </span>
                              </div>
                            </div>
                            {/* Bottom */}
                            <div className={cx("bottom")}>
                              <p className={cx("desc")}>{item.desc}</p>
                              {option === "products" && (
                                <Link
                                  to={`/updateproduct/${item.id}`}
                                  className={cx("action")}
                                >
                                  Update
                                </Link>
                              )}
                              {option !== "products" && (
                                <Link
                                  to={`/updatepet/${item.id}`}
                                  className={cx("action")}
                                >
                                  Update
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post */}
        {navItem === "Introduction" && (
          <div className={cx("body")}>
            <div className={cx("container")}>
              <Introduction className={cx("introduction")} check={check} />
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;
