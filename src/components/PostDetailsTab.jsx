
// importinmg functions and components from react library
import { useState } from "react"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import { NavLink } from "react-router-dom"

// importing api functions 
import axios from "axios"
import { getCommentsFromPost, getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { CommentTab } from "./CommentTab"

// importing utils functions
import { cn, createComment, diff, like } from "../utils/utils"

// importing custom hooks
import { useAuthor, useComments, useCurrentUser, usePost } from "../custom_hooks/custom"


export const PostDetailsTab =  ({ postID }) => {

    let [isExpanded , setIsExpanded] = useState(false)
    let [comment, setComment] = useState("")
    const queryClient = useQueryClient()

    const { data : comments} = useComments({postID : postID})
    const { data : postInfoLoader, isLoading : postInfoLoaderLoading} = usePost({postID : postID})
    const { data : authorInfo} = useAuthor( { ownerID : postInfoLoader?.ownerID})
    const { data : currentUser} = useCurrentUser()

    const createCommentMutation = useMutation({
        mutationFn: createComment,
        onSuccess :  () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postID] })
        }
    })

    const likeMutation = useMutation({
        mutationFn : like,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["postInfo", postID]})
        }
    })

    if (postInfoLoaderLoading) { return <div className="postDetails"> <p className="m-5">Loading...</p> </div> }

    return (
        <div className="postDetails">

                <div className="dateOfCreation">
                    {diff(postInfoLoader)}
                </div>

                <div className="image">
                    <p>Image</p>
                </div>

                <div className="infoBar">

                    <NavLink to={`/user/${authorInfo?.id}`} className="authorImage">
                        <i className="bi bi-person-circle"/>
                        <p>{authorInfo?.login}</p>
                    </NavLink>

                    <div className="informations">
                        <p className="title text-2xl">{postInfoLoader?.title}</p>
                        <div className="descTab text-lg">
                            {postInfoLoader?.desc}
                        </div>
                    </div>

                </div>

                <div className="iconsBar">

                    {currentUser !== undefined ? 
                     <>
                        <button className={cn(`btn border-0 shadow-none`, {
                            "liked" : postInfoLoader?.likes.includes(currentUser.id),
                            "disLiked" : !postInfoLoader?.likes.includes(currentUser.id)
                        })} 
                        onClick={()=>{ likeMutation.mutate({postInfo : postInfoLoader, user : currentUser}) }}>
                            <i className="bi bi-hand-thumbs-up-fill"/>
                            <p className="text-gray-500">{postInfoLoader?.likes.length}</p>
                        </button>

                        <button className={`btn border-0  shadow-none ${isExpanded ? "active" : "notActive"}`} onClick={()=>{setIsExpanded(!isExpanded)}}>
                            <i className="bi bi-chat-fill"/>
                            <p className="text-gray-500">Comments {comments?.length}</p>
                        </button>
                     </> : <button className={`btn border-0  shadow-none ${isExpanded ? "active" : "notActive"}`} onClick={()=>{setIsExpanded(!isExpanded)}}>
                            <i className="bi bi-chat-fill"/>
                            <p className="text-gray-500">Comments {comments?.length}</p>
                        </button>}

                </div>

                {isExpanded 
                            ?   <div className="commentsSection">
                                    <p>Comment Section</p>
                                    <div className="grid grid-cols-4 grid-rows-1 gap-3 text-gray-950">

                                        {currentUser != undefined ? 
                                         <>
                                            <input  type="text" 
                                                className="commentInput" 
                                                placeholder={`You are commenting as ${currentUser?.login}`}
                                                onChange={(e)=>{setComment(e.target.value)}}/>

                                            <button className="commentInputBtn"
                                                    onClick={()=>{createCommentMutation.mutate({comment: comment, currentUser: currentUser, postInfo: postInfoLoader})}}>Send
                                            </button>
                                         </> : ""}

                                    </div>
                                    <div className="comments">
                                        {comments?.length == 0 ? <div className="text-[15px]"> No comments to display </div> : ""}
                                        {comments?.map((comment)=>(
                                            <CommentTab key={comment.id} commentInfo={comment} />
                                        ))}
                                    </div>
                                </div> 
                            : ""}

        </div>
    )
}