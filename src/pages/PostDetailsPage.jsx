
// importing functions and components from react library
import { useParams } from "react-router-dom"

// importing components
import { PostDetailsTab } from "../components/PostDetailsTab"
import { PageTitle } from "../components/PageTitle"



export const PostDetailsPage = () => {

    // getting params
    const {postID} = useParams()

    return(
        <>
            <PageTitle title={`Post ${postID}`}/>
            <PostDetailsTab postID={postID}/>
        </>
    )
}

