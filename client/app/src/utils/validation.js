const isIntegerRE = /^\+?(0|[1-9]\d*)$/;
const numberRE = /^(?=.*[0-9]).+$/;
const twoWordsRE = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
const lowercaseRE = /^(?=.*[a-z]).+$/;
const uppercaseRE = /^(?=.*[A-Z]).+$/;
const specialCharRE = /^(?=.*[_\W]).+$/;
const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dateRE = /^[0,1]?\d\/(([0-2]?\d)|([3][01]))\/((199\d)|([2-9]\d{3}))\s[0-2]?[0-9]:[0-5][0-9] (am|pm)?$/


/**
 * @function join
 * @description takes a collection of validation rules, joining into an array
 * @param [function] - an array of functions to call to validate
 * @param value - the value to validate
 * @param data - the data to validate
 * @return error - the first error returned from the validation function
 */
const join = (rules) =>
(value, data) =>
  rules.map(rule =>
    rule(value, data)).filter(error =>
      !!error
    )[0];

const noValue = value =>
  value === undefined ||
    value === null ||
      value === '';


/**
 * @function validateWithRE
 * @description - takes a regular expression and a message and returns a function that will return
 * The message if the re does not pass with the value passed into the curried function.
 * @param {RegExp} = the regular expression to be used to test the value.
 * @param String - the message value to return upon failure
 * @return Function - a function that takes a value and returns a string message if the RE fails.
 */
const validateWithRE = (RE, message) =>
  (value) => {
    if (!RE.test(value)) {
      return message;
    }
  };

export const minLength = (minimum) =>
  (value) => {
    if (!noValue(value) && value.length < minimum) {
      return `Value must contain at least ${minimum} characters`;
    }
  };

export const maxLength = (maximum) =>
  (value) => {
    if (!noValue(value) && value.length > maximum) {
      return `Value must be no more than ${maximum} characters in length`;
    }
  };

export const valueRequired = (value) => {
  if (noValue(value)) {
    return 'Value Required';
  }
};

export const containsSpecialChar = (value) =>
  value && validateWithRE(specialCharRE, 'Must contain 1 special character.')(value);

export const isInteger = (value) =>
  value && validateWithRE(isIntegerRE, 'Must be an integer value.')(value);

export const containsNumber = (value) =>
  value && validateWithRE(numberRE, 'Must Contain at least one number')(value);

export const containsLowercase = (value) =>
  value && validateWithRE(lowercaseRE, 'Must contain at least one lowercase letter.')(value);

export const containsUppercase = (value) =>
  value && validateWithRE(uppercaseRE, 'Must contain at least one uppercase letter')(value);

export const containsTwoWords = (value) => {
  const lowercaseValue = value ? value.toLowerCase() : '';
  return value &&
    validateWithRE(
      twoWordsRE,
      'Must contain two words, i.e. full name.'
    )(lowercaseValue);
};

export const isEmail = (value) =>
  value && validateWithRE(emailRE, 'Must be a valid email address.')(value);

export const isValidDate = (value) =>
  value && validateWithRE(dateRE, 'Must be a valid date time.')(value);

export const isInFuture = (value) => {
  const currentDate = new Date();
  const setDate = new Date(value);
  return setDate < currentDate ? 'Please choose a date in the future' : null;
};

export const validateOneOf = (values, message) => (value) => {
  const isValid = values.filter(item => item === value).length > 0;
  return isValid ? message : null;
};

export const matches = (matchVal) => (currentVal) =>
  matchVal === currentVal ? null : `Values must match`;

export const oneOf = (values) =>
  (value) =>
    validateOneOf(values, `Value must be one of: ${values.join(', ')}`)(value);

export const noLaterThan = (field) => (value, data) => {
  const startDate = new Date(data[field]);
  const endDate = new Date(value);
  return (endDate < startDate) ? 'The end date must come after the start date' : null;
};

export const createValidator = (validationRules) =>
  (data = {}) => {
    const errors = {};
    Object.keys(validationRules).forEach((key) => {
      const rule = join([].concat(validationRules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
