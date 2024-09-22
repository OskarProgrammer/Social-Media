
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

// importing css
import './App.css'
import "animate.css/animate.compat.css"

// importing layouts
import { MainLayout } from './layouts/MainLayout'

// importing pages
import { MainPage } from "./pages/MainPage"
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AccountLayout, accountLoader } from './layouts/AccountLayout'
import { AccountMainPage } from './pages/AccountMainPage'
import { userInfoLoader, UserInfoPage } from './pages/UserInfoPage'
import { NewPostPage } from './pages/NewPostPage'
import { PostDetailsPage } from './pages/PostDetailsPage'
import { ErrorPage } from './pages/ErrorPage'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { MessagesPage } from './pages/MessagesPage'


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} errorElement={<ErrorPage/>}>
    {/* main page */}
    <Route index element={<MainPage/>}/>

    {/* sign in page */}
    <Route path="login" element={<LoginPage/>}/>

    {/* sign up page */}
    <Route path="register" element={<RegisterPage/>}/>

    {/* post details page */}
    <Route path="post/:postID" element={<PostDetailsPage/>}/>

    {/* user details page */}
    <Route path="user/:userID" element={<UserDetailsPage/>} />

    {/* account page */}
    <Route path="account/" element={<AccountLayout/>} loader={accountLoader}>
    
      {/* main account page */}
      <Route index element={<AccountMainPage/>}/>

      {/* user info page */}
      <Route path="userInfo" element={<UserInfoPage/>} loader={userInfoLoader}/>

      {/* new post page */}
      <Route path="newPost" element={<NewPostPage/>}/>

      {/* messages page */}
      <Route path="messages" element={<MessagesPage/>}/>

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
