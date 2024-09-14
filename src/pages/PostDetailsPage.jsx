
// importing functions and components from react library
import { useParams } from "react-router-dom"

// importing components
import { PostDetailsTab } from "../components/PostDetailsTab"


export const PostDetailsPage = () => {

    // getting params
    const {postID} = useParams()

    return(
        <>
            <PostDetailsTab postID={postID}/>
        </>
    )
}

