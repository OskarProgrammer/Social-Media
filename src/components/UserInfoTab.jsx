import { useContext } from "react"
import { CurrentUserContext } from "../pages/AccountMainPage"

export const UserInfoTab = () => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="userInfoTab">
            <p>User info</p>
            <p>Username : {currentUser?.login}</p>
            <p>Password : {currentUser?.password}</p>
            <p>ID : {currentUser?.id}</p>
        </div>
    )
}