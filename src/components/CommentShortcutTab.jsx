import { NavLink } from "react-router-dom"

export const CommentShortcutTab = ( {comment} ) => {
    return (
        <NavLink to={`/post/${comment.postID}`} key={comment.id} className="commentSectionTab">
            <p>{comment.postID}</p>
            <p> [{new Date(comment.createdAt).toLocaleDateString()}] {comment.comment}</p>
        </NavLink>
    )
}