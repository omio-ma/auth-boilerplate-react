import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './NavBar.css';

export const NavBar = () => {
  const { isAuthenticated, user, isLoading, loginWithRedirect, logout } = useAuth0();

  const initials = useMemo(() => {
    if (!user?.name) {
      return undefined;
    }
    return user.name
      .split(' ')
      .map((segment) => segment.at(0))
      .join('')
      .toUpperCase();
  }, [user?.name]);

  const handleLogin = () => loginWithRedirect();
  const handleSignup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__logo" aria-hidden>
          🔐
        </span>
        <div>
          <p className="nav__title">Identity Ready Landing Page</p>
          <p className="nav__version">v{__APP_VERSION__}</p>
        </div>
      </div>

      <div className="nav__actions">
        {isLoading && <span className="nav__status">Checking session…</span>}
        {!isLoading && !isAuthenticated && (
          <div className="nav__cta">
            <button type="button" className="btn secondary" onClick={handleSignup}>
              Sign up
            </button>
            <button type="button" className="btn primary" onClick={handleLogin}>
              Log in
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div className="nav__user">
            <div className="avatar" aria-hidden>
              {initials ?? '🙂'}
            </div>
            <div className="nav__user-details">
              <span className="nav__status">Signed in</span>
              <strong>{user?.name ?? user?.email}</strong>
            </div>
            <button type="button" className="btn ghost" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
