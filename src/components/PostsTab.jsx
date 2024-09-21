
// importing functions and components from react library
import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"

// importing api fucntions
import { NavLink } from "react-router-dom"
import { PostTab } from "./PostTab"
import { usePosts } from "../custom_hooks/custom"

export const PostsTab = ( ) => {

    const currentUser = useContext(CurrentUserContext)

    const { data : posts, isLoading} = usePosts({userID : currentUser.id})

    if (isLoading) {
        return (<div className="postsTab">Loading posts...</div>)
    }

    return (
        <div className="postsTab">
            <p>Posts {posts?.length}</p>

            <NavLink to="/account/newPost" className="btn-green mx-auto">Create</NavLink>

            {posts?.map( post => (
                <PostTab key={post.id} post={post} />
            ))}

        </div>
    )
}