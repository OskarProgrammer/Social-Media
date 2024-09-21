import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"
import { FollowersPersonTab } from "./FollowersPersonTab"

export const FollowersTab = () => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="followersTab">
            <p>Followers {currentUser?.followers.length}</p>

            
            <div className="followersList">
                {currentUser?.followers.map( follower => (
                    <FollowersPersonTab key={follower} followerID={follower} />
                ))}
            </div>

        </div>
    )
}