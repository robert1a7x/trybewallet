import React, { Component } from 'react';

export default class ExpensesForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
          />
        </label>

        <label htmlFor="coin">
          Moeda:
          <select name="coin" id="coin">
            <option value="vazio">Vazio por enquanto</option>
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod" id="paymentMethod" value="nada ainda">
            <option value="dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" value="nada ainda">
            <option value="alimentacão">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
          />
        </label>
      </form>
    );
  }
}
