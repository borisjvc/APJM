import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './componentes/footer';
import Inicio from './paginas/Inicio';
import Navbar from './componentes/navbar';
import Login from './paginas/Login';
import Peliculas from './paginas/Peliculas';
import Juegos from './paginas/Juegos';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Inicio />
    },
    {
      path: "/peliculas",
      element: <Peliculas />
    },
    {
      path: "/juegos",
      element: <Juegos />
    },
    {
      path: "/anime",
      element: <Peliculas />
    },
    {
      path: "/manga",
      element: <Peliculas />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <div>
        <Navbar />
        <RouterProvider router={router} />
        <Footer />
    </div>
    
  );
}

export default App;
