
// clsx
import {clsx , ClassValue} from "clsx"

// tailwind
import { twMerge } from "tailwind-merge"

// dates
import { getHoursDiff, getMinutesDiff, getSecondsDiff } from "../date_functions/date_functions"

// types
import { Comment, LikeVariables, NewCommentVariables, Post, RemoveNotifyVariables, User } from "../types/types"

// api
import axios from "axios"


export const cn = (...inputs : ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const diff = ( postData : Post | Comment) =>{
    // creating format
    const responseFormat = ( text : string) =>{
        return "Posted " + text + " ago"
    }

    // creating current date
    const currentDate = new Date()

    const minutesDiff = getMinutesDiff(currentDate, new Date(postData?.createdAt))
    const secondsDiff = getSecondsDiff(currentDate, new Date(postData?.createdAt))
    const hoursDiff = getHoursDiff(currentDate, new Date(postData?.createdAt))
    
    if ( secondsDiff > 60 ){
        if ( minutesDiff > 60) {
            return responseFormat(`${hoursDiff} hours`)
        }else{
            return responseFormat(`${minutesDiff} minutes`)
        }
    } else {
        return responseFormat(`${secondsDiff} seconds`)
    }
}

export const createComment = async ( { comment, currentUser, postInfo} : NewCommentVariables) => {

    if (comment.length == 0) { return }

    // creating newComment object
    const newComment = {
        id : crypto.randomUUID(),
        ownerID: currentUser.id,
        postID: postInfo.id,
        comment: comment,
        createdAt : new Date()
    }

    try {
        await axios.post(`http://localhost:3000/comments/`, newComment)
    } catch { throw new Error("Error during creating new comment") }

}

export const like = async ( variables : LikeVariables) => {
    if ( variables.postInfo.likes.includes(variables.user.id) ) {
        variables.postInfo.likes = variables.postInfo.likes.filter( e => e != variables.user.id)
    } else {
        variables.postInfo.likes.push(variables.user.id)
    }
    
    try {
        await axios.put(`http://localhost:3000/posts/${variables.postInfo.id}`, variables.postInfo)
    } catch { throw new Error("Something went wrong")}

}

export const redirectToPage = ( path : string) => {
    window.location.href = path 
}

export const createPost = async ( newPost : Post) => {
    await axios.post("http://localhost:3000/posts/", newPost)
}

export const sendMessage = async (newMessageID : string, followerID : string) => {
    // getting user
    let user = await axios.get(`http://localhost:3000/users/${followerID}`).then(res => res.data)

    user.messages.push(newMessageID)

    try {
        await axios.put(`http://localhost:3000/users/${followerID}`, user)
    } catch { throw new Error("Error during sending message") }
}

export const removeNotify = async ( {user} : RemoveNotifyVariables) => {
    await axios.put(`http://localhost:3000/users/${user.id}`, user)
}