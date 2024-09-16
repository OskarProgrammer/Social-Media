
// importing api functions
import axios from "axios"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing date functions
import { getSecondsDiff, getMinutesDiff, getHoursDiff } from "../date_functions/date_functions"


export const CommentTab = ( { commentInfo } ) => {

    let [author, setAuthor] = useState()

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

    const fetchData = async () => {
        author = await axios.get(`http://localhost:3000/users/${commentInfo.ownerID}`).then((res) => res.data)
        setAuthor(author)
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return (
        <div className="commentTab">
            <div className="authorImage text-gray-950">
                <i className="bi bi-person-circle"/>
                <p>{author?.login}</p>
                <p>{diff()}</p>
            </div>
            <div className="comment">
                {commentInfo.comment}
            </div>
        </div>
    )
}