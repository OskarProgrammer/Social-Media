
// importing functions and components from react library
import { useQuery } from "react-query"

// importing api functions
import { getAuthorOfNotification, getCurrentUserInfo, getNotification } from "../api_functions/functions"
import axios from "axios"
import { NavLink } from "react-router-dom"


export const NotificationItem = ( { notifyID , onRemove } ) => {


    const {data : notificationInfo, refetch : refreshNotification} = useQuery({
        queryFn : () => getNotification(notifyID),
        queryKey : ["notification"],
        refetchInterval : 500
    })

    const {data : authorInfo, refetch : refreshAuthor} = useQuery({
        queryFn : () => getAuthorOfNotification(notifyID),
        queryKey : ["authorInfo"],
        refetchInterval : 500
    })

    

    return (
        <div className="notificationItem">
            <NavLink to={`/post/${notificationInfo?.postID}`}>
                <b>[ { new Date(notificationInfo?.createdAt).toLocaleDateString() } ] </b> 
                {notificationInfo?.message} {authorInfo?.login}
            </NavLink>
            <div className="buttonsBar">
                <button className="btn btn-red text-[25px]" onClick={ () => {onRemove(notifyID)} }>Remove</button>
            </div>
        </div>
    )
}