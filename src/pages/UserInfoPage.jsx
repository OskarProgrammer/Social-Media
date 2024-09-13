
// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useState } from "react"

// importing api functions
import { getCurrentUserInfo } from "../api_functions/functions"


export const UserInfoPage = () => {

    // getting currentUser
    const currentUserLoader = useLoaderData()

    // creating useState variables
    let [currentUser, setCurrentUser] = useState(currentUserLoader)


    return (
        <div className="userTab">
            <div className="title col-span-full my-auto">
                User info
            </div>

            <div className="flex flex-col gap-5 col-span-full md:col-span-1 lg:row-span-2 p-4 shadow-lg">
                <p>Login : {currentUser.login}</p>
                <p>Password : {currentUser.password}</p>
            </div>

            <div className="flex flex-col gap-5 col-span-full md:col-span-1 lg:row-span-2 p-4 shadow-lg">
                <p>Followers : {currentUser.followers.length}</p>
                <p>Following : {currentUser.following.length}</p>
            </div>

        </div>
    )
}

export const userInfoLoader = async () => {

    let currentUser = await getCurrentUserInfo()

    return currentUser
}