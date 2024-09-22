
// importing functions and components from react library
import { useQuery } from "react-query"
import { useState } from "react"

// importing components
import { PageTitle } from "../components/PageTitle"
import { PostDetailsTab } from "../components/PostDetailsTab"

// importing api functions
import { getPosts } from "../api_functions/functions"

import ScrollAnimation from "react-animate-on-scroll"

export const MainPage = () => {

    const [filter, setFilter] = useState("")
    const [load, setLoad] = useState(false)

    const { data : posts, isLoading} = useQuery({
        queryFn: () => getPosts(filter),
        queryKey: ["posts", { load }]
    })

    if (isLoading) {
        return <div className="text-slate-950">Loading posts...</div>
    }


    return (
        <>
            <PageTitle title="Main" />
            <div className="text-gray-950 flex flex-col gap-10 w-full">

                <div className="flex flex-col lg:sm:w-5/12 w-10/12 mx-auto gap-4">

                    <input type="text" className="inputField" placeholder="Search a post"
                        onChange={(e) => {setFilter(e.target.value)}} value={filter}/>
                    <hr className="line"/>

                    <button className="btn-green my-auto mx-auto" onClick={()=>{ setLoad(!load) }}>Search</button>

                </div>

                
                {posts?.map((post)=>{
                    return (
                        <ScrollAnimation duration={1} 
                                         animatePreScroll={false} animateOnce={true} animateIn="zoomIn" 
                                         offset={300}>
                            <PostDetailsTab key={post.id} postID={post.id}/>
                        </ScrollAnimation>
                    )
                })}

                

            </div>
        </>
    )
}