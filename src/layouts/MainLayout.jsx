
// importing functions and components from react library
import { Outlet, useLoaderData } from "react-router-dom"
import { createContext, useEffect, useState } from "react"

// importing components
import { NavBar } from "../components/NavBar"
import { MessageIcon } from "../components/MessageIcon"

// importing api functions
import axios from "axios"

// contexts
export const UserContext = createContext(null)


export const MainLayout = () => {

    // getting loaderData
    const currentUserLoader = useLoaderData()

    // creating useState variable
    let [currentUser, setCurrentUser] = useState(currentUserLoader)

    // creating useEffect function to update
    useEffect( () => {
        const interval = setInterval( async () => {

            currentUser = await axios.get("http://localhost:3000/currentUser/")
                                   .then( (data) => { return data.data } )
                                   .catch( (error) => { return error } )
            setCurrentUser(currentUser)

        },50)

        return () => { clearInterval(interval) }
    } )

    return (
        <>
            <UserContext.Provider value={currentUser}>
                <NavBar />
                
                { currentUser.id != "" ? <MessageIcon/> : ""}
            </UserContext.Provider>

            <div className="m-10 flex justify-center text-white text-2xl p-5 mx-auto">
                <Outlet />
            </div>
        </>
    )
}

export const mainLoader = async () => {
    // getting currentUser
    const currentUser = await axios.get("http://localhost:3000/currentUser/")
                                   .then( (data) => { return data.data } )
                                   .catch( (error) => { return error } )
    
    return currentUser
}