import axios from "axios"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"


const useAuthor = ( authorID ) => {
    let [author, setAuthor] = useState()

    useEffect(()=>{
        const fetchAuthor = async () => {
            author = await axios.get(`http://localhost:3000/users/${authorID}`).then((res) => { return res.data } )
            setAuthor(author)
        }

        return () => { fetchAuthor() }
    }, [])

    return author
}

export const LikeTab = ( { likeInfo } ) => {

    const author = useAuthor(likeInfo.ownerID)

    return(
        <NavLink to={`/post/${likeInfo.id}`} className="likeCard" >                
            <p>
                <p>{likeInfo.title} : {author?.login}</p>
                <p className="text-sm">Created at : {new Date(likeInfo.createdAt).toLocaleDateString()}</p>
            </p>
        </NavLink>
    )
}