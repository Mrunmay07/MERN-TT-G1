import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
/* import About from "./pages/About"; */
/* import Contact from "./pages/Contact"; */
/* import Movies from "./pages/Movies"; */
import AppLayout from "./components/layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import getMoviesData from "./api/GetAPIData";
import MoviesDetails from "./pages/MoviesDetails";
import getMovieDetails from "./api/GetMovieDetails";
import { lazy } from "react";

const About = lazy(() => import('./pages/About'))
const Movies = lazy(() => import('./pages/Movies'))
const Contact =lazy(() => import('./pages/Contact'))

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/movies",
          element: <Movies />,
          loader:getMoviesData
        },
        {
          path:'/movies/:movieID',
          element:<MoviesDetails/>,
          loader:getMovieDetails
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
