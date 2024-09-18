
// importing api functions
import { getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { PageTitle } from "../components/PageTitle"
import { FollowersTab } from "../components/FollowersTab"
import { FollowingsTab } from "../components/FollowingsTab"
import { PostsTab } from "../components/PostsTab"
import { CommentsTab } from "../components/CommentsTab"
import { LikesTab } from "../components/LikesTab"
import { UserInfoTab } from "../components/UserInfoTab"


// importing functions and components from react library
import { createContext } from "react"
import { useQuery } from "react-query"

export const CurrentUserContext = createContext(null)  

export const AccountMainPage = () => {

    const { data : currentUser, refetch : refreshCurrentUser} = useQuery({
        queryFn : () => getCurrentUserInfo(),
        queryKey : [ "currentUser" ],
        refetchInterval : 500
    })

    return (
        <div className="accountLayout">
            <PageTitle title="Account Page" />

            <div className="title">
                <p>Account {currentUser?.login}</p>
            </div>
            
            <CurrentUserContext.Provider value={currentUser}>
                <FollowersTab />
                <FollowingsTab />
                <PostsTab />
                <LikesTab />
                <CommentsTab/>
                <UserInfoTab/>
            </CurrentUserContext.Provider>

        </div>
    )
}