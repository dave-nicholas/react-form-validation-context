# react-form-validation-context

A lightweight react form validation library that uses HOCs (higher order components) for functional programming.

[![Build Status](https://travis-ci.org/dave-nicholas/react-form-validation-context.svg?branch=master)](https://travis-ci.org/dave-nicholas/react-form-validation-context)

## Installation

```
yarn add react-form-validation-context
```

Or 

```
npm install --save react-form-validation-context
```

## Usage

### Importing the library

```javascript 
import {
  Form,
  withForm,
  validators,
  withFormButton,
  FormErrors // Optional, for custom errors
} from "react-form-validation-context";
```

### Using the higher order components

#### withForm

`withForm` is a higher order component that can wrap any kind of user input.
Below are some examples of how to create some form connected components

##### Text inputs

```javascript
const Input = withForm(({ value, onChange, error, showErrors }) => (
  <div>
    <input type="text" onChange={v => onChange(v)} value={value} />
    {showErrors && error && <span>{error}</span>}
  </div>
));
```

##### Select options

```javascript
const Dropdown = withForm(
  ({ value, onChange, error, showErrors, options, id }) => (
    <div>
      <select id={id} onChange={onChange}>
        {options.map(({ label, val }) => (
          <option key={val} checked={val === value} value={val}>
            {label}
          </option>
        ))}
      </select>
      {showErrors && error && <span>{error}</span>}
    </div>
  )
);
```

##### Radio buttons

```javascript
const Radios = withForm(
  ({ value, onChange, error, showErrors, options, id }) => (
    <div>
      {options.map(({ label, val }) => (
        <React.Fragment key={val}>
          <input
            type="radio"
            onChange={() => onChange(val)}
            name={id}
            checked={value === val}
          />
          <label onClick={() => onChange(val)} htmlFor={id}>
            <span>{label}</span>
          </label>
        </React.Fragment>
      ))}
      {showErrors && error && <span>{error}</span>}
    </div>
  )
);
```


#### withFormButton

`withFormButton` is a higher order component that can a submit or action button

```javascript
const Button = withFormButton(({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
));
```

## Errors

### Inline errors

Errors will be passed to the components by default.
To suppress inline errors you can add the prop `hideErrors`.

For example: 

```Javascript
<Input hideErrors ... />
```

### Error Component

You can use the `FormErrors` component to display errors for specific components or for all errors on the form.

```javascript
<FormErrors /> // will display all form errors

<FormErrors style={{color: 'red'}} className="some-style" /> // to style errors you may pass props

<FormErrors errorsFor="email" /> // display errors for a single component

<FormErrors errorsFor={["name", "email"]} /> // display errors for multiple components

<FormErrors render={error => <span className="error-styles">{error}</span>} /> // use a custom renderer
```

## Implementation

### Validations

`validators` contain a set of validators for performing input validations


`validators.requiredWithMessage`
`validators.required`
`validators.email`
`validators.maxLength`
`validators.minLength`
`validators.exactLength`
`validators.minValue`
`validators.maxValue`
`validators.maxFloatValue`
`validators.decimalWithDot`
`validators.number`
`validators.decimalWithCommaDot`
`validators.nationalInsurance`
`validators.alphaNumeric2WithMessage`
`validators.alphaNumeric2`
`validators.onlyAlphaNumeric`
`validators.address`
`validators.postcode`
`validators.allowedValues`


### Example

```javascript
class App extends Component {
  state = {
    name: "",
    email: ""
  };

  submit() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <Form>
          <FormErrors />
          <Input
            id="name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            validations={[validators.requiredWithMessage('Please enter a name'), validators.maxLength(20)]}
          />
          <Input
            id="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            validations={[validators.required, validators.email]}
          />
          <Dropdown
            id="age"
            value={this.state.age}
            onChange={e => this.setState({ age: e.target.value })}
            options={[
              { label: "one", val: 1 },
              { label: "ten", val: 10 },
              { label: "twenty", val: 20 },
              { label: "thirty", val: 30 }
            ]}
            validations={[validators.required, validators.minValue(15)]}
          />
          <Radios
            id="status"
            value={this.state.status}
            onChange={status => this.setState({ status })}
            options={[
              { label: "alive", val: "alive" },
              { label: "dead", val: "dead" },
              { label: "on holiday", val: "on holiday" }
            ]}
            validations={[
              validators.requiredWithMessage("What is your status?")
            ]}
          />
          <Button onClick={() => this.submit()}>Submit...</Button>
        </Form>
      </div>
    );
  }
}

```

### Contributors

[Dave Nicholas](https://github.com/dave-nicholas), [Martin Carder](https://github.com/MartinCarder), [Ekta Wadhwani](https://github.com/EktaWadhwani), [Mariana Nicholas](https://github.com/manicholas) 