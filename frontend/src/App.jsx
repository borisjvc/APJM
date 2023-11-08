import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from './paginas/Inicio';
import Navbar from './componentes/navbar';
import Login from './paginas/Login';
import Peliculas from './paginas/Peliculas';
import Juegos from './paginas/Juegos';
import Anime from './paginas/Anime';
import Manga from './paginas/Manga';
import Descripcion from './paginas/Descripcion';
import Registro from './paginas/Registro';
import Trivia from './paginas/Trivia';
import Footer from './componentes/Footer';
import Usuarios  from './paginas/Dashboard/usuarios';

function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Inicio />
    },
    {
      path: "/descripcion/:Categoria/:Id",
      element: <Descripcion/>
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
      element: <Anime />
    },
    {
      path: "/manga",
      element: <Manga />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/registro",
      element: <Registro/>
    },
    {
      path: "/trivia",
      element: <Trivia/>
    },
    {
      path: "/inicio-admin",
      element: <Usuarios/>
    },
    
  ])
  return (
    <div>
        <Navbar />
        <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
