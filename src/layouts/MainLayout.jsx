
// importing functions and components from react library
import { Outlet } from "react-router-dom"

// importing components
import { NavBar } from "../components/NavBar"


export const MainLayout = () => {


    return (
        <>
            <NavBar />
            <div className="m-10 flex justify-center text-blue-500 text-2xl p-5 mx-auto">
                <Outlet />
            </div>
        </>
    )
}