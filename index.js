import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);

    // If the onChange prop is a function, cache off a debounced
    // version of it.  Otherwise, cache off a noop.
    const debounced = typeof props.onChange === 'function'
      ? debounce(props.onChange, 200)
      : () => { };

    this.state = {
      value: props.value,
      onChange: debounced
    };

    this.changeHandler = (e) => {
      // Remove the synthetic event from the pool
      e.persist();

      // Update our local state, and then call the debounced
      // or noop change handler function.
      this.setState({ value: e.target.value });
      this.state.onChange(e);
    };
  }

  render() {
    return (
      <textarea value={this.state.value} name={this.props.name} onChange={this.changeHandler} />
    );
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

TextArea.defaultProps = {
  value: '',
  name: '',
  onChange: false
};
