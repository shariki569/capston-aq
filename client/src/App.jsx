import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";
import { Footer, Nav } from "./Components";
import { Home, Login, Register, Single, Write,About } from "./pages";
import './style.scss'



const Layout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/about-us",
        element:<About/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/create-blog",
    element: <Write/>,
  },
]);


function App() {

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}


export default App
