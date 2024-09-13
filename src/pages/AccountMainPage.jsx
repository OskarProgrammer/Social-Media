
// importing api functions
import axios from "axios"
import { getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { AccountInfoTab } from "../components/AccountInfoTab"
import { CommentsInfoTab } from "../components/CommentsInfoTab"
import { LikesInfoTab } from "../components/LikesInfoTab"
import { PostsInfoTab } from "../components/PostsInfoTab"
import { UserInfoTab } from "../components/UserInfoTab"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"


export const AccountMainPage = () => {

    // getting loader data
    const currentUserLoader = useLoaderData()

    // craeting useState variables
    let [currentUser, setCurrentUser] = useState(currentUserLoader)

    // useEffect to update currentUser
    useEffect(()=>{
        const interval = setInterval( async () => { 

            try {
                currentUser = await getCurrentUserInfo()
            } catch { throw new Error("Error during updating data")}

            setCurrentUser(currentUser)

        },100)

        return () => {clearInterval(interval)}
    })


    return (
        <div className="accountLayout">

            <AccountInfoTab />

            <UserInfoTab currentUser={currentUser}/>

            <PostsInfoTab />

            <LikesInfoTab />

            <CommentsInfoTab />
            
        </div>
    )
}

export const accountMainLoader = async () => {

    let currentUser = await getCurrentUserInfo()

    return currentUser
}