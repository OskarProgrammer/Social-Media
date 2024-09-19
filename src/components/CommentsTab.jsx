
// importing functions and components from react library
import { useContext } from "react"

// importing contexts
import { CurrentUserContext } from "../pages/AccountMainPage"

// importing api functions
import { useQuery } from "react-query"
import { getCommentsOfUser } from "../api_functions/functions"

// importing components
import { CommentShortcutTab } from "./CommentShortcutTab"


export const CommentsTab = () => {

    const currentUser = useContext(CurrentUserContext)

    const { data : comments, refetch : refreshComments, isLoading} = useQuery({
        queryFn : () => getCommentsOfUser(currentUser?.id),
        queryKey : ["comments"],
        refetchInterval : 500,
        retryDelay : 200
    })


    return (
        <div className="commentsTab">
            <p>Comments {comments?.length}</p>

            { isLoading ? "Loading..." : ""}

            {comments?.map( comment => (
                <CommentShortcutTab key={comment.id} comment={comment}/>
            )) }


        </div>
    )
}