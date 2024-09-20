
// importing functions and components from react library
import { redirect, useLoaderData } from "react-router-dom"

// importing api functions
import axios from "axios"
import { useMutation } from "react-query"


export const LogOutPage = () => {

    // getting useLoaderData
    const loaderData = useLoaderData()

    return (
        <></>
    )
}

export const logOutLoader = async () => {

    try {
        await axios.put("http://localhost:3000/currentUser/" , {
            id : "",
            isLogged : false
        })
    } catch { throw new Error("Something went wrong during log out process") }

    return redirect("/")
}