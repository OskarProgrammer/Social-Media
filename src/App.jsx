
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// importing css
import './App.css'

// importing layouts
import { MainLayout, mainLoader } from './layouts/MainLayout'

// importing pages
import { MainPage } from "./pages/MainPage"
import { loginAction, LoginPage } from './pages/LoginPage'
import { registerAction, RegisterPage } from './pages/RegisterPage'
import { AccountLayout } from './layouts/AccountLayout'
import { logOutLoader, LogOutPage } from './pages/LogOutPage'
import { accountMainLoader, AccountMainPage } from './pages/AccountMainPage'
import { userInfoLoader, UserInfoPage } from './pages/UserInfoPage'
import { createPostAction, NewPostPage } from './pages/NewPostPage'


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLoader}>
    {/* main page */}
    <Route index element={<MainPage/>}/>

    {/* sign in page */}
    <Route path="login" element={<LoginPage/>} action={loginAction}/>

    {/* sign up page */}
    <Route path="register" element={<RegisterPage/>} action={registerAction}/>

    {/* account page */}
    <Route path="account/" element={<AccountLayout/>}>
    
      {/* main account page */}
      <Route index element={<AccountMainPage/>} loader={accountMainLoader}/>

      {/* user info page */}
      <Route path="userInfo" element={<UserInfoPage/>} loader={userInfoLoader}/>

      {/* new post page */}
      <Route path="newPost" element={<NewPostPage/>} action={createPostAction}/>


      {/* log out page */}
      <Route path="logOut" element={<LogOutPage/>} loader={logOutLoader}/>

    </Route>

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
