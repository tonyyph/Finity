export const validateUsername = (username?: string, required?: boolean) => {
  if (!username) {
    return { error: "Enter your email address", valid: false };
  }
  if (username?.includes("@")) {
    // const re = /\S+@\S+\.\S+/;

    // if (!re.test(username)) {
    //   return { error: "Invalid email address.", valid: false };
    // }
    return { error: "", valid: true };
  }
  return { error: "", valid: true };
};

export const validateEmail = (email?: string, required?: boolean) => {
  if (!email) {
    return { error: "Email is a required field", valid: false };
  }

  if (email?.includes("@")) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!re.test(email)) {
      return { error: "Invalid email address.", valid: false };
    }
    return { error: "", valid: true };
  }
  return { error: "", valid: false };
};

export const validateLetter = (email?: string, required?: boolean) => {
  return { error: "", valid: false };
};

export const validatePassword = (password?: string, required?: boolean) => {
  if (!password) {
    return { error: "Enter your password", valid: false };
  }
  // if (password.length < 6) {
  //   return { error: "Password is too short.", valid: false };
  // }
  return { error: "", valid: true };
};

export const validateUrl = (url?: string, required?: boolean) => {
  if (!url) {
    return { error: "URL is required.", valid: false };
  }
  const re = /^(http|https):\/\/[^ "]+$/;
  if (!re.test(url)) {
    return { error: "Invalid URL.", valid: false };
  }
  return { error: "", valid: true };
};

export const validateUKPostcode = (postcode: string) => {
  // Regular expression for UK postcode validation
  const postcodeRegex =
    /^([Gg][Ii][Rr] 0[Aa]{2})|^((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;

  if (postcodeRegex.test(postcode.trim())) {
    return true;
  } else {
    return false;
  }
};

export const convertMonth = (monthName: string): string => {
  const months: { [key: string]: string } = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12"
  };

  return months[monthName] ?? "Invalid month";
};
