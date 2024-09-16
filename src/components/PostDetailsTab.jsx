
// importinmg functions and components from react library
import { useEffect, useState } from "react"

// importing api functions 
import axios from "axios"
import { getCommentsFromPost, getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { CommentTab } from "./CommentTab"

// importing date functions
import { getHoursDiff, getSecondsDiff, getMinutesDiff } from "../date_functions/date_functions"


const useData = ( postID ) => {

    let [postInfo, setPostInfo] = useState()
    let [authorInfo, setAuthorInfo] = useState()
    let [currentUser, setCurrentUser] = useState()
    let [comments, setComments] = useState()


    useEffect(()=>{
        const fetchData = async () => {
            // getting postInfo
            postInfo = await axios.get(`http://localhost:3000/posts/${postID}`).then( (res) => {return res.data} )
            setPostInfo(postInfo)
    
            // getting author info
            authorInfo = await axios.get(`http://localhost:3000/users/${postInfo.ownerID}`).then((res)=>{return res.data})
            setAuthorInfo(authorInfo)
    
            // getting currentUser
            currentUser = await getCurrentUserInfo().catch( () => { return undefined } )
            setCurrentUser(currentUser)
    
            // getting comments 
            comments = await getCommentsFromPost(postID).catch(()=>{ return undefined })
            setComments(comments)
            
        }

        return () => { fetchData() }
    },[])

    return [postInfo,
        authorInfo,
        currentUser,
        comments]
}


export const PostDetailsTab =  ({ postID }) => {

    let [isExpanded , setIsExpanded] = useState(false)
    let [comment, setComment] = useState("")

    let [postInfoLoader, authorInfo, currentUser, commentsLoader] = useData( postID )
    let [postInfo, setPostInfo] = useState(postInfoLoader)
    let [commentsInfo, setCommentsInfo] = useState(commentsLoader)

    let [currentDate, setCurrentDate] = useState(new Date())


    // useEffect 
    useEffect(()=>{
        const interval = setInterval( async () => {

            postInfo  = await axios.get(`http://localhost:3000/posts/${postInfoLoader.id}`).then((res)=>{ return res.data })
            setPostInfo(postInfo)

            // getting comments 
            commentsInfo = await getCommentsFromPost(postID).catch(()=>{ return undefined })
            setCommentsInfo(commentsInfo)

        },100)


        return () => { clearInterval(interval) }
    })

    // useEffect to update current date
    useEffect(()=>{
        const interval = setInterval( async () => {

            currentDate = new Date()
            setCurrentDate(currentDate)

        }, 1000)

        return () => { clearInterval(interval) }
    })

    const like = async () => {
        if ( postInfo.likes.includes(currentUser.id) ) {
            postInfo.likes = postInfo.likes.filter( e => e != currentUser.id)
        } else {
            postInfo.likes.push(currentUser.id)
        }
        
        try {
            await axios.put(`http://localhost:3000/posts/${postInfo.id}`, postInfo)
        } catch { throw new Error("Something went wrong")}

    }

    const createComment = async () => {

        // creating newComment object
        const newComment = {
            id : crypto.randomUUID(),
            ownerID: currentUser.id,
            postID: postInfo.id,
            comment: comment
        }

        try {
            await axios.post(`http://localhost:3000/comments/`, newComment)
        } catch { throw new Error("Error during creating new comment") }

        setComment("")
    }

    const diff = () =>{
        // creating format
        const responseFormat = ( text ) =>{
            return "Sent " + text + " ago"
        }

        // creating current date
        const currentDate = new Date()

        // getting diff between current date and date of creating the postInfo
        const secondsDiff = getSecondsDiff(currentDate, new Date(postInfo?.createdAt))
        const minutesDiff = getMinutesDiff(currentDate, new Date(postInfo?.createdAt))
        const hoursDiff = getHoursDiff(currentDate, new Date(postInfo?.createdAt))
        
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

    return (
        <div className="postDetails">

                <div className="dateOfCreation">
                    {diff()}
                </div>

                <div className="image">
                    <p>s</p>
                </div>

                <div className="infoBar">

                    <div className="authorImage">
                        <i className="bi bi-person-circle"/>
                        <p>{authorInfo?.login}</p>
                    </div>

                    <div className="informations">
                        <p className="title text-2xl">{postInfo?.title}</p>
                        <div className="descTab text-lg">
                            {postInfo?.desc}
                        </div>
                    </div>

                </div>

                <div className="iconsBar">

                    <button className={`btn border-0 shadow-none ${postInfo?.likes.includes(currentUser?.id) ? "liked" : "disLiked"}`} onClick={()=>{ like() }}>
                        <i className="bi bi-hand-thumbs-up-fill"/>
                        <p className="text-gray-500">{postInfo?.likes.length}</p>
                    </button>

                    <button className={`btn border-0  shadow-none ${isExpanded ? "active" : "notActive"}`} onClick={()=>{setIsExpanded(!isExpanded)}}>
                        <i className="bi bi-chat-fill"/>
                        <p className="text-gray-500">Comments {commentsInfo?.length}</p>
                    </button>

                </div>

                {isExpanded 
                            ?   <div className="commentsSection">
                                    <p>Comment Section</p>
                                    <div className="grid grid-cols-4 grid-rows-1 gap-3 text-gray-950">

                                        <input  type="text" 
                                                className="commentInput" 
                                                placeholder={`You are commenting as ${currentUser?.login}`}
                                                onChange={(e)=>{setComment(e.target.value)}}/>

                                        <button className="commentInputBtn"
                                                onClick={()=>{ createComment() }}>Send</button>
                                    </div>
                                    {commentsInfo?.map((comment)=>(
                                        <CommentTab commentInfo={comment} />
                                    ))}
                                </div> 
                            : ""}

        </div>
    )
}