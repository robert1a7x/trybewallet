// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJson = await response.json();

  const coinsWithoutUSDT = Object.keys(responseJson).filter((coin) => coin !== 'USDT');

  dispatch(getCurrencies(coinsWithoutUSDT));
};
