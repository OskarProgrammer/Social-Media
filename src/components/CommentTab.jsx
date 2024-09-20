
// importing api functions
import axios from "axios"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing date functions
import { getSecondsDiff, getMinutesDiff, getHoursDiff } from "../date_functions/date_functions"
import { useQuery } from "react-query"
import { NavLink } from "react-router-dom"


export const CommentTab = ( { commentInfo } ) => {


    const diff = () =>{
        // creating format
        const responseFormat = ( text ) =>{
            return "Created " + text + " ago"
        }

        // creating current date
        const currentDate = new Date()

        // getting diff between current date and date of creating the postInfo
        const secondsDiff = getSecondsDiff(currentDate, new Date(commentInfo?.createdAt))
        const minutesDiff = getMinutesDiff(currentDate, new Date(commentInfo?.createdAt))
        const hoursDiff = getHoursDiff(currentDate, new Date(commentInfo?.createdAt))
        
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

    const { data : author, isLoading} = useQuery({
        queryFn : async () => await axios.get(`http://localhost:3000/users/${commentInfo.ownerID}`).then((res) => res.data),
        queryKey : ["author"],
        refetchInterval : 300
    })

    return (
        <div className="commentTab">

            <NavLink to={`/user/${author?.id}`} className="authorImage text-gray-950">

                <i className="bi bi-person-circle"/>
                <p>{author?.login}</p>
                <p>{diff()}</p>

            </NavLink>

            <div className="comment">

                {commentInfo.comment}
                
            </div>

        </div>
    )
}