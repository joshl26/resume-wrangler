// Creates a Regex expression that validates password string on the following:
// - At least minimum six characters to a maximum of 20.
// - Can be a combination of lower case, upper case and numbers ONLY no special characters
// export const usernameRegex = new RegExp("^[A-Za-z][A-Za-z0-9_]{3,20}$");
export const usernameRegex = "^[A-Za-z][A-Za-z0-9_]{3,20}$";

// Creates a Regex expression that validates password string on the following:
// - Can be a combination of lower case, upper case and numbers ONLY no special characters
// - name and domain seperated by @ symbol
// export const emailRegex = new RegExp(
//   "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$"
// );
export const emailRegex = "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$";

// Creates a Regex expression that validates password string on the following:
// - At least one upper case A-Z
// - At least one lower case a-z
// - At least one digit 0-9
// - At least one special character
// - Minimum six characters in length
// export const passwordRegex = new RegExp(
//   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
// );

export const passwordRegex =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$";
