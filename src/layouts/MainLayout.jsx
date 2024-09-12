
// importing components
import { Outlet } from "react-router-dom"
import { NavBar } from "../components/NavBar"


export const MainLayout = () => {


    return (
        <>
            <NavBar />
            <div className="m-5 flex justify-center text-white text-2xl p-5">
                <Outlet />
            </div>
        </>
    )
}