
// importing functions and components from react library
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// importing api functions
import axios from "axios"
import { getPostsOfUser } from "../api_functions/functions"

// importing components
import { PostDetailsTab } from "../components/PostDetailsTab"
import { PageTitle } from "../components/PageTitle"



const usePosts = (userID) => {
    let [posts, setPosts] = useState()
    let [userInfo, setUserInfo] = useState()

    useEffect(()=>{
        const getData = async () => {
            posts = await getPostsOfUser(userID)
            setPosts(posts)

            userInfo = await axios.get(`http://localhost:3000/users/${userID}`).then((res) => { return res.data})
            setUserInfo(userInfo)
        }

        return () => {
            getData()
        }
    },[])

    return [posts, userInfo]
}

export const UserPostsPage = ( ) => {

    // getting userID
    const { userID } = useParams()
    const [posts, userInfo] = usePosts( userID )

    return (
        <div className="flex flex-col gap-12 w-full justify-center">

            <PageTitle title={`Posts of user ${userInfo?.login}`}/>

            {posts == undefined 
                    ? <p>Loading...</p> 
                    : posts.map((post)=> (
                                    <PostDetailsTab postID={post.id}/>

            ))}
        </div>
    )
}