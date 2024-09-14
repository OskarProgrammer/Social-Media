
// importing functions and components from react library
import { useState } from "react"

export const PostTab = ( { postInfo } ) => {

    let [loading, setLoading] = useState(true)

    return (
        <>
            {loading ? <p>Loading...</p>
                     : 
                     <div className="postTab">

                        <p>{postInfo.title}</p>
                        
                        <div className="flex flex-row gap-5 justify-center">
                            <p>
                                <i className="bi bi-hand-thumbs-up-fill"/> {postInfo.likes.length}
                            </p>
                            <p>
                                <i className="bi bi-chat-fill"/> 
                            </p>
                        </div>

                    </div>
            }
        </>
    )
}