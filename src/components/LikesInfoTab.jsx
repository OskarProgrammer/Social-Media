
// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getLikesOfUser } from "../api_functions/functions"

// importing components
import { LikeTab } from "./LikeTab"



const useLikes = ( userID ) => {
    let [likes, setLikes] = useState()

    useEffect(()=>{
        const getLikes = async () => {
            likes = await getLikesOfUser( userID )
            setLikes(likes)
        }

        return () => { getLikes() }
    },[])
    
    return likes
} 


export const LikesInfoTab = ( {currentUser} ) => {

    const likes = useLikes(currentUser.id)

    return (
        <div className="card col-span-full lg:sm:col-span-2 lg:sm:row-span-3 lg:sm:col-start-1 lg:sm:row-start-5">
            <div className="content lg:sm:text-4xl text-3xl">
                <p>Likes</p>
                
                <div className="listOfLikes mt-3">
                    {likes?.map((like)=>(
                        <LikeTab likeInfo={like}/>
                    ))}
                </div>

            </div>
        </div>
    )
}