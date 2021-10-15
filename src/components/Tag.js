import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select name="tag" id="tag" value={ value } onChange={ handleChange }>
          <option value="Alimentacão">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

Tag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
