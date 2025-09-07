// src/components/LeadCard.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react'; // Example icon for rating

// Define the type for the card data
interface LeadCardProps {
  name: string;
  location: string;
  title: string;
  industry: string;
  rating: number;
  avatarSrc: string;
}

const LeadCard: React.FC<LeadCardProps> = ({ name, location, title, industry, rating, avatarSrc }) => {
  return (
    <div className="
      relative 
      w-full 
      p-6 
      bg-white 
      rounded-[3rem] 
      border-2 
      border-gray-200 
      shadow-sm 
      flex 
      items-center 
      space-x-6 
      mb-6
    ">
      {/* Absolute positioning for the half-circles on the sides */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-white rounded-r-full -ml-4 border-2 border-l-0 border-gray-200"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-white rounded-l-full -mr-4 border-2 border-r-0 border-gray-200"></div>

      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <Avatar className="h-28 w-28 rounded-2xl">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div className="text-2xl font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{location}</div>
          <div className="flex space-x-4 mt-2">
            <div>
              <div className="text-xs font-semibold uppercase text-gray-400">Title</div>
              <div className="text-base text-gray-700">{title}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-gray-400">Industry</div>
              <div className="text-base text-gray-700">{industry}</div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center space-x-1">
          <div className="text-xl font-bold text-gray-700">{rating}</div>
          <Star className="w-5 h-5 text-green-500" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;