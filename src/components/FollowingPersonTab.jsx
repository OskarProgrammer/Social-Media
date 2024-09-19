import { useQuery } from "react-query"
import { getUserById } from "../api_functions/functions"
import { NavLink } from "react-router-dom"


export const FollowingPersonTab = ( { followingID } ) => {

    const { data : followingInfo, isLoading} = useQuery({
        queryFn : () => getUserById(followingID),
        queryKey : ["followingInfo"],
        refetchInterval : 500,
        retryDelay : 200
    })


    return (
        <NavLink to={`/user/${followingID}`} className="followingPerson">
            <p>{isLoading ? "Loading..." : `${followingInfo?.login}` }</p>
        </NavLink>
    )
}