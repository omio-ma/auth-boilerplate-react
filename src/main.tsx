import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import { authConfig, hasValidAuthConfig } from './config/auth';

const rootElement = document.getElementById('root') as HTMLElement;

const MissingConfig = () => (
  <div style={{ padding: '2rem', color: '#f8fafc', fontFamily: 'sans-serif' }}>
    <h1>Auth configuration missing</h1>
    <p>
      Please create an <code>.env.local</code> file based on <code>.env.example</code> and provide
      <code>VITE_AUTH0_DOMAIN</code> and <code>VITE_AUTH0_CLIENT_ID</code>.
    </p>
  </div>
);

const RootApp = () => {
  if (!hasValidAuthConfig) {
    return <MissingConfig />;
  }

  return (
    <Auth0Provider
      domain={authConfig.domain!}
      clientId={authConfig.clientId!}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: authConfig.audience
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  );
};

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
