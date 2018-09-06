import React from 'react';

export const makeFormErrors = (Consumer, getErrors) => ({
  errorsFor,
  render,
  ...props
}) => {
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
