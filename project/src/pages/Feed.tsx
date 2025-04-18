import React, { useEffect, useState } from 'react';
import { useSocialData } from '../context/SocialDataContext';
import PostCard from '../components/PostCard';

const Feed: React.FC = () => {
  const { posts } = useSocialData();
  const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);
  const [postsToShow, setPostsToShow] = useState(10);

  useEffect(() => {
    // Update displayed posts whenever the posts array changes
    setDisplayedPosts(posts.slice(0, postsToShow));
  }, [posts, postsToShow]);

  const loadMorePosts = () => {
    setPostsToShow(prev => prev + 10);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Live Feed
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Newest posts appear at the top
        </div>
      </div>

      {displayedPosts.length > 0 ? (
        <>
          <div className="space-y-6">
            {displayedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {postsToShow < posts.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMorePosts}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Load More Posts
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts available</p>
        </div>
      )}
    </div>
  );
};

export default Feed;