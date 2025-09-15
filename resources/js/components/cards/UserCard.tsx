import images from '@/constants/image';
import { MapPin, Star } from 'lucide-react';

interface UserCardProps {
    name: string;
    location: string;
    title: string;
    industry: string;
    rating: number;
    imageSrc: string;
}
const UserCard: React.FC<UserCardProps> = ({ name, location, title, industry, rating, imageSrc }) => {
    return (
        <div className="relative flex items-center space-x-4 border-b lg:border-b-3 bg-transparent p-4">
          
            <div className="relative w-[60px] h-[60px] lg:h-[100px] lg:w-[100px] overflow-hidden rounded-l-3xl lg:rounded-l-xl bg-transparent lg:bg-[#FDF7E0]">
                {/* Placeholder for the image, replace with actual image source */}
                <img src={imageSrc} alt={`${name}'s profile`} className="absolute inset-0  mt-3 lg:rounded-l-xl h-full  w-full max-w-[90px]  object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="lg:text-lg text-sm font-bold text-white lg:text-darkBlue/95 lg:mb-0 mb-1.5">{name}</h3>
                        <div className="flex items-center gap-2 text-darkBlue">
                            {/* <MapPin className="h-4 w-4 font-light text-darkBlue" /> */}
                            <img src={images.cardlocation} className='h-4 w-4' alt="" />
                            <p className="lg:text-sm text-[10px] font-light lg:font-medium text-white lg:text-darkBlue/70">{location}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-500">
                        <span className="text-xl font-medium text-gray-600">{rating}</span>
                        <Star className="h-5 w-5 fill-darkGreen font-bold text-darkGreen" />
                    </div>
                </div>
                <div className="mt-5 flex justify-between text-sm">
                    <div>
                        <p className="text-darkGreen font-semibold">Title</p>
                        <p className=" text-darkBlue font-bold">{title}</p>
                    </div>
                    <div>
                        <p className="text-darkGreen font-semibold">Industry</p>
                        <p className="font-bold text-darkBlue">{industry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;



