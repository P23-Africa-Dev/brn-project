import { MapPin, Star } from "lucide-react";

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
        <div className="flex items-center space-x-4 border-b-3  bg-white p-4">
            <div>
                <img src={imageSrc} alt={`${name}'s profile`} className="h-16 w-16 rounded-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-darkBlue">{name}</h3>
                        <div className="flex items-center gap-2 text-darkBlue">
                            <MapPin className="font-light w-4 h-4 text-darkBlue" />
                            <p className="text-sm font-light">{location}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="font-medium text-2xl text-gray-600">{rating}</span>
                        <Star className="h-7 w-7 text-darkGreen font-bold fill-darkGreen" />
                    </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                    <div>
                        <p className="text-darkGreen">Title</p>
                        <p className="font-bold text-darkBlue">{title}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Industry</p>
                        <p className="font-bold text-darkBlue ">{industry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;