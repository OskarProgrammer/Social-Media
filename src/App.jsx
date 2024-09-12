
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// importing css
import './App.css'

// importing layouts
import { MainLayout } from './layouts/MainLayout'

// importing pages
import { MainPage } from "./pages/MainPage"


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
    <Route index element={<MainPage/>}/>

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
