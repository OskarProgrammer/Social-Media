
// importing functions and components from react library
import { NavLink } from "react-router-dom"

export const NavBar = ( props ) => {

    const currentUser = props.currentUser

    return (
        <div className="navBar">
            
            {/* left side of navBar */}
            <div className="col-start-1 col-span-2 flex lg:sm:justify-start justify-center ">

                <NavLink className="btn-blue lg:sm:block sm:hidden hidden">
                    <i className="bi bi-house"/>
                </NavLink>

                {currentUser.isLogged ? 
                    <NavLink to="/account" className="btn-blue lg:sm:block sm:hidden hidden">
                        <i className="bi bi-person"/>
                    </NavLink> 
                : ""}
                
            </div>

            {/* middle of the navBar */}
            <div className="col-start-3 col-span-1 text-blue-500 flex justify-center my-auto text-center">
                Social Media APP
            </div>
            
            {/* right side of the navBar */}
            <div className="col-start-4 col-span-2 flex lg:sm:justify-end justify-between ">

                <NavLink to="/" className="btn-blue lg:sm:hidden">
                    <i className="bi bi-house"/>
                </NavLink>

                {currentUser.isLogged ? 
                    <NavLink to="/account" className="btn-blue lg:sm:hidden">
                        <i className="bi bi-person"/>
                    </NavLink> 
                : ""}

                { !currentUser.isLogged ? 
                    <>
                        <NavLink to="/login" className="btn-blue">
                            Sign in
                        </NavLink>

                        <NavLink to="/register" className="btn-blue">
                            Sign up
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