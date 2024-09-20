// importing axios
import axios from "axios"

export const getCurrentUserInfo = async () => {

    let currentUser = {}
    // getting currentUser
    try{
        currentUser = await axios.get("http://localhost:3000/currentUser/").then((response)=>{return response.data})
                                                                             .catch((error)=>{return error})
    } catch { throw new Error("Error during getting current user")}

    if (currentUser.id == "") { return undefined }

    try {
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

    return result.reverse()
}

export const getCommentsOfUser = async ( userID ) => {

    if (userID == undefined ) { return }
    
    // getting all comments
    const comments = await axios.get("http://localhost:3000/comments/", {params : { _sort : "createdAt"}}).then((res)=>{ return res.data })

    // getting comments of user
    let result = comments.filter( e => e.ownerID == userID)

    return result
}

export const getLikesOfUser = async ( userID ) => {

    if (userID == undefined ) { return }
    
    // getting all posts
    const posts = await axios.get("http://localhost:3000/posts/").then((res)=>{ return res.data })

    // getting likes of user
    let result = posts.filter( e => e.likes.includes(userID))

    return result
}

export const getPosts = async ( filter = "" ) => {
    // getting all posts
    const posts = await axios.get("http://localhost:3000/posts/").then((res)=>{ return res.data })

    if (filter == "") { return posts}
    else{
        let result = posts.filter((e)=> e.ownerID == filter || e.title == filter) 
        return result
    }
}

export const getUserById = async ( userID ) => {
    if (userID == undefined) { return }

    // getting user
    const user = await axios.get(`http://localhost:3000/users/${userID}`).then( res => res.data)
                                                                         .catch(e => e)

    return user
}

export const getAmountOfMessages = async ( ) => {
    // getting currentUser
    const currentUser = await getCurrentUserInfo()
    
    return currentUser.messages.length
}

export const getMessages = async () => {
    // getting currentUser
    const currentUser = await getCurrentUserInfo()
    
    return currentUser.readMessages
}

export const getNotification = async ( notifyID ) => {
    // getting notification
    const notification = await axios.get(`http://localhost:3000/notifications/${notifyID}`).then((res) => res.data)

    return notification
}

export const getAuthorOfNotification = async ( notifyID ) => {
    // getting notification
    const notification = await axios.get(`http://localhost:3000/notifications/${notifyID}`).then((res) => res.data)

    // getting authorInfo
    const authorInfo = await axios.get(`http://localhost:3000/users/${notification.ownerID}`).then((res)=> res.data)

    return authorInfo
}
