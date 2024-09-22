
// importing functions and components from react library
import { useContext } from "react"

// importing contexts
import { CurrentUserContext } from "../pages/AccountMainPage"

// importing components
import { CommentShortcutTab } from "./CommentShortcutTab"
import { useCommentsOfUser } from "../custom_hooks/custom"


export const CommentsTab = () => {

    const currentUser = useContext(CurrentUserContext)

    const { data : comments , isLoading} = useCommentsOfUser({userID : currentUser.id})

    if (isLoading) { return <div className="commentsTab">Loading your comments...</div>}


    return (
        <div className="commentsTab">
            <p>Comments {comments?.length}</p>

            { isLoading ? <p className="text-slate-950">Loading...</p>: ""}

            {comments?.map( comment => (
                <CommentShortcutTab key={comment.id} comment={comment}/>
            )) }


        </div>
    )
}