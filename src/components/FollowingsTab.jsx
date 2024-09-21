
// importing functions and components from react library
import { useContext } from "react"

// importing contexts
import { CurrentUserContext } from "../pages/AccountMainPage"

// importing components
import { FollowingPersonTab } from "./FollowingPersonTab"


export const FollowingsTab = () => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="followingTab">
            <p>Following {currentUser?.following.length}</p>

            <div className="followingsList">
                
                {currentUser?.following.map(following => (
                    <FollowingPersonTab key={following} followingID={following}/>
                ))}

            </div>
        </div>
    )
}