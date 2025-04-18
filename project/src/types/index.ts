export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  commentCount?: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  createdAt: string;
  comments?: Comment[];
  commentCount?: number;
  image?: string;
}