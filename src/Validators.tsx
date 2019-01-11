export const requiredWithMessage = (message: string) => (value: string) =>
  (!value || !value.toString().trim().length) && message;

export const required = (value: string) =>
  requiredWithMessage('This field is required')(value);

export const email = (value: string) =>
  !/^\S+@\S+\.\S+$/.test(value.toString()) &&
  'Please enter a valid email address';

export const maxLength = (length: number, message?: string) => (value: string | number) =>
  value &&
  value.toString().length > length &&
  (message || `Max length is ${length}`);

export const minLength = (length: number, message?: string) => (value: string | number) =>
  value &&
  value.toString().length < length &&
  (message || `Min length is ${length}`);

export const exactLength = (length: number) => (value: string) =>
  value &&
  value.toString().length !== length &&
  `This should be ${length} digits long`;

export const minValue = (min: number, message?: string) => (value: string | number) => {
  const v = typeof value === 'string' ? parseInt(value, 10) : value;
  return (
    (Number.isNaN(v) ? 0 : v) < min &&
    (message || `Please enter an amount greater than ${min}`)
  );
};

export const maxValue = (max: number, message?: string) => (value: string | number) => {
  const v = typeof value === 'string' ? parseInt(value, 10) : value;
  return (
    (Number.isNaN(v) ? 0 : v) > max &&
    (message || `Your total amount must be less than ${max}`)
  );
};
export const maxFloatValue = (max: number, message?: string) => (
  value: string
) => {
  const v = parseFloat(value);
  return (
    (Number.isNaN(v) ? 0 : v) > max &&
    (message || `Your total amount must be less than ${max}`)
  );
};
export const decimalWithDot = (value: string) =>
  !/^(\d+(?:[\\.]\d{1,2})?)$/.test(value.toString()) &&
  'Please enter up to 2 decimal places';

export const number = (value: string | number) =>
  value && !/^[0-9]\d*$/.test(value.toString()) && 'This is not valid number';

export const decimalWithCommaDot = (value: string) =>
  !/^(\d+(?:[\\.\\,]\d{2})?)$/.test(value.toString()) &&
  'This is not valid number';

export const nationalInsurance = (value: string) =>
  value &&
  !/^(([A-CEGHJ-PR-TW-Za-ceghj-pr-tw-z]){1}([A-NP-Za-np-z]){1}([0-9]){6}([a-dA-D]){1}?)$/.test(
    value.toString()
  ) &&
  'Please enter a valid National Insurance number';

export const alphaNumeric2WithMessage = (message: string) => (value: string) =>
  value && !/^[0-9A-Za-z '-]+$/.test(value.toString()) && message;

export const alphaNumeric2 = (value: string) =>
  alphaNumeric2WithMessage("Only valid special characters are - '")(value);

export const onlyAlphaNumeric = (value: string) =>
  value &&
  !/^[0-9A-Za-z ]+$/.test(value.toString()) &&
  'Only valid characters are A-Z and 0-9';

export const address = (value: string) =>
  value &&
  !/^[0-9A-Za-z '-/,.]+$/.test(value.toString()) &&
  "Only valid special characters are - ' / , .";

export const postcode = (value: string) =>
  value &&
  !/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/.test(
    value
  ) &&
  'Please enter a valid postcode';

export const allowedValues = (message: string, values: string[]) => (
  value: string
) => {
  const v = Number.isNaN(parseFloat(value)) ? value : parseFloat(value);
  return !values.includes(v as string) && (message || 'This is not allowed value');
};

export const stringMatch = (stringToMatch: string, message?: string) => (value: string) =>
  value &&
  stringToMatch.localeCompare(value) !== 0 &&
  (message || `Please enter exactly: "${stringToMatch}"`);

