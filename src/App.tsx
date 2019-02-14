import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hot } from 'react-hot-loader';
import { login } from './store/actions';
/**
 * Normalize css with side effect
 */
import './theme/css-baseline';

import Typography from './components/Typography';
import Input from './components/Input';

type Props = {
  handleLogin: ({}) => void;
  login: any;
};

class App extends Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const data = [...form.querySelectorAll('input')].reduce(
      (acc, e, i) => {
        if (i === 0) {
          return { ...acc, email: e.value };
        } else {
          return { ...acc, password: e.value };
        }
      },
      { password: '', email: '' }
    );
    this.props.handleLogin(data);
  };

  goBack = () => {
    location.reload();
  };

  render() {
    const { pending, error, success } = this.props.login;

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1em',
          boxSizing: 'border-box'
        }}
      >
        <a
          href="#"
          style={{ position: 'absolute', left: '1em', top: 'calc(1em + 8px)' }}
          onClick={this.goBack}
        >
          {'< Retour'}
        </a>

        <Typography color="primary" variant="main-title">
          gojob
        </Typography>
        {success ? (
          <Typography color="success" variant="headline2">
            Connexion réussie
          </Typography>
        ) : (
          <form
            style={{
              display: 'flex',
              maxWidth: '315px',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '40px'
            }}
            onSubmit={pending ? () => {} : this.handleSubmit}
          >
            <Typography variant="headline2" style={{ marginBottom: '17px' }}>
              Connexion
            </Typography>
            <Typography style={{ textAlign: 'center', marginBottom: '47px' }}>
              Merci d’utiliser l’adresse email et le mot de passe que vous avez indiqués lors de votre
              inscription.
            </Typography>
            <div style={{ marginBottom: '17px', width: '100%' }}>
              <Typography variant="label" style={{ marginBottom: '17px' }} color="text">
                ADRESSE EMAIL
              </Typography>
              <Input type="email" />
            </div>
            <div style={{ marginBottom: '8px', width: '100%' }}>
              <Typography variant="label" style={{ marginBottom: '17px' }} color="text">
                MOT DE PASSE
              </Typography>
              <Input type="password" />
            </div>
            <Typography style={{ textAlign: 'center', marginBottom: '24px' }} color="primary">
              <a href="#">{'J’ai oublié mon mot de passe'}</a>
            </Typography>
            {error && (
              <Typography style={{ textAlign: 'center', marginBottom: '24px' }} color="alert">
                Adresse email ou mot de passe invalide !
              </Typography>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                backgroundImage: 'linear-gradient(95deg, #3a44e9, #7038e3)',
                color: 'white',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              {pending ? 'En cours ...' : 'Continuer'}
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default hot(module)(
  connect(
    (state: any) => ({ login: state.login }),
    { handleLogin: login }
  )(App)
);
