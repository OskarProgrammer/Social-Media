
// importing api functions
import axios from "axios"

// importing components
import { PageTitle } from "../components/PageTitle"
import { useRef, useState } from "react"


import { redirectToPage, createPost, sendMessage} from "../utils/utils"
import { useCurrentUser } from "../custom_hooks/custom"
import { useMutation, useQueryClient } from "react-query"


export const NewPostPage = () => {

    const [error, setError] = useState(null)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const imgRef = useRef(null)

    const {data : currentUser} = useCurrentUser()
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn : createPost,
        onSuccess : () => {
            queryClient.invalidateQueries(["posts"])
        }
    })


    const createPostAction = async () => {
    
        const title = titleRef.current.value
        const desc = descRef.current.value
        const img = imgRef.current.value
    
        // validating data
        if (!title.length || !desc.length || !img.length) { setError("All fields must be provided"); return }
    
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
    
        createPostMutation.mutate(newPostObject)
    
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
        } catch { setError("Something went wrong during creating notification"); return }
    

    
        redirectToPage("/account")
    }

    return (
        <form className="form" method="POST" onSubmit={(e)=>{
            e.preventDefault()
            createPostAction()
        }}>
            <PageTitle title="Create new post" />

            <h2 className="titleOfForm">Create your new post</h2>
            
            <input ref={titleRef} type="text" className="inputField" placeholder="Title"  name="title"/>
            <hr className="line" />

            <input ref={descRef} type="text" className="inputField" placeholder="Description" name="desc"/>
            <hr className="line" />

            <input ref={imgRef} type="text" className="inputField" placeholder="Image" name="img"/>
            <hr className="line" />

            {  
              error && 
              <p className="errorMessage"> {error} </p>
            }

            <button className="btn-green mx-auto">Create</button>

        </form>
    )
}