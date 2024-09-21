import { NavLink } from "react-router-dom"
import { useFollowing } from "../custom_hooks/custom"


export const FollowingPersonTab = ( { followingID } ) => {

    const { data : followingInfo, isLoading} = useFollowing({followingID : followingID})

    return (
        <NavLink to={`/user/${followingID}`} className="followingPerson">
            <p>{isLoading ? "Loading..." : `${followingInfo?.login}` }</p>
        </NavLink>
    )
}