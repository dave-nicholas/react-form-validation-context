/* eslint no-undef: 1 */

import React, { Component } from 'react';

class FormInput extends Component {
  componentDidMount() {
    const { invalidateParentForm } = this.props;
    this.reset();
    invalidateParentForm();
  }

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    const { id, setShowError, seterror } = this.props;
    seterror(id, 0);
    setShowError(id, false);
  }

  render() {
    const { C, ...props } = this.props;
    return <C {...props} />;
  }
}

export const makeWithForm = (
  Consumer,
  setError,
  setShowError,
  getErrors
) => C => ({ id, value, validations, ...props }) => (
  <Consumer>
    {({ setInputErrors, invalidateParentForm }) => {
      if (typeof id === 'undefined') {
        throw new Error(
          'react-form-context: withForm requires consumers to have an id prop'
        );
      }

      const { inputErrors, showErrors } = getErrors();

      const validationResults = validations
        ? validations
            .map(v => (typeof v === 'function' ? v(value) : null))
            .filter(v => v && !!v.length)
        : 0;
      const inValid = !!validationResults.length;

      const errorToShow = inValid ? validationResults[0] : null;

      if (inputErrors[id] !== validationResults.length) {
        setError(id, validationResults.length);
      }

      return (
        <FormInput
          {...props}
          C={C}
          id={id}
          seterror={setError}
          setShowError={setShowError}
          value={value}
          error={errorToShow}
          showErrors={showErrors[id]}
          setInputErrors={setInputErrors}
          invalidateParentForm={invalidateParentForm}
        />
      );
    }}
  </Consumer>
);
