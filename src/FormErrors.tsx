import * as React from 'react';
import { IGetErrors } from '.';

export interface IFormErrors {
  render?: (error: string, id: string) => JSX.Element;
  errorsFor?: string | string[];
  className?: string;
}

export const makeFormErrors = (
  Consumer: React.ComponentType<React.ConsumerProps<any>>,
  getErrors: IGetErrors
) => ({ errorsFor, render, className, ...props }: IFormErrors): JSX.Element => {
  const { inputErrors, showErrors } = getErrors();
  return (
    <Consumer>
      {() => {
        const errorsToDisplay = Object.keys(inputErrors)
          .filter(
            k =>
              !errorsFor ||
              (typeof errorsFor === 'string'
                ? errorsFor === k
                : errorsFor.some(e => e === k))
          )
          .filter(k => showErrors[k] && inputErrors[k].length);

        return errorsToDisplay.length ? (
          <div className={className}>
            {errorsToDisplay.map(
              k =>
                render ? (
                  render(inputErrors[k][0], k)
                ) : (
                  <p key={k} {...props}>
                    {inputErrors[k][0]}
                  </p>
                )
            )}
          </div>
        ) : null;
      }}
    </Consumer>
  );
};
