import React from 'react';

export const makeWithFormButton = (Consumer, setShowError, getErrors) => B => ({
  onClick: propOnClick,
  ...props
}) => (
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
