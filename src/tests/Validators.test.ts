import {
  requiredWithMessage,
  required,
  email,
  maxLength,
  minLength,
  exactLength,
  minValue,
  maxValue,
  number,
  nationalInsurance,
  alphaNumeric2,
  onlyAlphaNumeric,
  address,
  postcode,
  allowedValues
} from '../Validators';

describe('Input validator', () => {
  it('requiredWithMessage - Invalid', () => {
    expect(requiredWithMessage('This is custom message')(' ')).toEqual(
      'This is custom message'
    );
  });
  it('requiredWithMessage -Valid', () => {
    expect(requiredWithMessage('This is custom message')('XXX')).toEqual(false);
  });

  it('requiredWithMessage - Invalid', () => {
    expect(required(' ')).toEqual('This field is required');
  });
  it('required -Valid', () => {
    expect(required('XXX')).toEqual(false);
  });

  it('email - Invalid', () => {
    expect(email(' ')).toEqual('Please enter a valid email address');
    expect(email('test.')).toEqual('Please enter a valid email address');
    expect(email('test@')).toEqual('Please enter a valid email address');
    expect(email('test@g')).toEqual('Please enter a valid email address');
    expect(email('test@g.')).toEqual('Please enter a valid email address');
  });
  it('email -Valid', () => {
    expect(email('test@g.c')).toEqual(false);
    expect(email('test@gmail.com')).toEqual(false);
  });

  it('maxLength - Invalid', () => {
    expect(maxLength(4)('test1')).toEqual('Max length is 4');
    expect(maxLength(2)('1234')).toEqual('Max length is 2');
  });
  it('maxLength -Valid', () => {
    expect(maxLength(4)('test')).toEqual(false);
    expect(maxLength(2)('12')).toEqual(false);
    expect(maxLength(2)('2')).toEqual(false);
  });

  it('minLength - Invalid', () => {
    expect(minLength(4)('tes')).toEqual('Min length is 4');
    expect(minLength(2)('1')).toEqual('Min length is 2');
  });
  it('minLength -Valid', () => {
    expect(minLength(4)('test')).toEqual(false);
    expect(minLength(2)('1234')).toEqual(false);
    expect(minLength(2)('123')).toEqual(false);
  });

  it('exactLength - Invalid', () => {
    expect(exactLength(4)('tes')).toEqual('This should be 4 digits long');
    expect(exactLength(2)('1')).toEqual('This should be 2 digits long');
  });
  it('exactLength -Valid', () => {
    expect(exactLength(4)('test')).toEqual(false);
    expect(exactLength(2)('12')).toEqual(false);
  });

  it('minValue - Invalid', () => {
    expect(minValue(500, 'This is custom message')(400)).toEqual(
      'This is custom message'
    );
    expect(minValue(500, 'This is custom message')('400')).toEqual(
      'This is custom message'
    );
    expect(minValue(500)(400)).toEqual(
      'Please enter an amount greater than 500'
    );
  });
  it('minValue -Valid', () => {
    expect(minValue(500, 'This is custom message')(599)).toEqual(false);
    expect(minValue(500)(599)).toEqual(false);
    expect(minValue(500)('599')).toEqual(false);
  });

  it('maxValue - Invalid', () => {
    expect(maxValue(500, 'This is custom message')(600)).toEqual(
      'This is custom message'
    );
    expect(maxValue(500, 'This is custom message')('600')).toEqual(
      'This is custom message'
    );
    expect(maxValue(500)(600)).toEqual(
      'Your total amount must be less than 500'
    );
  });
  it('maxValue -Valid', () => {
    expect(maxValue(500, 'This is custom message')(499)).toEqual(false);
    expect(maxValue(500)(499)).toEqual(false);
    expect(maxValue(500)('499')).toEqual(false);
  });

  it('number - Invalid', () => {
    expect(number('AB600')).toEqual('This is not valid number');
    expect(number('600.90')).toEqual('This is not valid number');
    expect(number('£@£@£')).toEqual('This is not valid number');
  });
  it('number -Valid', () => {
    expect(number('00000499')).toEqual(false);
    expect(number(499)).toEqual(false);
  });

  it('nationalInsurance - Invalid', () => {
    expect(nationalInsurance('AB600999')).toEqual(
      'Please enter a valid National Insurance number'
    );
    expect(nationalInsurance('AB123123S')).toEqual(
      'Please enter a valid National Insurance number'
    );
    expect(nationalInsurance('£@£@£')).toEqual(
      'Please enter a valid National Insurance number'
    );
  });
  it('nationalInsurance -Valid', () => {
    expect(nationalInsurance('AB123123A')).toEqual(false);
    expect(nationalInsurance('AB999999A')).toEqual(false);
    expect(nationalInsurance('AB123123D')).toEqual(false);
    expect(nationalInsurance('AB000000D')).toEqual(false);
  });

  it('alphaNumeric2 - Invalid', () => {
    expect(alphaNumeric2('AB+00999')).toEqual(
      "Only valid special characters are - '"
    );
    expect(alphaNumeric2('00.99')).toEqual(
      "Only valid special characters are - '"
    );
    expect(alphaNumeric2('£@£@£')).toEqual(
      "Only valid special characters are - '"
    );
    expect(alphaNumeric2('AAAA,AAA')).toEqual(
      "Only valid special characters are - '"
    );
    expect(alphaNumeric2('AAAA;;::AAA')).toEqual(
      "Only valid special characters are - '"
    );
  });
  it('alphaNumeric2 -Valid', () => {
    expect(alphaNumeric2("ab12'3123A-")).toEqual(false);
    expect(alphaNumeric2('AB')).toEqual(false);
    expect(alphaNumeric2('1234')).toEqual(false);
    expect(alphaNumeric2('AB-12')).toEqual(false);
    expect(alphaNumeric2("AB'12")).toEqual(false);
  });

  it('onlyAlphaNumeric - Invalid', () => {
    expect(onlyAlphaNumeric('AB+00999')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
    expect(onlyAlphaNumeric('00.99')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
    expect(onlyAlphaNumeric('ab-99')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
    expect(onlyAlphaNumeric('£@£@£')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
    expect(onlyAlphaNumeric('AAAA,AAA')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
    expect(onlyAlphaNumeric('AAAA;;::AAA')).toEqual(
      'Only valid characters are A-Z and 0-9'
    );
  });
  it('onlyAlphaNumeric -Valid', () => {
    expect(onlyAlphaNumeric('AB')).toEqual(false);
    expect(onlyAlphaNumeric('ab')).toEqual(false);
    expect(onlyAlphaNumeric('ab 12')).toEqual(false);
    expect(onlyAlphaNumeric('1234')).toEqual(false);
    expect(onlyAlphaNumeric('AB1234')).toEqual(false);
  });

  it('address - Invalid', () => {
    expect(address('AB_00999')).toEqual(
      "Only valid special characters are - ' / , ."
    );
    expect(address('£@£@£')).toEqual(
      "Only valid special characters are - ' / , ."
    );
    expect(address('AAAA;;::AAA')).toEqual(
      "Only valid special characters are - ' / , ."
    );
  });
  it('address -Valid', () => {
    expect(address('AB')).toEqual(false);
    expect(address('ab')).toEqual(false);
    expect(address('ab 12')).toEqual(false);
    expect(address('1234')).toEqual(false);
    expect(address('AB1234')).toEqual(false);
    expect(address('00.99')).toEqual(false);
    expect(address('A-Z, 0-9, -  / , .')).toEqual(false);
  });

  it('postcode - Invalid', () => {
    expect(postcode('12343')).toEqual('Please enter a valid postcode');
    expect(postcode('ab 12')).toEqual('Please enter a valid postcode');
  });

  it('postcode - Valid', () => {
    expect(postcode('rh11 0uw')).toEqual(false);
  });

  it('allowedValues - Valid', () => {
    expect(
      allowedValues('Please enter a valid option', ['red', 'green', 'blue'])(
        'green'
      )
    ).toEqual(false);
  });

  it('allowedValues - Invalid', () => {
    expect(
      allowedValues('Please enter a valid option', ['red', 'green', 'blue'])(
        'purple'
      )
    ).toEqual('Please enter a valid option');
  });
});
