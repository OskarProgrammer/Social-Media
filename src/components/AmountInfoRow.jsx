import { useContext } from "react"
import { UserContext } from "../pages/UserDetailsPage"

export const AmountInfoRow = () => {

    const userInfo = useContext(UserContext)


    return (
        <div className="numbersTab">
            <div className="followersAmount">
                Followers : {userInfo?.followers?.length} 
            </div>
            <div className="followingAmount">
                Following : {userInfo?.following?.length}
            </div>
        </div>
    )
}