
// importing components
import { AccountInfoTab } from "../components/AccountInfoTab"
import { CommentsInfoTab } from "../components/CommentsInfoTab"
import { LikesInfoTab } from "../components/LikesInfoTab"
import { PostsInfoTab } from "../components/PostsInfoTab"
import { UserInfoTab } from "../components/UserInfoTab"


export const AccountMainPage = () => {

    return (
        <div className="accountLayout">

            <AccountInfoTab />

            <UserInfoTab />

            <PostsInfoTab />

            <LikesInfoTab />

            <CommentsInfoTab />
            
        </div>
    )
}