/**
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * @param email
 * @returns
 */
export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(validateEmailPattern);
};

/**
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * @param email
 * @returns
 */
export const validateEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * @see https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte
 * @param senha
 * @returns
 */
export const validatePasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

/**
 * Pattern Name
 */
export const validateDomainNamePattern = /^[a-z0-9]+$/;

/**
 * Pattern Code Text Format
 */
export const codeTextPattern = /`([^`]+)`/g;

/**
 *
 * @param senha string
 * @returns
 */
export const validatePassword = (senha: string) => {
  return String(senha).toLowerCase().match(validatePasswordPattern);
};

/**
 *
 * @param text string
 * @returns string clear
 */
export const clearText = (text: string) => {
  return text ? text.trim() : '';
};

export const extractRawText = (html: string): string => {
  if (!html) return '';

  // Regex para encontrar o conteúdo dentro das tags <code>
  const regex = /<code>(.*?)<\/code>/g;

  // Substituir <code> pelo conteúdo bruto delimitado por `
  return html.replace(regex, '`$1`').replace(/<[^>]*>/g, '');
};
