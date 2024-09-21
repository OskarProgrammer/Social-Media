

// importing api functions
import { getCurrentUserInfo } from "../api_functions/functions"

// importing components
import { PageTitle } from "../components/PageTitle"

// custom hooks
import { useCurrentUser } from "../custom_hooks/custom"


export const UserInfoPage = () => {

    const { data : currentUser } = useCurrentUser()

    return (
        <div className="userTab">

            <PageTitle title="User info"/>

            <div className="title col-span-full my-auto mx-auto">
                User info
            </div>

            <div className="flex flex-col gap-5 col-span-full md:col-span-1 lg:row-span-2 p-4 shadow-lg">
                <p>Login : {currentUser.login}</p>
                <p>Password : {currentUser.password}</p>
            </div>

            <div className="flex flex-col gap-5 col-span-full md:col-span-1 lg:row-span-2 p-4 shadow-lg">
                <p>Followers : {currentUser.followers.length}</p>
                <p>Following : {currentUser.following.length}</p>
            </div>

        </div>
    )
}

export const userInfoLoader = async () => {

    let currentUser = await getCurrentUserInfo()

    return currentUser
}