import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import styles from "./Cart.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "../../components/Layout/FooterMember";
import images from "~/assets/images";
import { useDispatch } from "react-redux";
import { saveToCart, addCartCheckOut } from "~/Redux/cartSlice";
import { Link } from "react-router-dom";
import Check from "~/components/Popup/Check";
import Wrong from "~/components/Popup/Wrong";
import { NumericFormat } from "react-number-format";

const cx = classNames.bind(styles);

function Cart() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(""); // Show popup add to cart

  const [showCheckout, setShowCheckout] = useState(false);

  const LIST_CART = useRef(() => {
    let arr = [];
    if (window.localStorage.getItem("cartItem")) {
      arr = JSON.parse(window.localStorage.getItem("cartItem"));
    }
    return arr;
  }, []);

  let [listCart, setListCart] = useState(LIST_CART.current());
  const [cartCheckOut, setCartCheckOut] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckout(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCheckout]);

  const handleDecrease = (cart_index, product_index) => {
    setListCart((prevListCart) => {
      const updatedCart = prevListCart.map((cart, index) => {
        if (index === cart_index) {
          return {
            ...cart,
            data: cart.data.map((product, pIndex) => {
              if (pIndex === product_index && product.quantity > 1) {
                return {
                  ...product,
                  quantity: product.quantity - 1,
                };
              }
              return product;
            }),
          };
        }
        return cart;
      });
      return updatedCart;
    });
  };

  const handleIncrease = (cart_index, product_index) => {
    const temp = [...listCart];
    const updatedCart = temp.map((cart, index) => {
      if (index === cart_index) {
        return {
          ...cart,
          data: cart.data.map((product, pIndex) => {
            if (
              pIndex === product_index &&
              product.quantity < product.cartQty
            ) {
              return {
                ...product,
                quantity: product.quantity + 1,
              };
            }
            return product;
          }),
        };
      }
      return cart;
    });
    setListCart(updatedCart);
  };

  const deleteCart = (cart_index, product_index, product) => {
    setListCart((prevListCart) => {
      const updatedListCart = [...prevListCart];

      updatedListCart[cart_index] = {
        ...updatedListCart[cart_index],
        data: updatedListCart[cart_index].data.filter(
          (item, index) => product_index !== index
        ),
      };

      if (updatedListCart[cart_index].data.length === 0) {
        setCartCheckOut((prev) =>
          prev.filter(
            (item) =>
              item.user.userId !== updatedListCart[cart_index].user.userId
          )
        );
        return updatedListCart.filter((item, index) => cart_index !== index);
      } else {
        setCartCheckOut((prev) =>
          prev.filter((item) => item.data.id !== product.id)
        );
        return updatedListCart;
      }
    });
  };

  const handleDeleteCart = () => {
    setListCart([]);
  };

  const handleUpdateCart = () => {
    setShowCart(true);
    dispatch(
      saveToCart({
        listCart: listCart,
      })
    );
    // setUpdate(true);
  };

  const handleClickAllProduct = (event, cart) => {
    let isSelected = event.target.checked;
    if (isSelected) {
      let user = cart.user;
      const list = cart.data.map((item) => {
        return {
          user: user,
          data: item,
        };
      });

      setCartCheckOut((prev) => [...list]);
    } else {
      setCartCheckOut((prev) =>
        prev.filter((item) => item.user.userId !== cart.user.userId)
      );
    }
  };

  const handleClickProduct = (event, user, product) => {
    let isSelected = event.target.checked;
    if (isSelected) {
      let list = cartCheckOut.filter(
        (item) => item.user.userId === user.userId
      );
      if (list.length > 0) {
        setCartCheckOut((prev) => [
          ...prev,
          {
            user: user,
            data: product,
          },
        ]);
      } else {
        setCartCheckOut((prev) => [
          {
            user: user,
            data: product,
          },
        ]);
      }
    } else {
      setCartCheckOut((prev) =>
        prev.filter((item) => item.data.id !== product.id)
      );
    }
  };
  // console.log(cartCheckOut);

  let totalCart = cartCheckOut.reduce(
    (total, currentValue) =>
      (total += currentValue.data.price * currentValue.data.quantity),
    0
  );

  const handleCheckOut = () => {
    dispatch(addCartCheckOut(cartCheckOut));
  };

  const handleShowPopup = () => {
    setShowCheckout(true);
  };

  return (
    <div className={cx("cart-wrapper")}>
      <Check
        title="The shopping cart has been updated"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      <Wrong
        title="You have not chosen any product"
        className={cx({
          "show-cart": showCheckout === true,
        })}
      />
      <Header />
      {/* Hero */}
      <div className={cx("cart-hero")}>
        <h2 className={cx("heading")}>WISHLIST</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Wishlist</span>
        </span>
      </div>
      {/* Main */}
      {LIST_CART.current().length > 0 && (
        <main className={cx("main-wrapper")}>
          {/* List table */}
          <div className={cx("list-table")}>
            <table className={cx("table")}>
              <thead className={cx("table-header")}>
                <tr>
                  <th className={cx("table-item", "table-buy")}>BUY</th>
                  <th className={cx("table-item", "table-image")}>IMAGE</th>
                  <th className={cx("table-item", "table-product")}>PRODUCT</th>
                  <th className={cx("table-item", "table-price")}>PRICE</th>
                  <th className={cx("table-item", "table-quantity")}>
                    QUANTITY
                  </th>
                  <th className={cx("table-item", "table-total")}>TOTAL</th>
                  <th className={cx("table-item", "table-remove")}>REMOVE</th>
                </tr>
              </thead>
              <tbody className={cx("table-body")}>
                {listCart.map((cart, indexUser) => {
                  return (
                    <>
                      <tr key={indexUser} className={cx("table-user")}>
                        <td className={cx("table-item")}>
                          <input
                            type="checkbox"
                            className={cx("checkbox")}
                            checked={
                              cartCheckOut.filter(
                                (item) => item.user.userId === cart.user.userId
                              ).length === cart.data.length
                            }
                            onChange={(event) =>
                              handleClickAllProduct(event, cart)
                            }
                          />
                        </td>
                        <tr className={cx("table-info")}>
                          <img src={cart.user.img} />
                          <span className={cx("table-name")}>
                            {cart.user.userName}
                          </span>
                        </tr>
                      </tr>
                      {cart.data.map((item, index) => {
                        return (
                          <tr key={index} className={cx("table-row")}>
                            <td className={cx("table-item")}>
                              <input
                                type="checkbox"
                                className={cx("checkbox")}
                                checked={cartCheckOut.some(
                                  (pd) => pd.data.id === item.id
                                )}
                                onChange={(event) =>
                                  handleClickProduct(event, cart.user, item)
                                }
                              />
                            </td>

                            <td className={cx("table-item", "table-image")}>
                              <div className={cx("image")}>
                                <img
                                  src={item.img}
                                  alt="cart"
                                  className={cx("img")}
                                />
                              </div>
                            </td>
                            <td className={cx("table-item")}>{item.title}</td>
                            <td className={cx("table-item")}>
                              <NumericFormat
                                displayType="text"
                                value={item.price}
                                thousandSeparator=","
                              />
                              <span> VND</span>{" "}
                            </td>
                            <td className={cx("table-item")}>
                              <div className={cx("quantity")}>
                                <span
                                  className={cx("minus", "item")}
                                  onClick={() =>
                                    handleDecrease(indexUser, index)
                                  }
                                >
                                  -
                                </span>
                                <div className={cx("input-number", "item")}>
                                  {item.quantity}
                                </div>
                                <span
                                  className={cx("plus", "item")}
                                  onClick={() =>
                                    handleIncrease(indexUser, index)
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td className={cx("table-item")}>
                              <NumericFormat
                                displayType="text"
                                value={
                                  Math.round(item.price * item.quantity * 100) /
                                  100
                                }
                                thousandSeparator=","
                              />{" "}
                              <span>VND</span>
                            </td>
                            <td className={cx("remove")}>
                              <img
                                src={images.bin}
                                alt="bin"
                                className={cx("bin")}
                                onClick={() =>
                                  deleteCart(indexUser, index, item)
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className={cx("table-footer")}>
              {/* Action left */}
              <div className={cx("action-left")}>
                <Link to="/shop">
                  <div className={cx("action-item")}>CONTINUE SHOPPING</div>
                </Link>
                <div className={cx("action-item")} onClick={handleUpdateCart}>
                  UPDATE SHOPPING CART
                </div>
              </div>
              {/* Action right */}
              <div className="action-right">
                <div className={cx("action-item")} onClick={handleDeleteCart}>
                  CLEAR SHOPPING CART
                </div>
              </div>
            </div>
          </div>

          {/* Cart total */}
          <div className={cx("cart-total")}>
            <h3 className={cx("title")}>Cart Totals</h3>
            <div className={cx("content")}>
              {/* Menu */}
              <div className={cx("menu")}>
                <div className={cx("menu-left")}>
                  <span>Sub Total</span>
                  <div className={cx("border")}></div>
                </div>
                <div className={cx("menu-right")}>
                  <NumericFormat
                    displayType="text"
                    value={totalCart}
                    thousandSeparator=","
                  />

                  <span style={{ marginLeft: 5 }}>VND</span>
                </div>
              </div>

              {/* Menu */}
              <div className={cx("menu")}>
                <div className={cx("menu-left")}>
                  <span>Total</span>
                  <div className={cx("border")}></div>
                </div>
                <div className={cx("menu-right", "total")}>
                  <NumericFormat
                    displayType="text"
                    value={totalCart}
                    thousandSeparator=","
                  />

                  <span style={{ marginLeft: 5 }}>VND</span>
                </div>
              </div>
            </div>
            {cartCheckOut.length === 0 && (
              <div className={cx("action")} onClick={handleShowPopup}>
                PROCEED TO CHECKOUT
              </div>
            )}
            {cartCheckOut.length > 0 && (
              <Link to="/checkout">
                <div className={cx("action")} onClick={handleCheckOut}>
                  PROCEED TO CHECKOUT
                </div>
              </Link>
            )}
          </div>
        </main>
      )}
      {listCart.length === 0 && (
        <div className={cx("main-wrapper")}>
          <header className={cx("header")}>
            <h2 className={cx("title")}>Sorry, your cart is empty</h2>
            <p className={cx("desc")}>
              Time to start shopping noww! Fill it up with savings from these
              popular departments.
            </p>
          </header>
          <div className={cx("list-option")}>
            {/* Option item */}
            <div className={cx("option-item")}>
              <img
                src={images.optionDog}
                alt="DOGS"
                className={cx("option-item")}
              />
              <h4 className={cx("title")}>DOGS</h4>
            </div>

            {/* Option item */}
            <div className={cx("option-item")}>
              <img
                src={images.optionStuff}
                alt="STUFFS"
                className={cx("option-item")}
              />
              <h4 className={cx("title")}>STUFFS</h4>
            </div>

            {/* Option item */}
            <div className={cx("option-item")}>
              <img
                src={images.optionCat}
                alt="CATS"
                className={cx("option-item")}
              />
              <h4 className={cx("title")}>CATS</h4>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;