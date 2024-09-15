
// importing functions and components from react library
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// importing api functions
import { getPostsOfUser } from "../api_functions/functions"

// importing components
import { PostDetailsTab } from "../components/PostDetailsTab"



const usePosts = (userID) => {
    let [posts, setPosts] = useState()

    useEffect(()=>{
        const getData = async () => {
            posts = await getPostsOfUser(userID)
            setPosts(posts)
        }

        return () => {
            getData()
        }
    },[])

    return posts
}

export const UserPostsPage = ( ) => {

    // getting userID
    const { userID } = useParams()
    const posts = usePosts( userID )

    return (
        <div className="flex flex-col gap-12 w-full justify-center">
            {posts == undefined 
                    ? <p>Loading...</p> 
                    : posts.map((post)=> (
                                    <PostDetailsTab postID={post.id}/>

            ))}
        </div>
    )
}