import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PaymentMethod extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="payment">
        Método de pagamento:
        <select name="payment" id="payment" value={ value } onChange={ handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
