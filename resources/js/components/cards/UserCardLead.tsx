'use client';

// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import React from 'react';

interface UserCardProps {
    name: string;
    email: string;
    title: string;
    rating: number;
    iconSrc: string;
}

const UserCardLead: React.FC<UserCardProps> = ({ name, email, title, rating, iconSrc, }) => {
    return (
       <div className="flex items-center space-x-4 border-b-3  bg-white p-4">
            <div className='p-5 flex justify-center items-center  relative  rounded-full w-[100px] h-[100px] bg-[#FDF7E0]'>
                <img src={iconSrc} alt={`${name}'s profile`} className=" rounded-full object-center" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-[18px] mb-2 font-semibold text-darkBlue">{name}</h3>
                        <div className="flex flex-col leading-3 items-start gap-2 text-darkBlue">
                            <p className="text-[13px] font-light">{email}</p>
                            <p className="text-[13px] font-light">{title}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 pr-10 xl:pr-20 text-yellow-500">
                        <span className="font-medium text-xl text-gray-600">{rating}</span>
                        <Star className="h-5 w-5 text-darkGreen font-bold fill-darkGreen" />
                    </div>
                </div>
              
            </div>
        </div>
    );
};

export default UserCardLead;
