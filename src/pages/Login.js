import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEmail as getEmailAction } from '../actions';

const regex = /\S+@\S+\.\S+/;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.dataValidation = this.dataValidation.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  dataValidation() {
    const MIN_PASS_LENGTH = 5;
    const { email, password } = this.state;

    if (regex.test(email) && password.length >= MIN_PASS_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.dataValidation();
  }

  submitEmail() {
    const { getEmail, history } = this.props;
    const { email } = this.state;

    getEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          required
          placeholder="E-mail"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Senha"
          required
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.submitEmail }
        >
          Entrar
        </button>
      </div>);
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(getEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
