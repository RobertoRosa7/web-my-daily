import { text } from 'stream/consumers';

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

/**
 * @see https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte
 * @param senha
 * @returns
 */

export const validatePasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

export const validatePassword = (senha: string) => {
  return String(senha).toLowerCase().match(validatePasswordRegex);
};

export const clearText = (text: string) => {
  return text.trim();
};
