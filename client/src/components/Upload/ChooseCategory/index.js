import classNames from "classnames/bind";
import styles from "./ChooseCategory.module.scss";
import Wrapper from "~/components/Upload/Wrapper";
import images from "~/assets/images";

const cx = classNames.bind(styles);

const DATA = [
  {
    id: "Dog",
    alt: "Dog",
    img: images.optionDog,
    text: "Dog",
  },
  {
    id: "Cat",
    alt: "Cat",
    img: images.optionCat,
    text: "Cat",
  },
  {
    id: "Stuff",
    alt: "Stuff",
    img: images.optionStuff,
    text: "Stuff",
  },
];

function ChooseCategory({ id, setId, handleNextClick }) {
  const handleClick = (pos) => {
    setId(pos);
  };

  return (
    <Wrapper className={cx("choose-wrapper")}>
      <h1 className={cx("heading")}>Choose Your Category</h1>
      <div className={cx("list-choose")}>
        {DATA.map((item, index) => (
          <div
            key={index}
            className={cx("item")}
            id={index}
            onClick={() => handleClick(item.id)}
          >
            <img
              className={cx("img")}
              src={item.img}
              alt={item.alt}
              style={
                item.id === id
                  ? {
                      border: "3px solid #26A8EA",
                      background: "rgba(217, 217, 217, 0.00)",
                    }
                  : {
                      borderColor: "none",
                    }
              }
            />
            <span className={cx("text")}>{item.text}</span>
          </div>
        ))}
      </div>
      <div className={cx("action", "active")} onClick={handleNextClick}>
        Next
      </div>
    </Wrapper>
  );
}

export default ChooseCategory;
