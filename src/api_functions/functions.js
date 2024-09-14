// importing axios
import axios from "axios"

export const getCurrentUserInfo = async () => {

    let currentUser = {}
    // getting currentUser
    try{
        currentUser = await axios.get("http://localhost:3000/currentUser/").then((response)=>{return response.data})
                                                                             .catch((error)=>{return error})

        currentUser = await axios.get(`http://localhost:3000/users/${currentUser.id}`).then((response) => {return response.data})
                                                                                      .catch((error) => {return error})
    } catch { throw new Error("Error during getting current user")}

    return currentUser
}

export const getPostsOfUser = async ( personID) => {

    // getting all posts
    const posts = await axios.get("http://localhost:3000/posts/").then((res) => { return res.data })

    // getting user posts
    let result = posts.filter( e => e.ownerID == personID )

    return result 
}

export const getCommentsFromPost = async ( postID ) => {

    // getting all comments
    const comments = await axios.get("http://localhost:3000/comments/").then((res)=>{ return res.data })

    // getting comments from post
    let result = comments.filter( e => e.postID == postID)

    return result
}