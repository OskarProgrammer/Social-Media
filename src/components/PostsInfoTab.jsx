import { NavLink } from "react-router-dom"



export const PostsInfoTab = () => {


    return (
        <div className="card col-span-full lg:sm:col-span-3 lg:sm:row-span-3 lg:sm:col-start-3 lg:sm:row-start-2">
            <div className="content lg:sm:text-4xl text-3xl">
                <p>Posts</p>
            </div>


            <div className="flex gap-3">
                <NavLink to="/account/userInfo" className="btn-green mx-auto" >
                    <i className="bi bi-plus"/>
                </NavLink>

                <NavLink to="/account/userInfo" className="btn-green mx-auto" >
                    See your posts
                </NavLink>
            </div>
        
        </div>
    )
}