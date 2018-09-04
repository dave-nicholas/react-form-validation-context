export const requiredWithMessage = message => value =>
  (!value || !value.toString().trim().length) && message;

export const required = value =>
  requiredWithMessage('This field is required')(value);

export const email = value =>
  !/^\S+@\S+\.\S+$/.test(value.toString()) &&
  'Please enter a valid email address';

export const maxLength = (length, message) => value =>
  value &&
  value.toString().length > length &&
  (message || `Max length is ${length}`);

export const minLength = (length, message) => value =>
  value &&
  value.toString().length < length &&
  (message || `Min length is ${length}`);

export const exactLength = length => value =>
  value &&
  value.toString().length !== length &&
  `This should be ${length} digits long`;

export const minValue = (min, message) => value => {
  const v = parseInt(value, 10);
  return (
    (Number.isNaN(v) ? 0 : v) < min &&
    (message || `Please enter an amount greater than ${min}`)
  );
};

export const maxValue = (max, message) => value => {
  const v = parseInt(value, 10);
  return (
    (Number.isNaN(v) ? 0 : v) > max &&
    (message || `Your total amount must be less than ${max}`)
  );
};
export const maxFloatValue = (max, message) => value => {
  const v = parseFloat(value);
  return (
    (Number.isNaN(v) ? 0 : v) > max &&
    (message || `Your total amount must be less than ${max}`)
  );
};
export const decimalWithDot = value =>
  !/^(\d+(?:[\\.]\d{1,2})?)$/.test(value.toString()) &&
  'Please enter up to 2 decimal places';

export const number = value =>
  value && !/^[0-9]\d*$/.test(value.toString()) && 'This is not valid number';

export const decimalWithCommaDot = value =>
  !/^(\d+(?:[\\.\\,]\d{2})?)$/.test(value.toString()) &&
  'This is not valid number';

export const nationalInsurance = value =>
  value &&
  !/^(([A-CEGHJ-PR-TW-Za-ceghj-pr-tw-z]){1}([A-NP-Za-np-z]){1}([0-9]){6}([a-dA-D]){1}?)$/.test(
    value.toString()
  ) &&
  'Please enter a valid National Insurance number';

export const alphaNumeric2WithMessage = message => value =>
  value && !/^[0-9A-Za-z '-]+$/.test(value.toString()) && message;

export const alphaNumeric2 = value =>
  alphaNumeric2WithMessage("Only valid special characters are - '")(value);

export const onlyAlphaNumeric = value =>
  value &&
  !/^[0-9A-Za-z ]+$/.test(value.toString()) &&
  'Only valid characters are A-Z and 0-9';

export const address = value =>
  value &&
  !/^[0-9A-Za-z '-/,.]+$/.test(value.toString()) &&
  "Only valid special characters are - ' / , .";

export const postcode = value =>
  value &&
  !/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/.test(
    value
  ) &&
  'Please enter a valid postcode';

export const allowedValues = (message, values) => value => {
  const v = Number.isNaN(parseFloat(value)) ? value : parseFloat(value);
  return !values.includes(v) && (message || 'This is not allowed value');
};
