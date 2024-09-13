
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// importing css
import './App.css'

// importing layouts
import { MainLayout, mainLoader } from './layouts/MainLayout'

// importing pages
import { MainPage } from "./pages/MainPage"
import { loginAction, LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLoader}>
    {/* main page */}
    <Route index element={<MainPage/>}/>

    {/* sign in page */}
    <Route path="login" element={<LoginPage/>} action={loginAction}/>

    {/* sign up page */}
    <Route path="register" element={<RegisterPage/>}/>

  </Route>
))

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
