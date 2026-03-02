import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
import ListPage from './pages/Listpage/ListPage';
import SinglePage from './pages/SinglePage/SinglePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import {ToastContainer} from 'react-toastify'
import ProfileUpdatePage from './pages/profileUpdatePage.jsx/ProfileUpdatePage';
import NewPostPage from './pages/newPostPage/NewPostPage';
import { listPageLoader, singlePageLoader } from './lib/loader';



function App() {
  const router = createBrowserRouter([
    {
      path:'/', element: <Layout />,
      children: [
        {
          path: '/', element:<Home />

        },
        {
          path:'/list', element: <ListPage />, loader: listPageLoader
        },
        {
          path:'/:id',element:<SinglePage />, loader: singlePageLoader        
        },
        {
          path:'/profile',element:<ProfilePage />        
        },
        {
          path:'/profile/update',element:<ProfileUpdatePage />        
        },
        {
          path:'/register',element:<Register />        
        },
        {
          path:'/login',element:<Login />        
        },
        {
          path:'/add',element:<NewPostPage />        
        },
      ]

    }
  ])
  return (
    <>
   <RouterProvider router={router} />
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  )
}

export default App;
