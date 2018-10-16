import React, { Component } from 'react';

export interface PropsType {
  onErrorCallback: () => void;
}

export const makeForm = (
  Provider: React.ComponentType<React.ProviderProps<any>>,
  resetErrors: () => void
): React.ComponentClass<PropsType, {}> => {
  class Form extends Component<PropsType, {}> {
    state = {
      isValid: null,
      // The below line is here becasue forceUpdate doesn't seem to work with context
      invalidateParentForm: () => this.setState({ updated: true }),
      setIsValidState: (isValid: boolean): void | null =>
        isValid !== this.state.isValid
          ? this.setState({ isValid: false })
          : null
    };

    componentWillMount() {
      resetErrors();
      const { onErrorCallback } = this.props;

      this.setState({ onErrorCallback });
    }

    render() {
      const { children, onErrorCallback, ...props } = this.props;

      return (
        <Provider value={this.state}>
          <form
            {...props}
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            {children}
          </form>
        </Provider>
      );
    }
  }
  return Form;
};
