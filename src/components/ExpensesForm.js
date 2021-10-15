import React, { Component } from 'react';
import PaymentMethod from './PaymentMethod';
import Tag from './Tag';

export default class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      coins: [],
      value: '',
      coin: '',
      payment: '',
      tag: '',
      description: '',
    };

    this.fetchCoinsNames = this.fetchCoinsNames.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCoinsNames();
  }

  async fetchCoinsNames() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();

    const coinsWithoutUSDT = Object.keys(responseJson).filter((coin) => coin !== 'USDT');

    this.setState({ coins: coinsWithoutUSDT });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { coins, value, coin, payment, tag, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="coin">
          Moeda:
          <select name="coin" id="coin" value={ coin } onChange={ this.handleChange }>
            { coins.map((coinShort, i) => (
              <option value={ coinShort } key={ i }>{ coinShort }</option>
            )) }
          </select>
        </label>
        <PaymentMethod value={ payment } handleChange={ this.handleChange } />
        <Tag value={ tag } handleChange={ this.handleChange } />
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}
