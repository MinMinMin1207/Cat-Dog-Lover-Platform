const validateEditProfile = (values) => {
  const error = {
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    username: "",
    streetAddress: "",
    streetOptional: "",
  };

  function isDOBValid(dob) {
    // Create a Date object for today's date
    const today = new Date();

    // Parse the provided DOB string
    const dobDate = new Date(dob);

    // Check if the parsed DOB is not a future date
    return dobDate <= today;
  }
  const fullName_pattern = /^[A-Za-z\s]+$/;
  const phoneNumber_pattern = /^[0-9]{9,10}$/;
  const userName_pattern = /^[A-Za-z0-9]{3,}$/;

  if (values.fullName === "") {
    error.fullName = "Full Name is Required!";
  } else if (!fullName_pattern.test(values.fullName)) {
    error.fullName =
      "Full Name that can not constain number and special character";
  }

  if (values.dateOfBirth === "") {
    error.dateOfBirth = "Date of Birth  is Required!";
  } else if (!isDOBValid(values.dateOfBirth)) {
    error.dateOfBirth = "Wait, you come from the future?";
  }

  if (values.phoneNumber === "") {
    error.phoneNumber = "Phone Number is Required!";
  } else if (!phoneNumber_pattern.test(values.phoneNumber)) {
    error.phoneNumber = "Invalid Phone Number";
  }

  if (values.username === "") {
    error.username = "Username is Required!";
  } else if (!userName_pattern.test(values.username)) {
    error.username = "UserName that should be over 2 character";
  }

  if (values.streetAddress === "") {
    error.streetAddress = "Street address is not empty";
  }
  if (values.streetOptional === "") {
    error.streetOptional = "Apartment is not empty";
  }

  return error;
};

export default validateEditProfile;
