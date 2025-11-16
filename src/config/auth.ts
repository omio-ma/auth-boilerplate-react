export type AuthConfig = {
  domain?: string;
  clientId?: string;
  audience?: string;
};

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

export const authConfig: AuthConfig = {
  domain,
  clientId,
  audience
};

export const hasValidAuthConfig = Boolean(domain && clientId);
