import React from 'react';

export const makeWithFormButton = (
  Consumer,
  showErrors,
  inputErrors,
  setShowError
) => B => ({ onClick: propOnClick, ...props }) => (
  <Consumer>
    {({ invalidateParentForm, onErrorCallback }) => (
      <B
        onClick={() => {
          Object.keys(showErrors).forEach(k => {
            setShowError(k);
          });

          if (onErrorCallback) onErrorCallback(inputErrors);

          if (
            propOnClick &&
            Object.keys(inputErrors)
              .map(k => inputErrors[k])
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
