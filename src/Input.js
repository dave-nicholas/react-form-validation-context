import React, { Component } from "react";

class FormInput extends Component {
  componentDidMount() {
    const { id, invalidateParentForm } = this.props;
    this.reset();

    this.family = document.querySelectorAll(
      `input[id=${id}], *[id=${id}] input`
    );

    this.f =
      this.family.length < 2
        ? _f => _f()
        : _f =>
            setTimeout(() => {
              if (!document.querySelector(`*[id=${id}] input:focus`)) {
                _f();
              }
            }, 200);
    this.f = _f => _f();
    this.family.forEach(element => element.addEventListener("blur", this.blur));
    invalidateParentForm();
  }

  componentWillUnmount() {
    clearTimeout(this.f);
    this.family.forEach(element =>
      element.removeEventListener("blur", this.blur)
    );
    this.reset();
  }

  blur = () => {
    const { id, invalidateParentForm } = this.props;
    this.f(() => {
      showErrors[id] = true;
      invalidateParentForm();
    });
  };

  reset() {
    const { id } = this.props;
    inputErrors[id] = 0;
    showErrors[id] = false;
  }

  render() {
    const { C, ...props } = this.props;
    return <C {...props} />;
  }
}

/* eslint-disable-next-line react/prop-types */
export const withForm = C => ({ id, value, validations, ...props }) => (
  <Consumer>
    {({ setInputErrors, invalidateParentForm }) => {
      if (typeof id === "undefined") {
        throw new Error("withForm requires consumers to have an id prop");
      }

      const validationResults = validations
        ? validations
            .map(v => (typeof v === "function" ? v(value) : null))
            .filter(v => v && !!v.length)
        : 0;
      const inValid = !!validationResults.length;

      const errorToShow = inValid ? validationResults[0] : null;

      if (inputErrors[id] !== validationResults.length) {
        inputErrors[id] = validationResults.length;
      }

      return (
        <FormInput
          {...props}
          C={C}
          id={id}
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
