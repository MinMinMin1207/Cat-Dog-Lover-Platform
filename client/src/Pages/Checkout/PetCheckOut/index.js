import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./Checkout.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import InputItem from "~/components/Layout/Author/InputItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart } from "~/Redux/cartSlice";
import checkOut from "~/components/Layout/Author/Validation/checkOut";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const COUNTRY = [
  {
    title: "Viet Nam",
  },
  {
    title: "Foreign Nation",
  },
];

const LIST_SHIP = [
  {
    id: 2,
    name: "Standard Delivery",
    value: 50000,
  },
  {
    id: 1,
    name: "Express Delivery",
    value: 80000,
  },
];

const PAYMENT = [
  {
    id: 1,
    name: "Cash on delivery",
    desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
    value: "cash",
  },
  {
    id: 2,
    name: "Direct bank transfer",
    desc: "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
    value: "vnpay",
  },
];

// const ITEM = [
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
// ];

function PetCheckout() {
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g + " VND", "$1,");
  }
  console.log(currencyFormat(2665));
  const dispatch = useDispatch();
  // const
  const LIST_CART = useRef(JSON.parse(window.localStorage.getItem("Pet")));
  // const totalProduct = LIST_CART.current.reduce((total, currentValue) => {
  //   return total + currentValue.data.price * currentValue.data.quantity;
  // }, 0);

  const [shipping, setShipping] = useState(0);

  const totalProduct = useRef(LIST_CART.current.data.price);

  const [fullName, setFullName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [company, setCompany] = useState("");
  // const [country, setCountry] = useState(COUNTRY[0]);
  const [streetAddress, setStreetAddress] = useState("");
  const [streetOptional, setStreetOptional] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [ship, setShip] = useState(LIST_SHIP[0]);
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState(PAYMENT[0]);
  const [checkbox, setCheckbox] = useState(false);
  const [checkDelivery, setCheckDelivery] = useState(false);
  const [totalList, setTotalList] = useState(0);
  const [delivery, setDelivery] = useState({
    receiverName: "",
    receiverAddress: "",
    receiverPhone: "",
  });
  const [error, setError] = useState({});
  const [boxUser, setBoxUser] = useState("");
  const [checkRemove, setCheckRemove] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        let res = await axios.get("http://localhost:3000/deliveries"); //Error
        if (res.data.data === null) {
          setCheckDelivery(false);
        } else {
          setDelivery(res.data.data);
          setCheckDelivery(true);
          setBoxUser(res.data.data[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (ship !== "")
      setTotalList(
        totalProduct.current + ship.value + totalProduct.current / 10
      );
  }, [ship]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("http://localhost:3000/deliveries");
        if (res.data.data === null) {
          setCheckDelivery(false);
        } else {
          setDelivery(res.data.data);
          if (res.data.data.length > 0) {
            setCheckDelivery(true);
          } else {
            setCheckDelivery(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    setCheckRemove(false);
  }, [checkRemove]);

  const handleCreateDelivery = async () => {
    const errorForm = checkOut({
      fullName: fullName.trim(),
      streetAddress: streetAddress.trim(),
      streetOptional: streetOptional.trim(),
      city: city.trim(),
      phone,
    });

    setError(errorForm);
    if (
      errorForm.fullName === "" &&
      errorForm.streetAddress === "" &&
      errorForm.streetOptional === "" &&
      errorForm.city === "" &&
      errorForm.phoneNumber === ""
    ) {
      const res = await axios.post("http://localhost:3000/deliveries", {
        receiverName: fullName,
        receiverAddress: streetOptional + ", " + streetAddress + ", " + city,
        receiverPhone: phone,
      });
      if (res.data.code === 200) {
        console.log("Create Delivery");
        setCheckDelivery(true);

        async function fetchData() {
          try {
            let res = await axios.get("http://localhost:3000/deliveries");
            if (res.data.data === null) {
              setCheckDelivery(false);
            } else {
              setDelivery(res.data.data);
              setCheckDelivery(true);
            }
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      } else {
        console.log("Error");
        setCheckDelivery(false);
      }
    }
  };

  const handlePlaceOrder = async () => {
    const errorForm = checkOut({
      fullName: fullName.trim(),
      streetAddress: streetAddress.trim(),
      streetOptional: streetOptional.trim(),
      city: city.trim(),
      phone,
      checkbox: checkbox,
    });
    setError(errorForm);
    if (checkDelivery === true && checkbox === true) {
      const res = await axios.post("http://localhost:3000/orders/petOrder", {
        deliveryId: boxUser,
        Note: orderNote,
        paymentMethod: payment.value,
        ship: ship.value,
        products: {
          id: LIST_CART.current.data.id,
          quantity: LIST_CART.current.quantity,
        },
      });
      const update = await axios.put("http://localhost:3000/pets/sold_pet", {
        products: {
          id: LIST_CART.current.data.id,
          quantity: LIST_CART.current.quantity,
        },
      });
      if (res.data.code === 200) {
        window.localStorage.setItem("cartItem", JSON.stringify([]));
        window.localStorage.setItem(
          "petOrder",
          JSON.stringify({ id: res.data.data.orderId, priceShip: ship })
        );
      }
      if (payment.value === "vnpay") {
        document.getElementById("payment").submit();
      } else {
        window.location.href = "/petcheckoutorder";
      }
    }
  };

  const handleBackDelivery = () => {
    setCheckDelivery(true);
  };

  const handleRemoveAddress = async (item) => {
    console.log(item.id);

    const result = await axios.post("http://localhost:3000/deliveries/delete", {
      id: item.id,
    });
    if (result) {
      console.log("delete");
      setCheckRemove(true);
    } else {
      console.log("fail");
      setCheckRemove(false);
    }
  };

  function handleCreateAddress() {
    setCheckDelivery(false);
  }

  console.log(error.checkbox);

  return (
    <div className={cx("checkout-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}

      <div className={cx("checkout-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>CheckOut</span>
        </span>
      </div>
      {/* Body */}
      {LIST_CART.current.data.id !== null && (
        <div className={cx("body")}>
          {/* Form left */}
          {checkDelivery === false && (
            <>
              <div className={cx("form-left")}>
                <h2 className={cx("heading")}>Billing Details</h2>
                {/* Form */}
                <div className={cx("form")}>
                  {/* Row name */}
                  <div className={cx("row", "col")}>
                    {/* Full Name */}
                    <InputItem
                      type="text"
                      title="Full name (First and Last name) "
                      placeholder="Full name (First and Last name)"
                      value={fullName}
                      setValue={setFullName}
                      className={cx("input-item")}
                    />
                    {error.fullName && (
                      <p
                        style={{ color: "red", marginTop: 10, paddingLeft: 5 }}
                      >
                        {error.fullName}
                      </p>
                    )}
                  </div>
                  {/* Row address*/}
                  <div className={cx("row", "col")}>
                    <InputItem
                      type="text"
                      title="Street address *"
                      placeholder="Street address"
                      value={streetAddress}
                      setValue={setStreetAddress}
                      className={cx("input-item")}
                    />
                    {error.streetAddress && (
                      <p
                        style={{ color: "red", marginTop: 10, paddingLeft: 5 }}
                      >
                        {error.streetAddress}
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
                    {error.streetOptional && (
                      <p
                        style={{ color: "red", marginTop: 10, paddingLeft: 5 }}
                      >
                        {error.streetOptional}
                      </p>
                    )}
                  </div>

                  {/* Row tow/city*/}
                  <div className={cx("row", "col")}>
                    <InputItem
                      type="text"
                      title="Town / City *"
                      placeholder="Town / City"
                      value={city}
                      setValue={setCity}
                      className={cx("input-item")}
                    />
                    {error.city && (
                      <p
                        style={{ color: "red", marginTop: 10, paddingLeft: 5 }}
                      >
                        {error.city}
                      </p>
                    )}
                  </div>

                  {/* Row phone*/}
                  <div className={cx("row", "col")}>
                    <InputItem
                      type="number"
                      title="Phone number *"
                      placeholder="Phone number"
                      value={phone}
                      setValue={setPhone}
                      className={cx("input-item")}
                    />
                    {error.phoneNumber && (
                      <p
                        style={{ color: "red", marginTop: 10, paddingLeft: 5 }}
                      >
                        {error.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className={cx("list-actions")}>
                    {delivery.length > 0 && (
                      <div
                        className={cx("action")}
                        onClick={handleBackDelivery}
                      >
                        Back
                      </div>
                    )}
                    <div
                      className={cx("action")}
                      onClick={handleCreateDelivery}
                    >
                      Create
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {checkDelivery === true && (
            <>
              <div className={cx("form-left")}>
                <div className={cx("list")}>
                  {/* List product */}
                  <div className={cx("top")}>
                    <h2 className={cx("heading")}>Billing Details</h2>
                    <h4 className={cx("title")}>Picking an address</h4>
                  </div>
                  <div className={cx("border")}></div>
                  <div className={cx("list-user")}>
                    {delivery.map((item, index) => (
                      <div key={index} className={cx("user")}>
                        <div className={cx("info")}>
                          <div className={cx("name-phone")}>
                            <h4 className={cx("name")}>{item.receiverName}</h4>
                            <div className={cx("border-user")}></div>
                            <h4 className={cx("phone")}>
                              {item.receiverPhone}
                            </h4>
                            <div className={cx("actions")}>
                              {item.id === boxUser && (
                                <div className={cx("action")}>Default</div>
                              )}
                              <div
                                className={cx("action")}
                                onClick={() => handleRemoveAddress(item)}
                              >
                                Remove
                              </div>
                            </div>
                          </div>
                          <div className={cx("list-address")}>
                            <h4 className={cx("text")}>{item.streetName}</h4>
                            <h4 className={cx("text")}>
                              {item.receiverAddress}
                            </h4>
                            <h4 className={cx("text")}>{item.apartment}</h4>
                          </div>
                        </div>
                        <input
                          type="radio"
                          className={cx("radio")}
                          checked={item.id === boxUser}
                          onChange={() => setBoxUser(item.id)}
                        />
                      </div>
                    ))}
                    <div
                      className={cx("create-address")}
                      onClick={handleCreateAddress}
                    >
                      Create new address
                    </div>
                  </div>
                  <InputItem
                    title="Order Notes (optional)"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    value={orderNote}
                    setValue={setOrderNote}
                    className={cx("order-note")}
                  />
                </div>
              </div>
            </>
          )}

          {/* Form right */}
          <div className={cx("form-right")}>
            {/* Box order*/}
            <div className={cx("box", "box-order")}>
              <h2 className={cx("heading")}>Your Order</h2>
              {/* Product */}
              <div className={cx("product")}>
                <h3 className={cx("title")}>Product</h3>
                <div className={cx("list")}>
                  {/* List product */}
                  <div className={cx("item")}>
                    <h3 className={cx("name")}>
                      {LIST_CART.current.data.title}
                    </h3>
                    <div className={cx("price")}>
                      <span className={cx("name")}>
                        <NumericFormat
                          displayType="text"
                          value={
                            Math.round(
                              LIST_CART.current.data.price *
                                LIST_CART.current.data.quantity *
                                100
                            ) / 100
                          }
                          thousandSeparator=","
                        />
                        <span> VND</span>
                      </span>
                      <span className={cx("vat")}>(ex. VAT)</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sub total */}
              <div className={cx("sub-total")}>
                <h3 className={cx("title")}>Subtotal</h3>
                <span className={cx("price")}>
                  <span className={cx("name")}>
                    {" "}
                    <NumericFormat
                      displayType="text"
                      value={totalProduct.current}
                      thousandSeparator=","
                    />{" "}
                    VND
                  </span>
                  <span className={cx("vat")}>(ex. VAT)</span>
                </span>
              </div>
              {/* Shipping */}
              <div className={cx("shipping")}>
                <div className={cx("top")}>
                  <h3 className={cx("title")}>Shipping</h3>
                  <span className={cx("price")}>
                    <span className={cx("name")}>
                      {" "}
                      {ship.id === 1 ? (
                        <NumericFormat
                          displayType="text"
                          value={50000 + 20000}
                          thousandSeparator=","
                        />
                      ) : (
                        <NumericFormat
                          displayType="text"
                          value={50000}
                          thousandSeparator=","
                        />
                      )}{" "}
                      VND
                    </span>
                  </span>
                </div>
                <div className={cx("list-ship")}>
                  {LIST_SHIP.map((item, index) => {
                    return (
                      <div key={index} className={cx("item")}>
                        <input
                          type="radio"
                          id={item.name}
                          checked={ship.id === item.id}
                          onChange={() => setShip(item)}
                        />
                        <label htmlFor={item.name} className={cx("name")}>
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* VAT */}
              <div className={cx("vat-price")}>
                <h3 className={cx("title")}>VAT(3% totalProduct)</h3>
                <span className={cx("price")}>
                  <span className={cx("name")}>
                    <NumericFormat
                      displayType="text"
                      value={(totalProduct.current / 100) * 3}
                      thousandSeparator=","
                    />{" "}
                    VND
                  </span>
                </span>
              </div>
              {/* Total */}
              <div className={cx("total")}>
                <h3 className={cx("title")}>Total</h3>
                <span className={cx("price")}>
                  <span className={cx("name")}>
                    {ship.id === 1 ? (
                      <NumericFormat
                        displayType="text"
                        value={
                          totalProduct.current +
                          ship.value +
                          totalProduct.current * 0.03
                        }
                        thousandSeparator=","
                      />
                    ) : (
                      <NumericFormat
                        displayType="text"
                        value={
                          totalProduct.current +
                          ship.value +
                          totalProduct.current * 0.03
                        }
                        thousandSeparator=","
                      />
                    )}{" "}
                    VND
                  </span>
                </span>
              </div>
            </div>
            {/* Box coupon*/}
            <div className={cx("box", "box-coupon")}>
              <p className={cx("heading")}>
                If you have a coupon code, please apply it below.
              </p>
              <div className={cx("form")}>
                <InputItem
                  placeholder="Coupon code"
                  value={coupon}
                  setValue={setCoupon}
                  className={cx("input-item")}
                />
                <div className={cx("action")}>Apply</div>
              </div>
            </div>
            {/* Box payment */}
            <div className={cx("box", "box-payment")}>
              {/* Payment */}
              <div className={cx("payment")}>
                <div className={cx("list-payment")}>
                  {PAYMENT.map((item, index) => {
                    return (
                      <div key={index} className={cx("item")}>
                        <section className={cx("select")}>
                          <input
                            type="radio"
                            id={item.name}
                            checked={payment.id === item.id}
                            onChange={() => setPayment(item)}
                          />
                          <label htmlFor={item.name} className={cx("name")}>
                            {item.name}
                          </label>
                        </section>
                        {payment.id === item.id && (
                          <section className={cx("desc")}>{item.desc}</section>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* policy */}
              <div className={cx("policy")}>
                <h3 className={cx("title")}>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </h3>
              </div>
              {/* checkbox */}
              <div className={cx("checkbox")}>
                <div className={cx("row")}>
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                  />
                  <label htmlFor="checkbox" className={cx("title")}>
                    I have read and agree to the website <Link to="/termuser">terms and conditions *</Link>
                  </label>
                </div>
                {error.checkbox && (
                  <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                    {error.checkbox}
                  </p>
                )}
              </div>

              {/* submit */}

              <div className={cx("submit")} onClick={handlePlaceOrder}>
                Place order
              </div>
              {/* <button onClick={handlePlaceOrder}>tinh tien</button>
               */}
              <form
                id="payment"
                method="POST"
                action="http://localhost:3000/vnpay/create_payment_peturl"
              >
                {/* Payment */}
                <input type="hidden" name="amount" value={totalList} />
                <input type="hidden" name="language" value="vn" />
                <input type="hidden" name="bankCode" value="" />
                {/* <input type="hidden" name="address" value={receiverAddress} /> */}
                {/* <input type="hidden" name="seller" value={} /> */}
                {/* create Order */}
              </form>
            </div>
          </div>
        </div>
      )}
      {LIST_CART.current.data.id === null && (
        <div className={cx("body")}>
          <h2 className={cx("non-cart")}>Please select something before checking-out</h2>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PetCheckout;
