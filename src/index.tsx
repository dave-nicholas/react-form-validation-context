import * as React from 'react';

import { makeWithFormButton } from './Button';
import { makeWithForm } from './Input';
import { makeForm } from './Form';
import { makeFormErrors } from './FormErrors';
import * as validators from './Validators';

export { IClickable } from './Button';
export { IWithForm, IInputComponent } from './Input';
export { IFormCallback } from './Form';
export { IFormErrors } from './FormErrors';

export interface IInputErrors { [index: string]: string[] }
export interface IShowErrors { [index: string]: boolean }
export interface ISetError { (k: string, errors: string[]): void }
export interface ISetShowError { (k: string, show?: boolean): void }
export interface IGetErrors {
  (): { inputErrors: IInputErrors, showErrors: IShowErrors };
}

const FormContext = React.createContext({});

const { Provider, Consumer } = FormContext;

let inputErrors: IInputErrors = {};
let showErrors: IShowErrors = {};

const resetErrors = () => {
  inputErrors = {};
  showErrors = {};
};

const setError: ISetError = (k, errors) => {
  inputErrors[k] = errors;
};

const setShowError: ISetShowError = (k, show = true) => {
  showErrors[k] = show;
};

const getErrors: IGetErrors = () => ({ inputErrors, showErrors });

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
