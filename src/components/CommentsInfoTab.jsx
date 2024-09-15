
// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getCommentsOfUser } from "../api_functions/functions"
import { NavLink } from "react-router-dom"


const useComments = ( userID ) => {
    let [comments,setComments] = useState()

    useEffect(()=> {
        const getData = async () => {

            comments = await getCommentsOfUser( userID )
            setComments(comments)

        }   

        return () => { getData() }
    }, [])

    return comments
}

export const CommentsInfoTab = ( { currentUser } ) => {

    let comments = useComments(currentUser.id)

    return (
        <div className="card col-span-full lg:sm:col-span-3 lg:sm:row-span-3 lg:sm:col-start-3 lg:sm:row-start-5">
            <div className="content lg:sm:text-4xl text-3xl">
                <p>Comments</p>

                <div className="commentsContainer">
                    {comments?.map((comment)=>(
                        <NavLink to={`/post/${comment.postID}`} className="commentCard">
                            <p>{comment.postID}</p>
                            <p>{comment.comment}</p>
                        </NavLink>
                    ))}
                </div>

            </div>
        </div>
    )
}