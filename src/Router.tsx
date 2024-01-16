import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import WalletWizardPage from './pages/WalletWizard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/wallet-wizard',
      element: <WalletWizardPage />,
    },
  ],
  {
    basename: import.meta.env.VITE_BASENAME,
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
