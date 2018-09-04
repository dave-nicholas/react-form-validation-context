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
    seterror(id, []);
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
) => C => passedProps => (
  <Consumer>
    {({ setInputErrors, invalidateParentForm }) => {
      const { id, value, validations, checked, hideErrors } = passedProps;
      if (typeof id === 'undefined') {
        throw new Error(
          'react-form-context: withForm requires consumers to have an id prop'
        );
      }

      const validationValue = Object.prototype.hasOwnProperty.call(
        passedProps,
        'checked'
      )
        ? checked
        : value;

      const { inputErrors, showErrors } = getErrors();

      const validationResults = validations
        ? validations
            .map(v => (typeof v === 'function' ? v(validationValue) : null))
            .filter(v => v && !!v.length)
        : [];
      const inValid = !!validationResults.length;

      const errorToShow = inValid ? validationResults[0] : null;

      if (
        typeof inputErrors[id] === 'undefined' ||
        inputErrors[id].join('-') !== validationResults.join('-')
      ) {
        setError(id, validationResults);
      }

      return (
        <FormInput
          {...passedProps}
          C={C}
          id={id}
          seterror={setError}
          setShowError={setShowError}
          value={value}
          error={errorToShow}
          showErrors={!hideErrors && showErrors[id]}
          setInputErrors={setInputErrors}
          invalidateParentForm={invalidateParentForm}
        />
      );
    }}
  </Consumer>
);
