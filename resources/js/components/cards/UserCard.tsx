import images from '@/constants/image';
import { Star } from 'lucide-react';

interface UserCardProps {
    name: string;
    location: string;
    title: string;
    industry: string;
    rating: number;
    imageSrc: string;
}
const UserCard: React.FC<UserCardProps> = ({ name, location, title, industry, rating, imageSrc, }) => {
    return (
        <div className="relative flex items-start space-x-4 border-b border-b-gray/60  lg:last:border-b last:border-b-0 bg-transparent p-4 lg:items-center lg:border-b-3 lg:border-b-gray">
            
            <div className="relative rounded-l-3xl bg-transparent lg:h-[100px] lg:w-[100px] lg:rounded-l-xl lg:bg-[#FDF7E0]">
                <div
                    style={{
                        backgroundImage: `url(${imageSrc})`,
                    }}
                    className="aboslute left-0 h-[85px] w-[80px] max-w-full overflow-hidden rounded-l-xl bg-cover bg-top bg-no-repeat lg:h-full lg:w-[90%]"
                ></div>
            </div>
            <div className="flex-1 lg:-pr-6 xl:pr-12">
                <div className="flex  items-center justify-between">
                    <div>
                        <h3 className="mb-1 text-sm font-semibold text-white lg:mb-0 xl:text-lg lg:text-darkBlue/95">{name}</h3>
                        <div className="flex items-center gap-1 text-darkBlue">
                            <img src={images.desktopLocation} className="hidden h-4 w-4 lg:block" alt="" />
                            <img src={images.cardlocation} className="h-3 w-3 lg:hidden" alt="" />
                            <p className="text-[10px] font-extralight text-white md:text-xs lg:font-medium lg:text-darkBlue/70">{location}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 ">
                        <span className="text-base font-light text-white lg:text-xl lg:font-medium lg:text-gray-600">{rating}</span>
                        <Star className="h-5 w-5 fill-darkGreen font-bold text-darkGreen" />
                    </div>
                </div>
                <div className="mt-5 flex    justify-between text-sm">
                    <div className='flex flex-col flex-wrap lg:w-[120px] xl:w-[200px] '>
                        <p className="text-[11px] font-semibold text-darkGreen md:text-sm">Title</p>
                        <p className="text-[10px] font-semibold lg:font-bold text-white md:text-sm lg:text-darkBlue">{title}</p>
                    </div>
                    <div className='flex flex-col flex-wrap '>
                        <p className="text-[10px] font-semibold text-darkGreen md:text-sm">Industry</p>
                        <p className="text-[9px] font-semibold lg:font-bold text-white md:text-sm lg:text-darkBlue">{industry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
