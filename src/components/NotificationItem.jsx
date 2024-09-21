
// importing functions and components from react library
import { NavLink } from "react-router-dom"

// importing hooks
import { useNotification, useNotifyAuthor } from "../custom_hooks/custom"


export const NotificationItem = ( { notifyID , onRemove } ) => {


    const {data : notificationInfo} = useNotification({notifyID : notifyID})

    const {data : authorInfo} = useNotifyAuthor({notifyID : notifyID})

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