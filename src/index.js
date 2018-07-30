import { createContext } from 'react';

import { makeWithFormButton } from './Button';
import { makeWithForm } from './Input';
import { makeForm } from './Form';
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

export const withFormButton = makeWithFormButton(
  Consumer,
  showErrors,
  inputErrors,
  setShowError
);

export const withForm = makeWithForm(
  Consumer,
  showErrors,
  inputErrors,
  setError
);

export const Form = makeForm(Provider, resetErrors);

export { validators };
