import { useQuery } from "react-query"
import { NavLink } from "react-router-dom"
import { getCommentsFromPost } from "../api_functions/functions"

export const PostTab = ( {post} ) => {

    const { data : comments, refetch : refreshComments, isLoading} = useQuery({
        queryFn : () => getCommentsFromPost(post.id),
        queryKey : ["comments", post.id],
    })

    if (isLoading) { return <div>Loading...</div>}

    return (
        <NavLink to={`/post/${post.id}`} className="flex flex-col gap-2 w-full text-[20px] p-3 border-2 border-slate-950 shadow-2xl rounded-lg">
            <p className="text-xl">{post.title}</p>
            <div className="flex flex-row gap-6 justify-center">
                <div className="flex flex-col gap-2">
                    <i className="bi bi-hand-thumbs-up-fill text-[50px]"/>
                    {post.likes.length}
                </div>
                <div className="flex flex-col gap-2">
                    <i className="bi bi-chat-fill text-[50px]"/>
                    {comments?.length}
                </div>
            </div>
        </NavLink>
    )
}