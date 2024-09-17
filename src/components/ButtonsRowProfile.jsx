
// importing functions and components from react library
import { useContext } from "react"

// importing contexts
import { CurrentUserContext, UserContext } from "../pages/UserDetailsPage"
import axios from "axios"

export const ButtonsRowProfile = () => {

    const userInfo = useContext(UserContext)
    const currentUserInfo = useContext(CurrentUserContext)

    const toggleFollow = async () => {
        
        if (userInfo.followers.includes(currentUserInfo.id)){
            userInfo.followers = userInfo.followers.filter( e => e != currentUserInfo.id )
            currentUserInfo.following = currentUserInfo.following.filter( e => e != userInfo.id)
        }else {
            userInfo.followers.push(currentUserInfo.id)
            currentUserInfo.following.push(userInfo.id)
        }

        try {
            await axios.put(`http://localhost:3000/users/${userInfo.id}`, userInfo)
        } catch { throw new Error ("Something went wrong during making follow to profile")}

        try {
            await axios.put(`http://localhost:3000/users/${currentUserInfo.id}`, currentUserInfo)
        } catch { throw new Error ("Something went wrong during making follow to profile")}
        
    }

    return (
        <div className="buttonsRow">

            { currentUserInfo != undefined && currentUserInfo.id != userInfo.id? 
                <button onClick={()=>{toggleFollow()}} className="btn-blue-light">
                    { userInfo.followers.includes(currentUserInfo.id) ? "Unfollow" : "Follow"}
                </button> 
            : ""}

        </div>
    )
}