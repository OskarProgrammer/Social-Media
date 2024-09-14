
// importinmg functions and components from react library
import { useEffect, useState } from "react"

// importing api functions 
import axios from "axios"
import { getCommentsFromPost, getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { CommentTab } from "./CommentTab"


export const PostDetailsTab =  ({ postID }) => {

    let [isExpanded , setIsExpanded] = useState(false)
    let [postInfo, setPostInfo] = useState()
    let [authorInfo, setAuthorInfo] = useState()
    let [currentUser, setCurrentUser] = useState()
    let [comments, setComments] = useState()

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

    useEffect(()=>{
        fetchData()
    },[])

    // useEffect 
    useEffect(()=>{
        const interval = setInterval( async () => {

            postInfo  = await axios.get(`http://localhost:3000/posts/${postInfo.id}`).then((res)=>{ return res.data })
            setPostInfo(postInfo)

        },100)


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

    

    return (
        <div className="postDetails">

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

                    <button className={`btn border-0 shadow-none ${isExpanded ? "active" : "notActive"}`} onClick={()=>{setIsExpanded(!isExpanded)}}>
                        <i className="bi bi-chat-fill"/>
                        <p className="text-gray-500">Comments {comments?.length}</p>
                    </button>

                </div>

                {isExpanded 
                            ?   <div className="commentsSection">
                                    <p>Comment Section</p>
                                    {comments.map((comment)=>(
                                        <CommentTab commentInfo={comment} />
                                    ))}
                                </div> 
                            : ""}

        </div>
    )
}