import React from 'react';
import { MessageSquare, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-6 h-6 flex items-center justify-center bg-blue-500 text-white text-xs font-bold rounded-full -mt-2 -ml-2 z-10">
              {rank}
            </div>
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <UserIcon size={32} className="text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MessageSquare size={18} className="mr-2 text-blue-500" />
            <span className="font-medium">{user.commentCount || 0} Comments</span>
          </div>
          
          <div className="flex space-x-2">
            <div className={`w-2 h-16 rounded-full ${
              rank === 1 ? 'bg-blue-500' :
              rank === 2 ? 'bg-blue-400' :
              rank === 3 ? 'bg-blue-300' :
              rank === 4 ? 'bg-blue-200' :
              'bg-blue-100'
            }`}></div>
            <div className={`w-2 h-16 rounded-full ${
              rank === 1 ? 'h-16' :
              rank === 2 ? 'h-14' :
              rank === 3 ? 'h-12' :
              rank === 4 ? 'h-10' :
              'h-8'
            } bg-purple-400`} style={{
              height: `${100 - (rank - 1) * 15}%`
            }}></div>
            <div className={`w-2 h-16 rounded-full ${
              rank === 1 ? 'h-16' :
              rank === 2 ? 'h-13' :
              rank === 3 ? 'h-10' :
              rank === 4 ? 'h-8' :
              'h-6'
            } bg-pink-400`} style={{
              height: `${95 - (rank - 1) * 18}%`
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;