import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import '@mantine/core/styles.css';

const App = () => {
  const guestRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
      // loader: rootLoader,
    },
    {
      path: "/register",
      element: <Register />,
      // loader: rootLoader,
    },
  ]);

  return (
    <>
      <RouterProvider
        router={
          guestRouter
        }
      />
    </>
  );
}

export default App;
