import type { ComponentType } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import FullPageLoader from './FullPageLoader';

export function securePage<T extends object>(Component: ComponentType<T>) {
  return withAuthenticationRequired(Component, {
    onRedirecting: () => <FullPageLoader />
  });
}

export default securePage;
