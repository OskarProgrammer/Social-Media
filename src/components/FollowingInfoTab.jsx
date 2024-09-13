
export const FollowingInfoTab = (props) => {

    // getting currentUser from props
    const currentUser = props.currentUser

    return (
        <div className="card col-span-full lg:sm:col-span-3 lg:sm:row-span-3 lg:sm:col-start-1 lg:sm:row-start-8">
            <div className="content lg:sm:text-4xl text-3xl">
                <p>Following : {currentUser.following.length}</p>
            </div>
        </div>
    )
}