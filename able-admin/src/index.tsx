import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import router from 'routes';
import { AuthProvider } from 'hooks/useAuth';
import ThemeCustomization from 'themes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeCustomization>
    <IntlProvider locale="hu" defaultLocale="hu" messages={{}}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </IntlProvider>
  </ThemeCustomization>
);
