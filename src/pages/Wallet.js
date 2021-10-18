import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    const { expenses } = this.props;

    const totalExpense = expenses.reduce((acc, curr) => (
      acc + parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask)
    ), 0);

    return (
      <>
        <header>
          <div data-testid="email-field">{ `Email: ${email}` }</div>
          <div>
            Despesa total:
            { ' ' }
            <span data-testid="total-field">
              {
                !totalExpense
                  ? '0'
                  : totalExpense.toFixed(2)
              }
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </header>
        <ExpensesForm />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);
