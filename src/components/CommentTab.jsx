
// importing 
import axios from "axios"
import { useEffect, useState } from "react"


export const CommentTab = ( { commentInfo } ) => {

    let [author, setAuthor] = useState()

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
            </div>
            <div className="comment">
                {commentInfo.comment}
            </div>
        </div>
    )
}