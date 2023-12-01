// Import library
import classNames from "classnames/bind";

// Import component
import Navigation from "~/components/Navigation";
import images from "~/assets/images";
import Button from "~/components/Button";
import Footer from "~/components/FooterHomeGuest";

// Import scss
import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InputItem from "~/components/Layout/Author/InputItem";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const NUMBER_ABOUT = [
  {
    number: 1,
    title: "About care",
    value: "about care",
  },
  {
    number: 2,
    title: "About you",
    value: "about you",
  },
];

const LIST_PET = [
  {
    title: "Dog",
    value: "dog",
  },
  {
    title: "Cat",
    value: "cat",
  },
];

const INTERESTED_IN = [
  {
    title: "Pet Walking ",
    value: "petwalking",
  },
  {
    title: "Daycare",
    value: "daycare",
  },
  {
    title: "Bathing",
    value: "bathing",
  },
  {
    title: "Training",
    value: "training",
  },
  {
    title: "Boarding",
    value: "boarding",
  },
  {
    title: "Grooming",
    value: "grooming",
  },
];

function Home() {
  const [numberAbout, setNumberAbout] = useState(NUMBER_ABOUT[0].value);

  const [listPet, setListPet] = useState(LIST_PET[0].value);

  const [listInterest, setListInterest] = useState([]);

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const handleClickAbout = (item) => {
    setNumberAbout(item.value);
  };

  const handleChangePet = (item) => {
    setListPet(item.value);
  };

  const handleChangeInterest = (item) => {
    if (listInterest.includes(item.value) === true) {
      setListInterest((prev) => prev.filter((value) => value !== item.value));
    } else {
      setListInterest((prev) => [...prev, item.value]);
    }
  };

  console.log(listInterest);

  return (
    <div className={cx("home-wrapper")}>
      {/* Header  */}
      <header className={cx("header")}>
        {/* Header top */}
        <div className={cx("header-top")}>
          <div className={cx("container")}>
            {/* Navigation */}
            <Navigation current="home" />
            {/* Hero */}
            <div className={cx("hero")}>
              {/* Hero left */}
              <div className={cx("hero-left")}>
                <div className={cx("hero-title")}>
                  Paws & Love: Unite. Cherish.
                </div>
                <div className={cx("hero-action")}>
                  <a href="#learnmore">
                    <Button className={cx("button-hero", "button-black")}>
                      Learn more
                    </Button>
                  </a>
                  <a href="#letsmeet">
                    <Button className={cx("button-hero")}>
                      Make a reservation
                    </Button>
                  </a>
                </div>
              </div>
              {/* Hero right */}
              <div className="hero-right">
                <img
                  src={images.heroCat}
                  alt="Hero Cat"
                  className={cx("heroImg", "hero-cat")}
                />
                <img
                  src={images.heroDog}
                  alt="Hero Dog"
                  className={cx("heroImg", "hero-dog")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("header-bottom")}>
          {/* Header bottom */}
          <div className={cx("header-bottom")}>
            <div className={cx("container")}>
              <h2 className={cx("heading")}>
                Dog Walking & Pet Sitting Services Throughout Ho Chi Minh City
              </h2>
              <div className={cx("reviews")}>
                <img src={images.yelpLogo} alt="YelpLogo" />
                <span>4,8 Yelp reviews</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Happy pets */}
      <main className={cx("main")}>
        <div className={cx("container")}>
          {/* Happy pets */}
          <div className={cx("happy-pets")}>
            <div className={cx("left")}></div>
            <div className={cx("right")}>
              <img src={images.happyDog} className={cx("happyDog")} alt="dog" />
              <img src={images.roundtext} className={cx("slogan")} alt="anh" />
              <h1 className={cx("heading")}>Happy pets, happy humans</h1>
              <p className={cx("desc")}>
                Come see how I’m styling these final days of summer with bright
                palettes and pops of color that will dazzle your wardrobe year
                round!
              </p>
              <p className={cx("desc")}>
                How I’m styling these final days of summer with bright palettes
                and pops of color that will dazzle your wardrobe year round!
              </p>
              <div className={cx("action")}>Learn more</div>
            </div>
          </div>
          {/* Service */}
          <div className={cx("service")} id="learnmore">
            <div className={cx("service-top")}>
              <div className={cx("service-title")}>
                <img src={images.serviceIntro} className={cx("img")} />
                <h2 className={cx("heading")}>We are best in:</h2>
              </div>
            </div>
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
          {/* Reason */}
          <div className={cx("reason")}>
            <h2 className={cx("reason-heading")}>Why rely on us?</h2>
            <div className={cx("reason-body")}>
              {/* Image reason */}
              <img
                src={images.reason}
                alt="reason"
                className={cx("reason-img")}
              />

              {/* Reson left */}
              <div className={cx("reason-left")}>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
              </div>
              {/* Reson right */}
              <div className={cx("reason-right")}>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Client say */}
          <div className={cx("clients-say")}>
            <h2 className={cx("client-heading")}>Clients say: </h2>
            <div className={cx("client-body")}>
              <div className={cx("client-box")}>
                <img
                  src={images.clientImg}
                  alt="clientImg"
                  className={cx("client-img")}
                />
                <div className={cx("client-content")}>
                  <h3 className={cx("client-title")}>Hao, Molly’s dog:</h3>
                  <p className={cx("client-desc")}>
                    Kind friendly and professional, and best of all Hao
                    absolutely loved them. I would recommend CatDogLover to
                    anyone looking for dog care.
                  </p>
                  <div className={cx("client-footer")}>
                    <div className={cx("reviews")}>
                      <img
                        src={images.yelpLogo}
                        alt="YelpLogo"
                        className={cx("logo")}
                      />
                      <span>4,8 Yelp reviews</span>
                    </div>
                    <div className={cx("reviews")}>
                      <img
                        src={images.yelpLogo}
                        alt="YelpLogo"
                        className={cx("logo")}
                      />
                      <span>4,8 Yelp reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("arrow", "arrow-left")}>
              <FontAwesomeIcon icon={faAngleRight} className={cx("icon")} />
            </div>
            <div className={cx("arrow", "arrow-right")}>
              <FontAwesomeIcon icon={faAngleLeft} className={cx("icon")} />
            </div>
          </div>

          {/* Let's meet */}
          <div className={cx("lets-meet")} id="letsmeet">
            <h2 className={cx("title")}>Let’s meet!</h2>
            <div className={cx("row", "abouts")}>
              {/* About */}
              {NUMBER_ABOUT.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cx("about")}
                    onClick={() => handleClickAbout(item)}
                  >
                    <span
                      className={cx("number", {
                        active: item.value === numberAbout,
                      })}
                    >
                      {item.number}
                    </span>
                    <h4 className={cx("text")}>{item.title}</h4>
                  </div>
                );
              })}
            </div>
            {/* List box */}
            {numberAbout === "about care" && (
              <div className={cx("list-box")}>
                {/* Box */}
                <div className={cx("box", "one")}>
                  <h4 className={cx("title")}>
                    1 Day FREE daycare trail for new clients!
                  </h4>
                  <p className={cx("desc")}>
                    Reservation requared. Discount cannot be applied during peak
                    periods.
                  </p>
                </div>
                {/* Box */}
                <div className={cx("box", "two")}>
                  <h4 className={cx("title")}>
                    Pet <span style={{ color: "#F1D433" }}>*</span>
                  </h4>
                  <div className={cx("list-box")}>
                    {LIST_PET.map((item, index) => {
                      return (
                        <div key={index} className={cx("check-box")}>
                          <input
                            type="radio"
                            id={item.value}
                            checked={item.value === listPet}
                            onChange={() => handleChangePet(item)}
                          />
                          <label htmlFor={item.value} className={cx("text")}>
                            {" "}
                            {item.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Box */}
                <div className={cx("box", "three")}>
                  <h4 className={cx("title")}>Interested in</h4>
                  <div className={cx("list-box")}>
                    {INTERESTED_IN.map((item, index) => {
                      return (
                        <div key={index} className={cx("check-box")}>
                          <input
                            type="checkbox"
                            id={item.value}
                            checked={listInterest.includes(item.value) === true}
                            onChange={() => handleChangeInterest(item)}
                          />
                          <label htmlFor={item.value} className={cx("text")}>
                            {" "}
                            {item.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Box */}
                <div className={cx("box", "four")}>
                  <div className={cx("list-box")}>
                    {/* Box */}
                    <div className={cx("box")}>
                      <InputItem
                        type="date"
                        title="Date"
                        value={date}
                        setValue={setDate}
                      />
                    </div>
                    <div className={cx("box")}>
                      <InputItem
                        type="time"
                        title="Time"
                        value={time}
                        setValue={setTime}
                      />
                    </div>
                    <div className={cx("box")}>
                      <InputItem
                        type="date"
                        title="Desired length"
                        value={date}
                        setValue={setDate}
                      />
                    </div>
                  </div>
                </div>

                <Link to="/login">
                  <div className={cx("action")}>
                    <h4 className={cx("title")}>Start a reservation</h4>
                    <img
                      className={cx("icon")}
                      src={images.reservation}
                      alt="Start a reservation"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Faqs */}
          <div className={cx("faqs")}>
            <div className={cx("left")}>
              <figure className={cx("heading")}>
                <img src={images.faqSearch} alt="FAQ's" />
                <h2 className={cx("title")}>FAQ's</h2>
              </figure>
              {/* List faq */}
              <div className={cx("list-faq")}>
                {/* Faq */}
                <div className={cx("faq")}>
                  <img
                    src={images.homePlus}
                    alt="plus"
                    className={cx("icon")}
                  />
                  <h3 className={cx("text")}>
                    What time can I drop off and pick up my dog?
                  </h3>
                </div>
                {/* Faq */}
                <div className={cx("faq")}>
                  <img
                    src={images.homePlus}
                    alt="plus"
                    className={cx("icon")}
                  />
                  <h3 className={cx("text")}>
                    What should my dog bring for daycare?{" "}
                  </h3>
                </div>
                {/* Faq */}
                <div className={cx("faq")}>
                  <img
                    src={images.homePlus}
                    alt="plus"
                    className={cx("icon")}
                  />
                  <h3 className={cx("text")}>What does my dog do all day? </h3>
                </div>
                {/* Faq */}
                <div className={cx("faq")}>
                  <img
                    src={images.homePlus}
                    alt="plus"
                    className={cx("icon")}
                  />
                  <h3 className={cx("text")}>
                    How old does my dog have to be?
                  </h3>
                </div>
              </div>
            </div>
            <div className={cx("right")}></div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
