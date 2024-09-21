
// functions and components from react library
import { useContext } from "react"

// contexts
import { CurrentUserContext } from "../pages/AccountMainPage"

// components
import { LikeTab } from "./LikeTab"

// custom hooks
import { useLikes } from "../custom_hooks/custom"


export const LikesTab = () => {

    const currentUser = useContext(CurrentUserContext)

    const { data : likes , isLoading } = useLikes({userID : currentUser.id})

    return (
        <div className="likesTab">
            <p>Likes {likes?.length}</p>


            {likes?.length == 0 ? <p className="pt-[50px]">Posts that you like will appear here</p> : ""} 

            <div className="likesList">

                {isLoading ? <p>Loading...</p> : ""}

                {likes?.map( like => (
                    <LikeTab key={like.id} like={like} />
                ))}

                
            </div>

        </div>
    )
}