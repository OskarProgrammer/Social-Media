
// importing functions and components from react library
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

// importing api functions
import { getPostsOfUser } from "../api_functions/functions"
import { PostTab } from "./PostTab"



export const PostsInfoTab = ( {currentUser}) => {

    let [posts, setPosts] = useState()
    let [loading, setLoading] = useState(true)

    const getPosts = async () => {

        posts = await getPostsOfUser(
            currentUser.id
        )
        
        setPosts(posts)
        setLoading(false)
    }

    useEffect(()=>{
        getPosts()
    }, [])

    return (
        <div className="card col-span-full lg:sm:col-span-3 lg:sm:row-span-3 lg:sm:col-start-3 lg:sm:row-start-2">
            <div className="content flex flex-col gap-5 lg:sm:text-4xl text-3xl">
                <p>Posts</p>

                <div className="postsList">
                    { loading 
                            ? <p>Loading...</p>
                            : posts.map( (post) => (
                                <PostTab postInfo={post}/>
                            ))
                    }
                </div>
                

            </div>


            <div className="flex gap-3">
                <NavLink to="/account/newPost" className="btn-green mx-auto" >
                    <i className="bi bi-plus"/>
                </NavLink>

                <NavLink to={`/posts/${currentUser.id}`} className="btn-green mx-auto" >
                    See your posts
                </NavLink>
            </div>
        
        </div>
    )
}