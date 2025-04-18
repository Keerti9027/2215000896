import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Post } from '../types';
import { getUsers, getPosts, getComments } from '../services/api';

interface SocialDataContextType {
  users: User[];
  posts: Post[];
  topUsers: User[];
  trendingPosts: Post[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const SocialDataContext = createContext<SocialDataContextType | undefined>(undefined);

export const useSocialData = () => {
  const context = useContext(SocialDataContext);
  if (context === undefined) {
    throw new Error('useSocialData must be used within a SocialDataProvider');
  }
  return context;
};

interface SocialDataProviderProps {
  children: ReactNode;
}

export const SocialDataProvider: React.FC<SocialDataProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Function to calculate comment counts and sort users and posts
  const processData = async (users: User[], posts: Post[]) => {
    try {
      // Create a map to track comment counts per user
      const userCommentMap = new Map<string, number>();
      
      // Process posts to get comments
      const processedPosts = await Promise.all(
        posts.map(async (post) => {
          // Fetch comments for each post
          const comments = await getComments(post.id);
          
          // Update post with comments and count
          const updatedPost = {
            ...post,
            comments,
            commentCount: comments.length
          };
          
          // Update user comment count
          const currentCount = userCommentMap.get(post.user.id) || 0;
          userCommentMap.set(post.user.id, currentCount + comments.length);
          
          return updatedPost;
        })
      );
      
      // Update users with comment counts
      const usersWithCommentCount = users.map((user) => ({
        ...user,
        commentCount: userCommentMap.get(user.id) || 0
      }));
      
      // Sort posts by creation date (newest first)
      const sortedPosts = [...processedPosts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Get top 5 users with most comments
      const sortedUsers = [...usersWithCommentCount].sort((a, b) => 
        (b.commentCount || 0) - (a.commentCount || 0)
      );
      
      // Get trending posts (posts with maximum comments)
      const maxComments = Math.max(...processedPosts.map(post => post.commentCount || 0));
      const trending = processedPosts.filter(post => post.commentCount === maxComments);
      
      setUsers(usersWithCommentCount);
      setPosts(sortedPosts);
      setTopUsers(sortedUsers.slice(0, 5));
      setTrendingPosts(trending);
    } catch (err) {
      setError('Error processing data');
      console.error('Error processing data:', err);
    }
  };
  
  // Function to fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedPosts] = await Promise.all([
        getUsers(),
        getPosts()
      ]);
      
      await processData(fetchedUsers, fetchedPosts);
    } catch (err) {
      setError('Error fetching data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to manually refresh data
  const refreshData = async () => {
    await fetchData();
  };
  
  return (
    <SocialDataContext.Provider
      value={{
        users,
        posts,
        topUsers,
        trendingPosts,
        loading,
        error,
        refreshData
      }}
    >
      {children}
    </SocialDataContext.Provider>
  );
};