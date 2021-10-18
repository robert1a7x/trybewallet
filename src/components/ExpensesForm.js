import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaymentMethod from './PaymentMethod';
import Tag from './Tag';
import { fetchCurrencies, getExpenses } from '../actions';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitExpenses = this.submitExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencie } = this.props;

    fetchCurrencie();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async submitExpenses(e) {
    const { id, value, currency, method, tag, description } = this.state;
    const { getExpense } = this.props;
    e.preventDefault();

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();

    const expenses = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: responseJson,
    };

    getExpense(expenses);

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

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
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((coinShort, i) => (
              <option value={ coinShort } key={ i }>{ coinShort }</option>
            )) }
          </select>
        </label>
        <PaymentMethod value={ method } handleChange={ this.handleChange } />
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
        <button type="submit" onClick={ this.submitExpenses }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  getExpense: PropTypes.func.isRequired,
  fetchCurrencie: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencie: () => dispatch(fetchCurrencies()),
  getExpense: (payload) => dispatch(getExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
