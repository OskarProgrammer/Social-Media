
import { NavLink } from "react-router-dom"

// hooks
import { useAuthor } from "../custom_hooks/custom"

// utils
import { diff } from "../utils/utils"


export const CommentTab = ( { commentInfo } ) => {

    const { data : author, isLoading} = useAuthor({ownerID : commentInfo.ownerID})

    if (isLoading) { return <p>Loading...</p>}

    return (
        <div className="commentTab">

            <NavLink to={`/user/${author?.id}`} className="authorImage text-gray-950">

                <i className="bi bi-person-circle"/>
                <p>{author?.login}</p>
                <p>{diff(commentInfo)}</p>

            </NavLink>

            <div className="comment">

                {commentInfo.comment}
                
            </div>

        </div>
    )
}