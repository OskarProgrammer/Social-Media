
// importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

// importing css
import './App.css'

// importing layouts
import { MainLayout } from './layouts/MainLayout'


// creating router
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>


  </Route>
))

function App() {

  return (
    <>
      
    </>
  )
}

export default App
