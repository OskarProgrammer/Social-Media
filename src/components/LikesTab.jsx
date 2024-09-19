import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"
import { useQuery } from "react-query"
import { getLikesOfUser } from "../api_functions/functions"
import { LikeTab } from "./LikeTab"

export const LikesTab = () => {

    const currentUser = useContext(CurrentUserContext)

    const { data : likes, refetch : refreshLikes} = useQuery({
        queryFn : () => getLikesOfUser(currentUser?.id),
        queryKey : ["likes"],
        refetchInterval : 500,
    })

    return (
        <div className="likesTab">
            <p>Likes {likes?.length}</p>

            <div className="likesList">
                {likes?.map( like => (
                    <LikeTab key={like.id} like={like} />
                ))}
            </div>

        </div>
    )
}