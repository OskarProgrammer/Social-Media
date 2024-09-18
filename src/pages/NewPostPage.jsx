
// importing api functions
import axios from "axios"
import { getCurrentUserInfo } from "../api_functions/functions"

// importing functions and components from react library
import { Form, redirect, useActionData } from "react-router-dom"

// importing components
import { PageTitle } from "../components/PageTitle"


export const NewPostPage = () => {

    // getting actionData 
    const actionData = useActionData()


    return (
        <Form className="form" method="POST" action="/account/newPost/">
            <PageTitle title="Create new post" />

            <h2 className="titleOfForm">Create your new post</h2>
            
            <input type="text" className="inputField" placeholder="Title"  name="title"/>
            <input type="text" className="inputField" placeholder="Description" name="desc"/>
            <input type="text" className="inputField" placeholder="Image" name="img"/>

            { actionData && 
              actionData.error && 
              <p className="errorMessage"> {actionData.error} </p>
            }

            <button className="btn-green mx-auto">Create</button>

        </Form>
    )
}

export const createPostAction = async ( { request } ) => {
    // getting data from request
    const formData = await request.formData()

    // getting currentUser
    const currentUser = await getCurrentUserInfo()

    // getting fields
    const title = formData.get("title")
    const desc = formData.get("desc")
    const img = formData.get("img")

    // validating data
    if (!title.length || !desc.length || !img.length) { return { error : "All fields must be provided" } }

    // creating newPostObject
    const newPostObject = {
        id : crypto.randomUUID(),
        title : title,
        desc : desc,
        img : img,
        likes : [],
        ownerID : currentUser.id,
        createdAt : new Date()
    } 

    // creating new post
    try {
        await axios.post("http://localhost:3000/posts/", newPostObject)
    } catch { return { error : "Something went wrong during creating post" } }

    // creatint newMessageObject
    const newMessageObject = {
        id: crypto.randomUUID(),
        ownerID: currentUser.id,
        message: "New post from ",
        postID: newPostObject.id,
        createdAt: newPostObject.createdAt
      }

    // sending messages
    currentUser.followers.map( async follower => {
        await sendMessage(newMessageObject.id, follower)
    })

    try {
        await axios.post(`http://localhost:3000/notifications/`, newMessageObject)
    } catch { return { error : "Something went wrong during creating notification" } }

    return redirect("/account/")
}

export const sendMessage = async (newMessageID, followerID) => {
    // getting user
    let user = await axios.get(`http://localhost:3000/users/${followerID}`).then(res => res.data)

    user.messages.push(newMessageID)

    try {
        await axios.put(`http://localhost:3000/users/${followerID}`, user)
    } catch { throw new Error("Error during sending message") }
}