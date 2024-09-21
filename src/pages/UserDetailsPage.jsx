
// importing functions and components from react library
import { useParams } from "react-router-dom"
import { createContext } from "react"

// importing api functions
import { useAuthor, useCurrentUser, usePosts } from "../custom_hooks/custom"

// importing componnets
import { ProfileTitle } from "../components/ProfileTitle"
import { ProfileImage } from "../components/ProfileImage"
import { AmountInfoRow } from "../components/AmountInfoRow"
import { ButtonsRowProfile } from "../components/ButtonsRowProfile"
import { ProfilePostsList } from "../components/ProfilePostsList"


export const UserContext = createContext(null)
export const CurrentUserContext = createContext(null)
export const PostsContext = createContext(null)


export const UserDetailsPage = ( ) => {

    const {userID} = useParams()

    const {data : userInfo } = useAuthor({ ownerID : userID })

    const { data : currentUserInfo } = useCurrentUser()

    const { data : userPosts } = usePosts({ userID : userID })


    return (
        <div className="flex flex-col gap-4 text-gray-950 lg:sm:w-6/12 w-full text-center p-3">

            <ProfileImage />

            <CurrentUserContext.Provider value={currentUserInfo}>
                <UserContext.Provider value={userInfo}>
                    <ProfileTitle />
                    <AmountInfoRow />
                    <ButtonsRowProfile />
                </UserContext.Provider>
            </CurrentUserContext.Provider>

            <PostsContext.Provider value={userPosts}>
                <ProfilePostsList />
            </PostsContext.Provider>
        </div>
    )
}