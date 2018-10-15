/* eslint no-undef: 1 */
/* eslint no-return-assign: 1 */

import React, { Component } from 'react';

interface PropsType {
  onErrorCallback: () => void;
}

export const makeForm = (
  Provider: React.ComponentType<React.ProviderProps<any>>,
  resetErrors: () => void
) => {
  class Form extends Component<PropsType, {}> {
    /* eslint-disable */
    state = {
      isValid: null,
      // The below line is here becasue forceUpdate doesn't seem to work with context
      invalidateParentForm: () => this.setState({ updated: true }),
      setIsValidState: (isValid: boolean): void | null =>
        isValid !== this.state.isValid
          ? this.setState({ isValid: false })
          : null
    };
    /* eslint-enable */

    componentWillMount() {
      resetErrors();
      const { onErrorCallback } = this.props;
      /* eslint-disable-next-line react/no-unused-state */
      this.setState({ onErrorCallback });
    }

    render() {
      const { children, onErrorCallback, ...props } = this.props;

      return (
        <Provider value={this.state}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
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
