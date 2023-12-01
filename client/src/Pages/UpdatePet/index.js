import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./update.module.scss";
import InputItem from "~/components/Layout/Author/InputItem";
import Wrapper from "~/components/Upload/Wrapper";
import { useState, useEffect } from "react";
import DropDownMenu from "~/components/DropDown";
import { validateForm } from "../../components/Layout/Author/Validation/updateProduct";
import axios from "axios";
import { useParams } from "react-router-dom";

import Check from "~/components/Popup/Check";

const cx = classNames.bind(styles);

const PURPOSE = [
  {
    value: "Profit",
    title: "Profit",
  },
  {
    value: "Gift",
    title: "Gift",
  },
];

const SPECIES = [
  {
    value: "Cat",
    title: "CAT",
  },
  {
    value: "Dog",
    title: "DOG",
  },
];

function UpdatePet() {
  let params = useParams();

  const [popup, setPopup] = useState(false); //show popup
  const [petName, setPetName] = useState("");
  const [purpose, setPurpose] = useState(PURPOSE[0].value);
  const [desc, setDesc] = useState("");
  const [species, setSpecies] = useState(SPECIES[0].value);
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [pet, setPet] = useState("");

  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/pets/${params.id}`);
      console.log(res.data.data);
      setPet(res.data.data);
      setPetName(res.data.data.petName);
      setDesc(res.data.data.post.content);
      setSpecies(res.data.data.species);
      setAge(res.data.data.age);
      setBreed(res.data.data.breed);
      setPrice(res.data.data.petPrice);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopup(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [popup]);

  const handleUnvailable = () => {};
  const handleUpdate = async () => {
    const form = {
      petName: petName,
      description: desc,
      breed: breed,
      age: age,
      price: price,
    };
    let err = validateForm(form);
    setError(err);
    try {
      if (
        err.petName === "" &&
        err.description === "" &&
        err.breed === "" &&
        err.age === "" &&
        err.price === ""
      ) {
        const res = await axios.put("http://localhost:3000/pets/updateinfo", {
          petId: params.id,
          petName,
          desc,
          breed,
          age,
          price,
        });
        if (res.data.code === 200) {
          setPopup(true);
          window.location.href = `/pet/${params.id}`;
        }
      }
    } catch (err) {
      let res = error.response;
      console.log(res.data);
    }
  };

  return (
    <div className={cx("update-wrapper")}>
      <Check
        title="The product has been added to the cart"
        className={cx({
          "show-cart": popup === true,
        })}
      />
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("update-hero")}>
        <h2 className={cx("heading")}>UPDATING PRODUCT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>UpdateProduct</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        <Wrapper className={cx("wrapper-form")}>
          <h1 className={cx("heading")}>Update Information</h1>
          {/* Header */}
          <div className={cx("header")}>
            {/* Img */}
            <div className={cx("images-product")}>
              <img
                src={`http://localhost:3000/${pet.image}`}
                alt="Images"
                className={cx("img")}
              />
            </div>
            {/* Form */}
            <div className={cx("form")}>
              <InputItem
                type="text"
                title="Pet Name *"
                placeholder="Pet Name"
                value={petName}
                setValue={setPetName}
                className={cx("input-item")}
              />
              {error.petName && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.petName}
                </p>
              )}
              {/* <DropDownMenu
                title="Select Post Purpose *"
                ListValue={PURPOSE}
                value={purpose}
                setValue={setPurpose}
                className={cx("input-item", "input-desc")}
              /> */}
            </div>
          </div>
          {/* Body */}
          <div className={cx("body")}>
            {/* Input item */}
            <div className={cx("input-desc")}>
              <label htmlFor="Desc" className={cx("label-desc")}>
                Description *
              </label>
              <textarea
                type="text"
                placeholder="Enter something related to your pet here ..."
                id="Desc"
                className={cx("text-area")}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              {error.description && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.description}
                </p>
              )}
            </div>
            {/* Input item */}
            <DropDownMenu
              title="Species *"
              ListValue={SPECIES}
              value={species}
              setValue={setSpecies}
              className={cx("input-item", "input-desc")}
            />
            {/* Input item */}
            <InputItem
              type="text"
              title="Breed *"
              placeholder="Breed"
              value={breed}
              setValue={setBreed}
              className={cx("input-item")}
            />
            {error.breed && (
              <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                {error.breed}
              </p>
            )}
            <div className={cx("row")}>
              {/* Input item */}
              <InputItem
                type="number"
                title="Age *"
                placeholder="Age"
                value={age}
                setValue={setAge}
                className={cx("input-item")}
              />
              {error.age && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.age}
                </p>
              )}
              {/* Input item */}
              <InputItem
                type="number"
                title="Price *"
                placeholder="Price"
                value={price}
                setValue={setPrice}
                className={cx("input-item")}
              />
              {error.price && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.price}
                </p>
              )}
            </div>
          </div>
          <div className={cx("row", "actions")}>
            <div className={cx("action")} onClick={handleUnvailable}>
              SET UNVAILABLE
            </div>
            <div className={cx("action", "active")} onClick={handleUpdate}>
              UPDATE
            </div>
          </div>
        </Wrapper>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UpdatePet;
