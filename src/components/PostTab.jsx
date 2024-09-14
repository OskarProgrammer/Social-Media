
// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getCommentsFromPost } from "../api_functions/functions"
import { NavLink } from "react-router-dom"



export const PostTab = ( { postInfo } ) => {

    let [loading, setLoading] = useState(true)
    let [comments, setComments] = useState()

    const getComments = async () => {
        comments = await getCommentsFromPost(
            postInfo.id
        )
        
        setComments(comments)
        setLoading(false)
    }

    useEffect(()=>{
        getComments()
    })
    

    return (
        <>
            {loading ? <p>Loading...</p>
                     : 
                     <div className="postTab">

                        <p>{postInfo.title}</p>
                        
                        <NavLink to={`/post/${postInfo.id}`} className="flex flex-row gap-5 justify-center">
                            <p>
                                <i className="bi bi-hand-thumbs-up-fill"/> {postInfo.likes.length}
                            </p>
                            <p>
                                <i className="bi bi-chat-fill"/> {comments.length}
                            </p>
                        </NavLink >

                    </div>
            }
        </>
    )
}