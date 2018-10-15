import React from 'react';
import { IGetErrors } from '.';

interface IFormErrors {
  render: (error: string, id: string) => void;
  errorsFor: string | string[];
}

export const makeFormErrors = (
  Consumer: React.ComponentType<React.ConsumerProps<any>>,
  getErrors: IGetErrors
) => ({ errorsFor, render, ...props }: IFormErrors) => {
  const { inputErrors, showErrors } = getErrors();
  return (
    <Consumer>
      {() =>
        Object.keys(inputErrors)
          .filter(
            k =>
              !errorsFor ||
              (typeof errorsFor === 'string'
                ? errorsFor === k
                : errorsFor.some(e => e === k))
          )
          .filter(k => showErrors[k] && inputErrors[k].length)
          .map(
            k =>
              render ? (
                render(inputErrors[k][0], k)
              ) : (
                <p key={k} {...props}>
                  {inputErrors[k][0]}
                </p>
              )
          )
      }
    </Consumer>
  );
};
