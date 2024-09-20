
// importing functions and components from react library
import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"
import { useQuery } from "react-query"

// importing api fucntions
import { getPostsOfUser } from "../api_functions/functions"
import { NavLink } from "react-router-dom"
import { PostTab } from "./PostTab"

export const PostsTab = ( ) => {

    const currentUser = useContext(CurrentUserContext)

    const { data : posts, refetch : refreshPosts, isLoading} = useQuery({
        queryFn : () => getPostsOfUser(currentUser?.id),
        queryKey : ["posts", currentUser?.id],
        refetchInterval: 500
    })

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