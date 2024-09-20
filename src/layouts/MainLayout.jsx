
// importing functions and components from react library
import { Outlet, } from "react-router-dom"
import { createContext } from "react"

// importing components
import { NavBar } from "../components/NavBar"
import { MessageIcon } from "../components/MessageIcon"

// importing api functions
import { useQuery } from "react-query"
import { getCurrentUserInfo } from "../api_functions/functions"
import axios from "axios"

// contexts
export const UserContext = createContext(null)


export const MainLayout = () => {

    const {data : currentUser, isLoading} = useQuery({
        queryFn : async () => await axios.get(`http://localhost:3000/currentUser/`).then( res => res.data),
        queryKey : ["currentUser"],
        refetchInterval : 200
    })

    if (isLoading){ return <div>Loading...</div>}

    return (
        <>
            <UserContext.Provider value={currentUser}>
                <NavBar />
                
                { currentUser?.id != "" ? <MessageIcon/> : ""}
            </UserContext.Provider>

            <div className="m-10 flex justify-center text-white text-2xl p-5 mx-auto">
                <Outlet />
            </div>
        </>
    )
}