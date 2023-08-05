
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Registrition from './pages/Registration/Registration'
import Login from './pages/Login/Login'
import ForgotPage from './Components/ForgotPage/ForgotPage'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registrition/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/forgot",
      element: <ForgotPage/>
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
