import { NavLink } from "react-router-dom"

export const UserInfoTab = (props) => {

    // getting props data
    const currentUser = props.currentUser


    return (
        <div className="card col-span-full lg:sm:col-span-2 lg:sm:row-span-3 lg:sm:col-start-1 lg:sm:row-start-2">
            
            <div className="content lg:sm:text-4xl text-3xl">
                <p>User info</p>

                <div className="flex flex-col gap-5 pt-5 text-3xl">
                    <p>Login : {currentUser.login}</p>
                    <p>Password : {currentUser.password}</p>
                    <p>Account ID : {currentUser.id}</p>
                </div>

            </div>

            <NavLink to="/account/userInfo" className="btn-green mx-auto" >See details</NavLink>

        </div>
    )
}