
// importing functions and components from react library
import { NavLink } from "react-router-dom"

export const NavBar = () => {


    return (
        <div className="navBar">
            
            {/* left side of navBar */}
            <div className="col-start-1 col-span-2 flex lg:sm:justify-start justify-center ">
                <button className="btn-blue lg:sm:block sm:hidden hidden">Main Page</button>
            </div>

            {/* middle of the navBar */}
            <div className="col-start-3 col-span-1 text-blue-500 flex justify-center my-auto text-center">
                Social Media APP
            </div>
            
            {/* right side of the navBar */}
            <div className="col-start-4 col-span-2 flex lg:sm:justify-end justify-between ">

                <button className="btn-blue lg:sm:hidden">Main Page</button>

                <NavLink to="/login" className="btn-blue">
                    Sign in
                </NavLink>

                <NavLink to="/register" className="btn-blue">
                    Sign up
                </NavLink>

            </div>

        </div>
    )
}