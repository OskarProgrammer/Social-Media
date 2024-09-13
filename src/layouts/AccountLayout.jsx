import { AccountInfoTab } from "../components/AccountInfoTab"
import { UserInfoTab } from "../components/UserInfoTab"
import { PostsInfoTab } from "../components/PostsInfoTab"
import { LikesInfoTab } from "../components/LikesInfoTab"
import { CommentsInfoTab } from "../components/CommentsInfoTab"

export const AccountLayout = () => {


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