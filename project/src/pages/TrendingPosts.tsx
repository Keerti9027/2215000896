import React from 'react';
import { useSocialData } from '../context/SocialDataContext';
import PostCard from '../components/PostCard';
import { TrendingUp } from 'lucide-react';

const TrendingPosts: React.FC = () => {
  const { trendingPosts } = useSocialData();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp size={24} className="mr-2 text-pink-500" />
          Trending Posts
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Posts with highest engagement
        </div>
      </div>

      {trendingPosts.length > 0 ? (
        <div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Currently trending posts have <span className="font-bold text-pink-600 dark:text-pink-400">
                {trendingPosts[0].commentCount || 0} comments
              </span> each
            </p>
          </div>

          <div className="space-y-6">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} isTrending={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No trending posts available</p>
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;