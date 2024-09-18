import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"
import { useQuery } from "react-query"
import { getCommentsOfUser } from "../api_functions/functions"

export const CommentsTab = () => {

    const currentUser = useContext(CurrentUserContext)

    const { data : comments, refetch : refreshComments} = useQuery({
        queryFn : () => getCommentsOfUser(currentUser.id),
        queryKey : ["comments"],
        refetchInterval : 500
    })

    return (
        <div className="commentsTab">
            <p>Comments {comments?.length}</p>
        </div>
    )
}