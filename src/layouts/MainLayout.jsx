
// importing functions and components from react library
import { Outlet, } from "react-router-dom"
import { createContext } from "react"

// importing components
import { NavBar } from "../components/NavBar"
import { MessageIcon } from "../components/MessageIcon"

// hooks
import { useCurrentUser } from "../custom_hooks/custom"

// contexts
export const UserContext = createContext(null)


export const MainLayout = () => {

    const {data : currentUser, isLoading} = useCurrentUser()

    if (isLoading){ return <div className="w-full h-screen flex flex-col justify-center items-center text-[50px]">Loading...</div>}

    return (
        <>
            <UserContext.Provider value={currentUser}>
                <NavBar />
                { currentUser?.isLogged  ? <MessageIcon/> : ""}
            </UserContext.Provider>

            <div className="m-10 flex justify-center text-white text-2xl p-5 mx-auto">
                <Outlet />
            </div>
        </>
    )
}