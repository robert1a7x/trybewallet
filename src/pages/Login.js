import React from 'react';

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
          type="text"
          name="password"
          placeholder="Senha"
          required
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ disabled }
        >
          Entrar
        </button>
      </div>);
  }
}

export default Login;
