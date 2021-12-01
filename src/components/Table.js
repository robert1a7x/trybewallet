import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense as deleteExpenseAction } from '../actions';
import './Table.css';

var formatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

class Table extends Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(expense) {
    const { deleteExpense } = this.props;

    deleteExpense(expense);
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ formatter.format(expense.value) }</td>
              <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                { formatter.format((parseFloat(expense.value)
                  * parseFloat(expense.exchangeRates[expense.currency].ask))) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.deleteExpense(expense) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
