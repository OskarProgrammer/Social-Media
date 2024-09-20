
// importing functions and components from react library
import { useContext } from "react"
import { NavLink } from "react-router-dom"

// importing contexts
import { UserContext } from "../layouts/MainLayout"

export const NavBar = ( ) => {

    const currentUser = useContext(UserContext)

    return (
        <div className="navBar">
            
            {/* left side of navBar */}
            <div className="col-start-1 col-span-2 flex lg:sm:justify-start justify-center ">

                <NavLink className="btn-blue lg:sm:block sm:hidden hidden">
                    <i className="bi bi-house"/>
                </NavLink>

                {currentUser.isLogged ? 
                    <NavLink to="/account" className="btn-blue lg:sm:block sm:hidden hidden text-slate-950">
                        <i className="bi bi-person"/>
                    </NavLink> 
                : ""}
                
            </div>

            {/* middle of the navBar */}
            <div className="col-start-3 col-span-1 text-gray-950 flex justify-center my-auto text-center">
                Social Media APP
            </div>
            
            {/* right side of the navBar */}
            <div className="col-start-4 col-span-2 flex lg:sm:justify-end justify-between ">

                <NavLink to="/" className="btn-blue lg:sm:hidden">
                    <i className="bi bi-house"/>
                </NavLink>

                {currentUser.isLogged ? 
                    <NavLink to="/account" className="btn-blue lg:sm:hidden text-slate-950">
                        <i className="bi bi-person"/>
                    </NavLink> 
                : ""}

                { !currentUser.isLogged ? 
                    <>
                        <NavLink to="/login" className="btn-blue flex flex-col text-slate-950">
                            <p className="my-auto">Sign in</p>
                        </NavLink>

                        <NavLink to="/register" className="btn-blue flex flex-col text-slate-950">
                        <p className="my-auto">Sign up</p>
                        </NavLink>
                    </> 
                    : 
                    <>
                        <NavLink to="/account/logOut" className="btn-red">
                            <i className="bi bi-box-arrow-right"/>
                        </NavLink>
                    </>
                }

            </div>

        </div>
    )
}