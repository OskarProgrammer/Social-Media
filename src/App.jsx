
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

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
import { AccountMainPage } from './pages/AccountMainPage'
import { userInfoLoader, UserInfoPage } from './pages/UserInfoPage'
import { createPostAction, NewPostPage } from './pages/NewPostPage'
import { PostDetailsPage } from './pages/PostDetailsPage'
import { UserPostsPage } from './pages/UserPostsPage'
import { ErrorPage } from './pages/ErrorPage'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { MessagesPage } from './pages/MessagesPage'


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLoader} errorElement={<ErrorPage/>}>
    {/* main page */}
    <Route index element={<MainPage/>}/>

    {/* sign in page */}
    <Route path="login" element={<LoginPage/>} action={loginAction}/>

    {/* sign up page */}
    <Route path="register" element={<RegisterPage/>} action={registerAction}/>

    {/* post details page */}
    <Route path="post/:postID" element={<PostDetailsPage/>}/>

    {/* user details page */}
    <Route path="user/:userID" element={<UserDetailsPage/>} />

    {/* posts of user page */}
    <Route path="posts/:userID" element={<UserPostsPage/>}/>

    {/* account page */}
    <Route path="account/" element={<AccountLayout/>}>
    
      {/* main account page */}
      <Route index element={<AccountMainPage/>}/>

      {/* user info page */}
      <Route path="userInfo" element={<UserInfoPage/>} loader={userInfoLoader}/>

      {/* new post page */}
      <Route path="newPost" element={<NewPostPage/>} action={createPostAction}/>

      {/* messages page */}
      <Route path="messages" element={<MessagesPage/>}/>

      {/* log out page */}
      <Route path="logOut" element={<LogOutPage/>} loader={logOutLoader}/>

    </Route>

  </Route>
))

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}> 
        <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
