
export type Post = {
    id: string,
    title: string,
    desc: string,
    img: string,
    likes: string[],
    ownerID: string,
    createdAt: string
  }

export type User = {
  id: string,
  login: string,
  password: string,
  followers: string[],
  following: string[],
  messages: string[],
  readMessages: string[]
}

export type Comment = {
  id: string,
  ownerID: string,
  postID: string,
  comment: string,
  createdAt: string
}

export type NewCommentVariables = {
  comment : string,
  currentUser : User,
  postInfo : Post
}

export type LikeVariables = {
  postInfo : Post , 
  user : User
}

export type RemoveNotifyVariables = {
  user : User
}

