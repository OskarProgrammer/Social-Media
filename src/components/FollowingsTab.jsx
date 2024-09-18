import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"

export const FollowingsTab = () => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="followingTab">
            <p>Following {currentUser?.following.length}</p>
        </div>
    )
}