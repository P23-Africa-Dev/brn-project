'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { Star } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import UserDetailedSidebar from './user-profile';

interface UserProfileSidebarProps {
    name: string;
    title: string;
    imageSrc: string;
    experience: string;
    industry: string;
    interest: string;
    reviews: string;
    baseLocation: string;
    operatesIn: string;
    bio: string;
    companyStage: string;
    keyStrength: string;
    topGoal: string;
    brnMemberSince: string;
    responseRate: string;
    successfulDealsRate: string;
    children: React.ReactNode;
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps & { userId: number; authUserId: number }> = ({
    name,
    title,
    imageSrc,
    experience,
    industry,
    interest,
    reviews,
    baseLocation,
    operatesIn,
    bio,
    companyStage,
    keyStrength,
    topGoal,
    brnMemberSince,
    responseRate,
    successfulDealsRate,
    children,
    userId,
    authUserId,
}) => {
    // Connection state: 'none', 'pending', 'accepted'
    const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'accepted'>('none');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        // Optionally, fetch connection status between authUserId and userId
        if (userId && authUserId && userId !== authUserId) {
            axios.get('/connections/list').then(res => {
                const { connected, pending } = res.data;
                if (connected.some((u: any) => u.id === userId)) {
                    setConnectionStatus('accepted');
                } else if (pending.some((u: any) => u.id === userId)) {
                    setConnectionStatus('pending');
                } else {
                    setConnectionStatus('none');
                }
            });
        }
    }, [userId, authUserId]);

    const handleConnect = async () => {
        setLoading(true);
        try {
            await axios.post('/connections/send', { connected_user_id: userId });
            setConnectionStatus('pending');
        } catch (e) {
            // Optionally show error
        }
        setLoading(false);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {/* UserCard component triggers this sidebar */}
                <div className="cursor-pointer">{children}</div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[380px] rounded-tl-4xl rounded-bl-4xl border-none bg-white p-0 outline-0 sm:w-[540px]">
                <div className="no-scrollbar flex h-full flex-col overflow-y-auto rounded-3xl shadow-lg">
                    {/* Profile Header Section */}
                    <div
                        className="relative flex h-[59%] flex-col items-center justify-end rounded-t-3xl bg-cover bg-center text-white"
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${imageSrc})`,
                        }}
                    >
                        <div className="p-6 text-center">
                            <h1 className="text-2xl font-bold">{name}</h1>
                            <p className="mt-1 text-sm">{title}</p>
                        </div>
                    </div>
                    {/* Content Section */}
                    <div className="h-[40%] w-full px-4 pt-4 pb-2">
                        {/* Details Grid */}
                        <div className="flex h-full w-full flex-col rounded-tl-4xl rounded-br-4xl rounded-bl-4xl bg-darkBlue py-3 px-5 pl-4">
                            <div className="flex flex-row pl-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold text-secondaryWhite">Experience</p>
                                            <p className="text-sm font-light text-secondaryWhite">{experience}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold text-secondaryWhite">Industry</p>
                                            <p className="text-sm font-light text-secondaryWhite">{industry}</p>
                                        </div>
                                        <div className="col-span-2 flex flex-col">
                                            <p className="text-base font-semibold text-secondaryWhite">Interest</p>
                                            <p className="text-sm font-light text-secondaryWhite">{interest}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <p className="text-xl font-bold text-secondaryWhite">{reviews}</p>
                                        <Star className="h-5 w-5 fill-[#27E6A7] text-[#27E6A7]" />
                                        {/* <p className="text-sm font-medium text-gray-500">Reviews</p> */}
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="-mt-5 flex flex-col gap-2 w-full">
                                        {/* The "Users" button now triggers the new UserDetailedSidebar */}
                                        <UserDetailedSidebar
                                            name={name}
                                            title={title}
                                            imageSrc={imageSrc}
                                            reviews={reviews}
                                            baseLocation={baseLocation}
                                            operatesIn={operatesIn}
                                            bio={bio}
                                            experience={experience}
                                            interest={interest}
                                            industry={industry}
                                            companyStage={companyStage}
                                            keyStrength={keyStrength}
                                            topGoal={topGoal}
                                            brnMemberSince={brnMemberSince}
                                            responseRate={responseRate}
                                            successfulDealsRate={successfulDealsRate}
                                        >
                                            {/* <Button variant="ghost" className="h-10 w-10 p-0 text-gray-400 hover:text-gray-600">
                                                <Users className="h-6 w-6" />
                                            </Button> */}
                                            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                                <img src={images.userList} className="h-6 w-6" alt="" />
                                            </button>
                                        </UserDetailedSidebar>

                                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                            <img src={images.messageO} className="h-6 w-6" alt="" />
                                        </button>
                                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                            <img src={images.videoCamera} className="h-6 w-6" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex space-x-3">
                                {userId !== authUserId && (
                                    <button
                                        className={`flex gap-2 rounded-xl px-2 py-1 justify-center items-center whitespace-nowrap text-secondaryWhite ${connectionStatus === 'pending' ? 'bg-gray-400' : 'bg-[#A47AF0]'}`}
                                        onClick={handleConnect}
                                        disabled={connectionStatus !== 'none' || loading}
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondaryWhite">
                                            <img src={images.connectLink} className="h-4 w-4" alt="" />
                                        </span>
                                        <span>
                                            {connectionStatus === 'pending' ? 'Pending' : connectionStatus === 'accepted' ? 'Connected' : loading ? 'Connecting...' : 'Connect Now'}
                                        </span>
                                    </button>
                                )}
                                <button className="flex gap-2 rounded-full bg-transparent px-3 py-2 whitespace-nowrap text-secondaryWhite">
                                    <img src={images.bookmark} className="h-6 w-6" alt="" />
                                    <span>Save for later</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserProfileSidebar;
