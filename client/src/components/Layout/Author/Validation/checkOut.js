const validateCheckOut = (values) => {
  const error = {
    fullName: "",
    streetAddress: "",
    streetOptional: "",
    city: "",
    phoneNumber: "",
    checkbox: "",
  };

  const checkPhoneNumber = /^(\d{9,11})$/;

  if (values.fullName === "") {
    error.fullName = "Full Name is not empty";
  }
  if (values.streetAddress === "") {
    error.streetAddress = "Street address is not empty";
  }
  if (values.streetOptional === "") {
    error.streetOptional = "Apartment is not empty";
  }
  if (values.city === "") {
    error.city = "City is not empty";
  }
  if (values.phone === "") {
    error.phoneNumber = "Phone number is not empty";
  } else if (!checkPhoneNumber.test(values.phone)) {
    error.phoneNumber = "Phone number must be between 9 and 11 digits";
  }

  if (values.checkbox === false) {
    error.checkbox = "Please tick the blank box";
  }

  return error;
};

export default validateCheckOut;
