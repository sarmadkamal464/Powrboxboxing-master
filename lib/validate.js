export function validateSignup(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.includes(" ")) {
    errors.firstName = "Invalid firstName...!";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.includes(" ")) {
    errors.lastName = "Invalid lastName...!";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.address) {
    errors.address = "Required";
  } else if (values.address.includes(" ")) {
    errors.address = "Invalid address...!";
  }
  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.includes(" ")) {
    errors.city = "Invalid city...!";
  }

  if (!values.postalCode) {
    errors.postalCode = "Required";
  } else if (values.postalCode.includes(" ")) {
    errors.postalCode = "Invalid postalCode...!";
  }
  return errors;
}
