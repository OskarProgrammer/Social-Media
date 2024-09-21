import { NavLink } from "react-router-dom"
import { useFollower } from "../custom_hooks/custom"


export const FollowersPersonTab = ( { followerID } ) => {

    const { data : followerInfo, isLoading} = useFollower({followerID : followerID})

    return (
        <NavLink to={`/user/${followerID}`} className="followingPerson">
            <p>{isLoading ? "Loading..." : `${followerInfo?.login}` }</p>
        </NavLink>
    )
}