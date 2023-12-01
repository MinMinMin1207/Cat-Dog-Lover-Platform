import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import Navigation from "~/components/Navigation";
import Button from "~/components/Button";
import Validation from "~/components/Layout/Author/Validation/login";
import InputItem from "~/components/Layout/Author/InputItem";
import { useState } from "react";
import Footer from "~/components/FooterHomeGuest";

const cx = classNames.bind(styles);

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className={cx("contact-wrapper")}>
      <div className={cx("container")}>
        {/* Header */}
        <header className={cx("header")}>
          <Navigation current="contact" />
        </header>
        {/* Main */}
        <main className={cx("main")}>
          <h1 className={cx("heading")}>Contact us</h1>
          <p className={cx("slogan")}>
            We’d love to hear from you – please use the form to send us your
            message or ideas. Or simply pop in for a cup of fresh tea and a
            cookie
          </p>
          <div className={cx("info")}>
            <div className={cx("address")}>
              <h4 className={cx("text")}>
                PetMania, 1000S 8th Avenue, NY, NY 10019
              </h4>
            </div>
            <div className={cx("border")}></div>

            <div className={cx("address")}>
              <h4 className={cx("text")}>Call us: +84 380 975 12</h4>
              <h4 className={cx("text")}>
                Email: pawsandwhiskers.200@gmail.com
              </h4>
            </div>
          </div>
          <div className={cx("action")}>
            <Button className={cx("button-hero", "button-black")}>
              Make a reservation
            </Button>
          </div>
          {/* Form */}
          <div className={cx("form")}>
            <div className={cx("left")}>
              <h4 className={cx("title")}>
                Have a question or comment? Use the form below to send us a
                message.
              </h4>
            </div>
            <div className={cx("right")}>
              {/* Input item */}
              <InputItem
                type="text"
                placeholder="Your name"
                value={name}
                setValue={setName}
                className={cx("input-item")}
              />
              {/* Input item */}
              <InputItem
                type="email"
                placeholder="Your email"
                value={email}
                setValue={setEmail}
                className={cx("input-item")}
              />
              {/* Input item */}
              <InputItem
                type="text"
                placeholder="phone"
                value={phone}
                setValue={setPhone}
                className={cx("input-item")}
              />
              <textarea
                type="text"
                placeholder="Your Comment"
                className={cx("text-area")}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Button className={cx("button-hero", "button-black")}>
                Submit
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
