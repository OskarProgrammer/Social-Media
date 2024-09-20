

// importing functions and components from react library
import axios from "axios"
import { Outlet } from "react-router-dom"


export const AccountLayout = () => {

    return (
        <>

            <Outlet />

        </>
    )
}

export const accountLoader = async () => {

    const currentUser = await axios.get(`http://localhost:3000/currentUser/`).then(res => res.data)

    if (currentUser.id == "" ) { throw new Error("You havent got permissions to that account")}

    return null
}