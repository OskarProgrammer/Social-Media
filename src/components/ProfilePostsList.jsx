
// importing functions and components
import { useContext } from "react"

// importing contexts
import { PostsContext } from "../pages/UserDetailsPage"

// importing components
import { Post } from "./Post"


export const ProfilePostsList = () => {

    const userPosts = useContext(PostsContext)

    return (
        <div className="postsContainer">

            <div className="postsTitle">
                Posts {userPosts?.length}
            </div>

            <hr/>
            
            <div className="profilePostsList">
                {userPosts?.map((post) => (
                    <Post postInfo={post}/>
                ))}
            </div>

        </div>
    )
}