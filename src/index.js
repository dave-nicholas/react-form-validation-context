/* eslint no-undef: 1 */
/* eslint no-return-assign: 1 */

import React, { Component, createContext } from 'react';

import { makeWithFormButton } from './Button';

const FormContext = createContext();

let inputErrors = {};
let showErrors = {};

const { Provider, Consumer } = FormContext;

export const withFormButton = makeWithFormButton(Consumer);
