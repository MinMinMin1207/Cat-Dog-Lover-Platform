const login = (values) => {
  const error = {
    email: "",
    password: "",
  };

  const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (values.email === "") {
    error.email = "Email is Required!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  }

  if (values.password === "") {
    error.password = "Password is Required!";
  }

  return error;
};

export default login;
