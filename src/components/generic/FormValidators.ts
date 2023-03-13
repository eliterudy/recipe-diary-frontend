const required = (val: any) => val && val.length > 0;
const maxLength = (val: any, len: any) => val.length < len;
const minLength = (val: any, len: any) => val.length >= len;
const isNumber = (val: any) => !isNaN(Number(val));
const validEmail = (val: any) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const FormValidators = {
  textValidator: (
    value: string,
    minLen: number,
    maxLen: number,
  ): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, minLen)) {
      error = `Should be atleast ${minLen} characters!`;
    } else if (!maxLength(value, maxLen + 1)) {
      error = `Should be at most ${maxLen} characters!`;
    }
    return [error, error.length > 0];
  },

  numberValidator: (value: string): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!isNumber(value)) {
      error = `Should be a positive number greater than zero`;
    }
    return [error, error.length > 0];
  },
  emailValidator: (value: string): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!validEmail(value)) {
      error = 'Should be a valid email.';
    }
    return [error, error.length > 0];
  },
  passwordValidator: (
    value: string,
    minLen: number,
    maxLen: number,
  ): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, minLen)) {
      error = `Should be atleast ${minLen} characters!`;
    } else if (!maxLength(value, maxLen + 1)) {
      error = `Should be at most ${maxLen} characters!`;
    }
    return [error, error.length > 0];
  },
  confirmPasswordValidator: (
    value: string,
    minLen: number,
    maxLen: number,
    matchTo: string,
  ): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, minLen)) {
      error = `Should be atleast ${minLen} characters!`;
    } else if (!maxLength(value, maxLen)) {
      error = `Should be at most ${maxLen + 1} characters!`;
    } else if (value !== matchTo) {
      error = `Passwords dont match!`;
    }
    return [error, error.length > 0];
  },
};

export default FormValidators;
