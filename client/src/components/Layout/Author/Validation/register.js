const register = (values) => {
  const error = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (values.email === "") {
    error.email = "Email is Required!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  }

  if (values.password === "") {
    error.password = "Password is Required!";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
  }

  if (values.confirmPassword === "") {
    error.confirmPassword = "Confirm Password is Required!";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "Password not match!";
  }

  return error;
};

const registerRest = (values) => {
  const error = {
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    username: "",
    gender: "",
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

  if (values.gender === "") {
    error.gender = "Gender is Required!";
  }

  return error;
};

export { register, registerRest };
