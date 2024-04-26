/**
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * @param email
 * @returns
 */
export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(validateEmailRegex);
};

/**
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * @param email
 * @returns
 */
export const validateEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
