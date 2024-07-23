import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavigatePanel from './components/NavigatePanel/NavigatePanel';
import Error from './pages/Error/Error';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NewsList from './components/NewsList/NewsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavigatePanel />,
    children: [
      {
        path: '/',
        element: <NewsList />,
      },
    ],
  },
  {
    path: '/error',
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
