
// importinmg functions and components from react library
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

// importing api functions 
import axios from "axios"
import { getCommentsFromPost, getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { CommentTab } from "./CommentTab"

// importing date functions
import { getHoursDiff, getSecondsDiff, getMinutesDiff } from "../date_functions/date_functions"
import { NavLink } from "react-router-dom"
import { cn } from "../utils/utils"


const useData = ( postID ) => {

    let [postInfo, setPostInfo] = useState()
    let [authorInfo, setAuthorInfo] = useState()


    useEffect(()=>{
        const timeout = setTimeout(async () => {

            // getting postInfo
            postInfo = await axios.get(`http://localhost:3000/posts/${postID}`).then( (res) => { return res.data } )
                                                                               .catch( () => { throw new Error("Error during postInfo fetch")} )
            setPostInfo(postInfo)
    
            // getting author info
            authorInfo = await axios.get(`http://localhost:3000/users/${postInfo.ownerID}`).then((res)=>{ return res.data })
                                                                                           .catch( () => { throw new Error("Error during authorInfo fetch")})
            setAuthorInfo(authorInfo)
            
        }, 100)

        return () => { clearTimeout(timeout) }
    },[])

    return [postInfo,
        authorInfo]
}


export const PostDetailsTab =  ({ postID }) => {

    let [isExpanded , setIsExpanded] = useState(false)
    let [comment, setComment] = useState("")
    let [ authorInfo] = useData( postID )

    const { data : comments, isLoading, refetch : refreshComments} = useQuery({
        queryFn: () => getCommentsFromPost(postID),
        queryKey: ["comments",postID],
        refetchOnWindowFocus: true,
    })

    const { data : currentUser, isLoading : currentUserLoading} = useQuery(
        {
            queryFn: () => getCurrentUserInfo(),
            queryKey: ["currentUserInfo"],
            refetchOnWindowFocus: true,
            refetchInterval: 500
        }
    )

    const { data : postInfoLoader, isLoading : postInfoLoaderLoading} = useQuery({
        queryFn : async () => await axios.get(`http://localhost:3000/posts/${postID}`).then( (res) => { return res.data } ),
        queryKey : ["postInfo", postID],
    })

    const createComment = async ( ) => {

        if (comment.length == 0) { return }
    
        // creating newComment object
        const newComment = {
            id : crypto.randomUUID(),
            ownerID: currentUser.id,
            postID: postInfoLoader.id,
            comment: comment,
            createdAt : new Date()
        }
    
        try {
            await axios.post(`http://localhost:3000/comments/`, newComment)
        } catch { throw new Error("Error during creating new comment") }
        
        refreshComments()
    }

    const like = async () => {
        if ( postInfoLoader.likes.includes(currentUser.id) ) {
            postInfoLoader.likes = postInfoLoader.likes.filter( e => e != currentUser.id)
        } else {
            postInfoLoader.likes.push(currentUser.id)
        }
        
        try {
            await axios.put(`http://localhost:3000/posts/${postInfoLoader.id}`, postInfoLoader)
        } catch { throw new Error("Something went wrong")}

    }

    const diff = () =>{
        // creating format
        const responseFormat = ( text ) =>{
            return "Posted " + text + " ago"
        }

        // creating current date
        const currentDate = new Date()

        // getting diff between current date and date of creating the postInfoLoader
        const secondsDiff = getSecondsDiff(currentDate, new Date(postInfoLoader?.createdAt))
        const minutesDiff = getMinutesDiff(currentDate, new Date(postInfoLoader?.createdAt))
        const hoursDiff = getHoursDiff(currentDate, new Date(postInfoLoader?.createdAt))
        
        if ( secondsDiff > 60 ){
            if ( minutesDiff > 60) {
                return responseFormat(`${hoursDiff} hours`)
            }else{
                return responseFormat(`${minutesDiff} minutes`)
            }
        } else {
            return responseFormat(`${secondsDiff} seconds`)
        }
    }

    if (postInfoLoaderLoading) { return <div className="postDetails"> <p className="m-5">Loading...</p> </div> }

    return (
        <div className="postDetails">

                <div className="dateOfCreation">
                    {diff()}
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
                        onClick={()=>{ like() }}>
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
                                                    onClick={()=>{createComment()}}>Send
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