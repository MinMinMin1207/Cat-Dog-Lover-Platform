import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./updatePet.module.scss";
import InputItem from "~/components/Layout/Author/InputItem";
import Wrapper from "~/components/Upload/Wrapper";
import { useState, useEffect } from "react";
import DropDownMenu from "~/components/DropDown";
import { validateFormProduct } from "~/components/Layout/Author/Validation/updateProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../Product";
import Check from "~/components/Popup/Check";

const cx = classNames.bind(styles);

const TYPEOFPET = [
  {
    value: "Cat",
    title: "Cat",
  },
  {
    value: "Dog",
    title: "Dog",
  },
];

const TYPEOFPRODUCT = [
  {
    value: "toy",
    title: "Toys",
  },
  {
    value: "food",
    title: "Foods",
  },
  {
    value: "others",
    title: "Other",
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

const SIZE = [
  {
    value: "XXS",
    title: "XXS",
  },
  {
    value: "XS",
    title: "XS",
  },
  {
    value: "S",
    title: "S",
  },
  {
    value: "M",
    title: "M",
  },
  {
    value: "L",
    title: "L",
  },
  {
    value: "XL",
    title: "XL",
  },
];

function UpdateProduct() {
  let params = useParams();
  const [popup, setPopup] = useState(""); //show popup
  const [quantity, setQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [typeOfPet, setTypeOfPet] = useState(TYPEOFPET[0].value);
  const [typeOfProduct, setTypeOfProduct] = useState(TYPEOFPRODUCT[0].value);
  const [desc, setDesc] = useState("");
  // const [species, setSpecies] = useState(SPECIES[0].value);
  // const [breed, setBreed] = useState("");
  // const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState(SIZE[0].value);

  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/products/${params.id}`);
      console.log(res.data.data);
      if (res.data.data.typeOfPet === "Cat") {
        setTypeOfPet(res.data.data.typeOfPet);
      } else if (res.data.data.typeOfPet === "Dog") {
        setTypeOfPet(res.data.data.typeOfPet);
      }
      if (res.data.data.typeofProduct === "toy") {
        setTypeOfProduct(res.data.data.typeofProduct);
      } else if (res.data.data.typeofProduct === "food") {
        setTypeOfProduct(res.data.data.typeofProduct);
      } else if (res.data.data.typeofProduct === "others") {
        setTypeOfProduct(res.data.data.typeofProduct);
      }
      setProduct(res.data.data);
      setProductName(res.data.data.productName);
      setDesc(res.data.data.post.content);
      setQuantity(res.data.data.quantity);
      setPrice(res.data.data.price);
      setSize(res.data.data.size);
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
      productName,
      description: desc,
      quantity: quantity,
      size: size,
      price: price,
    };

    let err = validateFormProduct(form);
    setError(err);

    try {
      if (
        err.productName === "" &&
        err.description === "" &&
        err.quantity === "" &&
        err.size === "" &&
        err.price === ""
      ) {
        const res = await axios.put(
          "http://localhost:3000/products/update_product",
          {
            productId: params.id,
            productName: productName,
            desc: desc,
            quantity: quantity,
            price: price,
            size: size,
            typeOfPet: typeOfPet,
            typeOfProduct: typeOfProduct,
          }
        );
        if (res.data.code === 200) {
          setPopup(true);
          window.location.href = `/product/${params.id}`;
        }
      }
    } catch (err) {
      let res = error.response;
      console.log(res.data);
    }
  };

  console.log(error);

  return (
    <div className={cx("update-wrapper")}>
      <Check
        title="The product has been updated "
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
                src={`http://localhost:3000/.${product.image}`}
                alt="Images"
                className={cx("img")}
              />
            </div>
            {/* Form */}
            <div className={cx("form")}>
              <InputItem
                type="text"
                title="Product Name *"
                placeholder="Product Name"
                value={productName}
                setValue={setProductName}
                className={cx("input-item")}
              />
              {error.productName && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.productName}
                </p>
              )}
              <DropDownMenu
                title="Type of pet"
                ListValue={TYPEOFPET}
                value={typeOfPet}
                setValue={setTypeOfPet}
                className={cx("input-item", "input-desc")}
              />

              <DropDownMenu
                title="Type of product"
                ListValue={TYPEOFPRODUCT}
                value={typeOfProduct}
                setValue={setTypeOfProduct}
                className={cx("input-item", "input-desc")}
              />
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
            {/* <DropDownMenu
              title="Species *"
              ListValue={SPECIES}
              value={species}
              setValue={setSpecies}
              className={cx("input-item", "input-desc")}
            /> */}
            {/* Input item */}
            <InputItem
              type="number"
              title="Quantity *"
              placeholder="Quantity"
              value={quantity}
              setValue={setQuantity}
              className={cx("input-item")}
            />
            {error.quantity && (
              <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                {error.quantity}
              </p>
            )}
            <div className={cx("row")}>
              {/* Input item */}
              <div className={cx("col")}>
                <DropDownMenu
                  title="Size *"
                  ListValue={SIZE}
                  value={size}
                  setValue={setSize}
                  className={cx("input-item", "input-desc")}
                />
              </div>
              {/* {error.age && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.age}
                </p>
              )} */}
              {/* Input item */}
              <div className={cx("col")}>
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

export default UpdateProduct;
