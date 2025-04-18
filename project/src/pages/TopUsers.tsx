import React from 'react';
import { useSocialData } from '../context/SocialDataContext';
import UserCard from '../components/UserCard';

const TopUsers: React.FC = () => {
  const { topUsers } = useSocialData();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Top Users
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Based on comment activity
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>

      {topUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No user data available</p>
        </div>
      )}
    </div>
  );
};

export default TopUsers;