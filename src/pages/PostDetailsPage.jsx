
// importing functions and components from react library
import { useLoaderData } from "react-router-dom"

// importing api functions
import axios from "axios"
import { getCurrentUserInfo } from "../api_functions/functions"
import { useEffect, useState } from "react"


export const PostDetailsPage = () => {

    // getting loader data
    const [currentUserLoader, postInfoLoader, authorInfoLoader] = useLoaderData()

    let [postInfo, setPostInfo] = useState(postInfoLoader)
    let [isExpanded, setIsExpanded] = useState(false)

    const like = async () => {
        if ( postInfo.likes.includes(currentUserLoader.id) ) {
            postInfo.likes = postInfo.likes.filter( e => e != currentUserLoader.id)
        } else {
            postInfo.likes.push(currentUserLoader.id)
        }
        
        try {
            await axios.put(`http://localhost:3000/posts/${postInfo.id}`, postInfo)
        } catch { throw new Error("Something went wrong")}

    }

    // useEffect 
    useEffect(()=>{
        const interval = setInterval( async () => {

            postInfo  = await axios.get(`http://localhost:3000/posts/${postInfo.id}`).then((res)=>{ return res.data })
            setPostInfo(postInfo)

        },100)


        return () => { clearInterval(interval) }
    })


    return(
        <>
            <div className="postDetails">

                <div className="image">
                    <p>s</p>
                </div>

                <div className="infoBar">

                    <div className="authorImage">
                        <i className="bi bi-person-circle"/> {/* author image place*/}
                        <p>{authorInfoLoader.login}</p> {/* author name place*/}
                    </div>

                    <div className="informations">
                        <p className="title text-2xl">{postInfoLoader.title}</p>
                        <div className="descTab text-lg">
                            {postInfoLoader.desc}
                        </div>
                    </div>

                </div>

                <div className="iconsBar">

                    <button className={`btn border-0 shadow-none ${postInfo.likes.includes(currentUserLoader.id) ? "liked" : "disLiked"}`} onClick={()=>{ like() }}>
                        <i className="bi bi-hand-thumbs-up-fill"/>
                        <p className="text-gray-500">{postInfo.likes.length}</p>
                    </button>

                    <button className={`btn border-0 shadow-none ${isExpanded ? "active" : "notActive"}`} onClick={()=>{setIsExpanded(!isExpanded)}}>
                        <i className="bi bi-chat-fill"/>
                        <p className="text-gray-500">Comments</p>
                    </button>

                </div>

                {isExpanded 
                            ?   <div className="commentsSection">
                                    <p>Comment Section</p>
                                </div> 
                            : ""}

            </div>
        </>
    )
}

export const postDetailsLoader = async ( {params} ) => {

    // getting postID
    const { postID } = params

    // getting postInfo
    const postInfo = await axios.get(`http://localhost:3000/posts/${postID}`).then( (res) => {return res.data} )

    // getting author info
    const authorInfo = await axios.get(`http://localhost:3000/users/${postInfo.ownerID}`).then((res)=>{return res.data})

    // getting currentUser
    const currentUser = await getCurrentUserInfo().catch( () => { return undefined})

    return [currentUser, postInfo, authorInfo]
}

