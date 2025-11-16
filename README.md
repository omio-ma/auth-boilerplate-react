# Auth Boilerplate React

A production-ready Vite + React + TypeScript starter that demonstrates how to protect a landing page with
Auth0. Unauthenticated visitors are redirected to the hosted login page where they can log in or sign up.
Once authenticated, the nav bar shows their name, the page fetches a bearer token, and a logout button is
provided.

## Features

- ⚡️ Vite + React 18 + TypeScript setup
- 🔐 Auth0 React SDK with refresh tokens enabled and silent token renewal
- 🔁 Route guard that redirects unauthenticated visitors to Universal Login
- 🎨 Simple gradient landing page with status cards and nav bar CTA
- 📦 Environment variable driven configuration with `.env.example`

## Getting started

```bash
npm install
cp .env.example .env.local # then fill in your Auth0 values
npm run dev
```

Required environment variables:

| Name | Description |
| --- | --- |
| `VITE_AUTH0_DOMAIN` | Your Auth0 tenant domain (e.g. `dev-123.eu.auth0.com`). |
| `VITE_AUTH0_CLIENT_ID` | SPA client ID configured with rotating refresh tokens enabled. |
| `VITE_AUTH0_AUDIENCE` | (Optional) API identifier for issuing access tokens. |

## Auth flow

1. Any request to `/` renders a protected route. Without a session, the Auth0 SDK automatically redirects to
   Universal Login where users can pick _Log in_ or _Sign up_.
2. After account creation Auth0 sends the verification email. Once verified, the user can log in.
3. On return, the nav bar reflects the signed-in state, shows the profile name/email and exposes a logout
   button. The landing page fetches a bearer token preview using `getAccessTokenSilently`.

## Production notes

- Configure the callback/logout URLs inside Auth0 to match your deployment host.
- Update `VITE_AUTH0_AUDIENCE` when securing a specific API. The sample already requests a token on load.
- The Auth0 SDK stores the session in `localStorage` with refresh tokens enabled so page reloads remain
  authenticated.
