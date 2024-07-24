import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavigatePanel from './components/NavigatePanel/NavigatePanel';
import Error from './pages/Error/Error';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NewsList from './components/NewsList/NewsList';
import NewsDetail from './components/NewsDetail/NewsDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavigatePanel />,
    children: [
      {
        path: '/',
        element: <NewsList />,
      },
      {
        path: 'news/:id',
        element: <NewsDetail />,
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
