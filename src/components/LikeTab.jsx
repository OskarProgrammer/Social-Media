import { NavLink } from "react-router-dom"

export const LikeTab = ({like}) => {

    return (
        <NavLink to={`/post/${like.id}`} key={like.id} className="likeTab">
            <p className="font-bold">{like.title}</p>
            <p>{like.desc}</p>
            <p>{new Date(like.createdAt).toLocaleDateString()}</p>
        </NavLink>
    )
}