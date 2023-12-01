const validateForm = (values) => {
  const error = {
    productName: "",
    description: "",
    breed: "",
    age: "",
    price: "",
  };
  console.log(values.breed);

  if (values.productName === "") {
    error.productName = "Pet Name is Required!";
  }
  if (values.description === "") {
    error.description = "Description is Required!";
  }
  if (values.breed === "") {
    error.breed = "Breed is Required!";
  }
  if (values.age === "") {
    error.age = "Age is Required!";
  }
  if (values.price === "") {
    error.price = "Price is Required!";
  } else if (values.price <= 0) {
    error.price = "Price must be greater than 0";
  }

  return error;
};

const validateFormProduct = (values) => {
  const error = {
    productName: "",
    description: "",
    quantity: "",
    size: "",
    price: "",
  };

  if (values.productName === "") {
    error.productName = "Product Name is Required!";
  }
  if (values.description === "") {
    error.description = "Description is Required!";
  }
  if (values.quantity === "") {
    error.quantity = "Quantity is Required!";
  }
  if (values.price === "") {
    error.price = "Price is Required!";
  } else if (values.price <= 0) {
    error.price = "Price must be greater than 0";
  }

  return error;
};

export { validateForm, validateFormProduct };
