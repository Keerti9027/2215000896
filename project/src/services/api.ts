import axios from 'axios';
import { User, Post, Comment } from '../types';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Get all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data.map((user: User) => ({
      ...user,
      profilePicture: getRandomUserImage(user.id)
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/posts');
    return response.data.map((post: Post) => ({
      ...post,
      image: getRandomPostImage(post.id)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get comments for a post
export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

// Helper function to get random user images
const getRandomUserImage = (userId: string): string => {
  const seed = userId.charCodeAt(0) + (userId.charCodeAt(1) || 0);
  const imageId = (seed % 10) + 1000;
  return `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`;
};

// Helper function to get random post images
const getRandomPostImage = (postId: string): string => {
  const seed = postId.charCodeAt(0) + (postId.charCodeAt(1) || 0);
  const imageId = (seed % 30) + 1020;
  return `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2`;
};