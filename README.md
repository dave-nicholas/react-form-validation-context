# react-form-validation-context

A lightweight react form validation library that uses HOCs (higher order components) for functional programming.

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
  withFormButton
} from "react-form-validation-context";
```

### Using the higher order components

#### withForm

`withForm` is a higher order component that can wrap any kind of user input


```javascript
const Input = withForm(({ value, onChange, error, showErrors }) => (
  <div>
    <input type="text" onChange={v => onChange(v)} value={value} />
    {showErrors && error && <span>{error}</span>}
  </div>
));
```

#### withFormButton

`withFormButton` is a higher order component that can a sumbit or action button

```javascript
const Button = withFormButton(({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
));
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
          <Button onClick={() => this.submit()}>Submit...</Button>
        </Form>
      </div>
    );
  }
}

```

### Contributors

[Dave Nicholas](https://github.com/dave-nicholas), [Martin Carder](https://github.com/MartinCarder), [Ekta Wadhwani](https://github.com/EktaWadhwani), [Mariana Nicholas](https://github.com/manicholas) 