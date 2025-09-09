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
        <div className="relative flex items-center space-x-4 border-b-3 bg-transparent p-4">
          
            <div className="relative  h-[100px] w-[100px] overflow-hidden rounded-l-xl bg-[#FDF7E0]">
                {/* Placeholder for the image, replace with actual image source */}
                <img src={imageSrc} alt={`${name}'s profile`} className="absolute inset-0  h-full w-full max-w-[90px] rounded-l-xl object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-darkBlue">{name}</h3>
                        <div className="flex items-center gap-2 text-darkBlue">
                            <MapPin className="h-4 w-4 font-light text-darkBlue" />
                            <p className="text-sm font-medium text-darkBlue/70">{location}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="text-xl font-medium text-gray-600">{rating}</span>
                        <Star className="h-7 w-7 fill-darkGreen font-bold text-darkGreen" />
                    </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                    <div>
                        <p className="text-darkGreen">Title</p>
                        <p className="font-bold text-darkBlue">{title}</p>
                    </div>
                    <div>
                        <p className="text-darkGreen">Industry</p>
                        <p className="font-bold text-darkBlue">{industry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
