
// importing functions and components from react library
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { createContext } from "react"

// importing api functions
import { getCurrentUserInfo, getPostsOfUser, getUserById } from "../api_functions/functions"

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

    // getting user ID
    const {userID} = useParams()

    // fetching data
    let {data : userInfo, refetch : refreshUserInfo} = useQuery({
        queryFn : () => getUserById(userID), 
        queryKey : [ "userInfo" ],
        refetchInterval : 100
    })

    const {data : currentUserInfo, refetch : refreshCurrentUserInfo} = useQuery({
        queryFn : () => getCurrentUserInfo(), 
        queryKey : [ "currentUserInfo" ],
        refetchInterval : 500
    })

    let {data : userPosts, refetch : refreshUserPosts} = useQuery({
        queryFn : () => getPostsOfUser(userID), 
        queryKey : [ "posts" ],
        refetchInterval : 500
    })

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