import { useContext } from "react"
import { UserContext } from "../pages/UserDetailsPage"

export const ProfileTitle = () => {
    const userInfo = useContext(UserContext)

    return (
        <div className="profileTitle">
            {userInfo?.login}
        </div>
    )
}