import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './LandingPage.css';

const LandingPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [tokenPreview, setTokenPreview] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const readToken = async () => {
      if (!isAuthenticated) {
        setTokenPreview('');
        return;
      }
      try {
        const token = await getAccessTokenSilently();
        if (!cancelled) {
          setTokenPreview(`${token.slice(0, 20)}…`);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('We could not retrieve an access token. Please try again after refreshing.');
        }
      }
    };

    void readToken();

    return () => {
      cancelled = true;
    };
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="landing">
      <section className="landing__hero">
        <p className="eyebrow">Welcome back</p>
        <h1>
          Hey {user?.given_name ?? user?.nickname ?? 'there'}, your workspace is secure and ready.
        </h1>
        <p className="lead">
          This landing page is wired to Auth0 using the official React SDK. Users are redirected to the
          universal login experience whenever they hit a protected route without a session. Sign-ups,
          verification and password resets are handled for you.
        </p>
      </section>

      <section className="landing__card-grid">
        <article className="landing__card">
          <h2>Session details</h2>
          <ul>
            <li>
              <span>Status</span>
              <strong>Authenticated</strong>
            </li>
            <li>
              <span>Name</span>
              <strong>{user?.name ?? '—'}</strong>
            </li>
            <li>
              <span>Email</span>
              <strong>{user?.email ?? '—'}</strong>
            </li>
          </ul>
        </article>
        <article className="landing__card">
          <h2>Bearer token</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <p>We automatically request an API token when you land on the page.</p>
              <code>{tokenPreview || 'Fetching token…'}</code>
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default LandingPage;
