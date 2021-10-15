import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input data-testid="email-input" type="email" name="email" required />
        <input data-testid="password-input" type="text" name="password" required />
        <button type="button">Entrar</button>
      </div>);
  }
}

export default Login;
