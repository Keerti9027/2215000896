import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, User as UserIcon } from 'lucide-react';
import { Post, Comment } from '../types';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  isTrending?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isTrending = false }) => {
  const [showComments, setShowComments] = useState(false);
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 ${
      isTrending ? 'border-2 border-pink-500 dark:border-pink-600' : ''
    }`}>
      {/* Post Header */}
      <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
        {post.user.profilePicture ? (
          <img 
            src={post.user.profilePicture}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon size={24} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white">{post.user.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(post.createdAt), 'MMM d, yyyy • h:mm a')}
          </p>
        </div>
        
        {isTrending && (
          <div className="bg-pink-100 dark:bg-pink-900 px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-pink-800 dark:text-pink-200">Trending</span>
          </div>
        )}
      </div>
      
      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
        
        {post.image && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        )}
      </div>
      
      {/* Post Footer */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MessageSquare size={18} className="mr-2" />
          <span>{post.commentCount || 0} Comments</span>
        </div>
        
        {(post.comments?.length || 0) > 0 && (
          <button 
            onClick={toggleComments}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            {showComments ? (
              <>
                <span>Hide Comments</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>Show Comments</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Comments Section */}
      {showComments && post.comments && post.comments.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-850 p-4 border-t border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Comments ({post.comments.length})
          </h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {post.comments.map((comment: Comment) => (
              <div 
                key={comment.id} 
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  {comment.user.profilePicture ? (
                    <img 
                      src={comment.user.profilePicture}
                      alt={comment.user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <UserIcon size={14} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {comment.user.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;