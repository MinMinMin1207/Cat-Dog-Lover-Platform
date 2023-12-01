const validateFormUpload = (values) => {
  const error = {
    file: "",
    title: "",
    description: "",
  };

  if (values.file.length === 0) {
    error.file = "Picture is Required!";
  }

  if (values.title === "") {
    error.title = "Product Name is Required!";
  }
  if (values.description === "") {
    error.description = "Description is Required!";
  }

  return error;
};

const validateStuffForm = (values) => {
  const error = {
    qty: "",
    price: "",
  };

  const quantityPattern = /^[1-9]\d*$/;
  const pricePattern = /^[1-9]\d*$/;

  if (values.qty === "") {
    error.qty = "Quantity is Required!";
  } else if (!quantityPattern.test(values.qty) && !(values.qty >= 0)) {
    error.qty = "Quantity is required to be more than 0";
  }

  if (values.price === "") {
    error.price = "Price is Required!";
  } else if (!(pricePattern.test(values.price) && values.price >= 0)) {
    error.price = "Price is required to be more than 0";
  }

  return error;
};

const validateDogForm = (values) => {
  const error = {
    breed: "",
    age: "",
    price: "",
  };

  const pricePattern = /^[1-9]\d*$/;

  if (values.breed === "" || values.breed === undefined) {
    error.breed = "Breed is Required!";
  }
  if (values.age === "") {
    error.age = "Age is Required!";
  }
  if (values.price === "") {
    error.price = "Price is Required!";
  } else if (!(pricePattern.test(values.price) && values.price >= 0)) {
    error.price = "Price is required to be more than 0";
  }

  return error;
};

export { validateFormUpload, validateStuffForm, validateDogForm };
