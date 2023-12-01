const checkBooking = (values) => {
  const error = {
    time: "",
    dateOfBirth: "",
  };

  function isDOBValid(dob) {
    // Create a Date object for today's date
    const today = new Date();

    // Parse the provided DOB string
    const dobDate = new Date(dob);
    // Check if the parsed DOB is not a future date
    return dobDate >= today;
  }

  function isTimeValid() {
    let getTime = values.time.split(":");
    if (+getTime[0] >= 9 && +getTime[0] <= 18) {
      if (+getTime[0] === 18 && +getTime[1] === 0) return true;
      if (+getTime[0] >= 9 && +getTime[0] < 18) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  if (values.date === "") {
    error.dateOfBirth = "Date of Birth is Required!";
  } else if (!isDOBValid(values.date)) {
    error.dateOfBirth = "This date in the past!";
  }

  if (values.time === "") {
    error.time = "Time is Required!";
  } else if (!isTimeValid()) {
    error.time = "Range time 9:00 - 18:00";
  }

  return error;
};

export default checkBooking;
