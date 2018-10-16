import React from 'react';
import { ISetShowError, IGetErrors } from '.';

export interface IClickable {
  onClick: () => void;
}

export const makeWithFormButton = (
  Consumer: React.ComponentType<React.ConsumerProps<any>>,
  setShowError: ISetShowError,
  getErrors: IGetErrors
) => (B: React.ComponentClass<IClickable>) => ({
  onClick: propOnClick,
  ...props
}: IClickable): JSX.Element => (
  <Consumer>
    {({ invalidateParentForm, onErrorCallback }) => (
      <B
        onClick={() => {
          const { showErrors, inputErrors } = getErrors();

          Object.keys(showErrors).forEach(k => {
            setShowError(k);
          });

          if (onErrorCallback) onErrorCallback(inputErrors);

          if (
            propOnClick &&
            Object.keys(inputErrors)
              .map(k => inputErrors[k].length)
              .every(e => !e)
          ) {
            propOnClick();
          } else {
            invalidateParentForm();
          }
        }}
        {...props}
      />
    )}
  </Consumer>
);
