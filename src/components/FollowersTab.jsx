import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"

export const FollowersTab = () => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="followersTab">
            <p>Followers {currentUser?.followers.length}</p>
        </div>
    )
}