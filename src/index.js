import { createContext } from 'react';

import { makeWithFormButton } from './Button';
import { makeWithForm } from './Input';
import { makeForm } from './Form';
import { makeFormErrors } from './FormErrors';
import * as validators from './Validators';

const FormContext = createContext();

const { Provider, Consumer } = FormContext;

let inputErrors = {};
let showErrors = {};

const resetErrors = () => {
  inputErrors = {};
  showErrors = {};
};

const setError = (k, errors) => {
  inputErrors[k] = errors;
};

const setShowError = (k, show = true) => {
  showErrors[k] = show;
};

const getErrors = () => ({ inputErrors, showErrors });

export const withFormButton = makeWithFormButton(
  Consumer,
  setShowError,
  getErrors
);

export const withForm = makeWithForm(
  Consumer,
  setError,
  setShowError,
  getErrors
);

export const FormErrors = makeFormErrors(Consumer, getErrors);

export const Form = makeForm(Provider, resetErrors);

export { validators };
