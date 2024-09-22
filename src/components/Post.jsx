
import { NavLink } from "react-router-dom"
import { useComments } from "../custom_hooks/custom"


export const Post = ({postInfo}) => {
    
    const { data : comments } = useComments({postID : postInfo.id})

    return (
        <NavLink to={`/post/${postInfo.id}`} className="post">

            <p>{postInfo.title}</p>

            <div className="flex flex-row justify-evenly gap-3">

                <div className="left w-6/12 my-auto flex flex-col gap-2 text-3xl">
                    <i className="bi bi-hand-thumbs-up-fill"/>
                    <p className="text-lg">{postInfo.likes.length}</p>
                </div>

                <div className="right w-6/12 my-auto flex flex-col gap-2 text-3xl">
                    <i className="bi bi-chat-fill"/>
                    <p className="text-lg">{comments?.length}</p>
                </div>

            </div>

        </NavLink>
    )
}