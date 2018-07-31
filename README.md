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
            id="asdfad"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            validations={[validators.required]}
          />
          <Input
            id="asdfadsss"
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

[Dave Nicholas](https://github.com/dave-nicholas), [Martin Carder](https://github.com/MartinCarder), [Ekta Carder](https://github.com/EktaWadhwani), [Mariana Nicholas](https://github.com/manicholas) 