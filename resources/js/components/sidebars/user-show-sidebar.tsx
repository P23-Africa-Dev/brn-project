'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { router, usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';
import React, { useState } from 'react';
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
    // Use Inertia page props for connection status, which must be provided by the parent page (from database)
    const { connected, pending } = usePage().props as { connected?: any[]; pending?: any[] };
    let connectionStatus: 'none' | 'pending' | 'accepted' = 'none';
    if (!connected || !pending) {
        // If not present, warn developer to provide these props from the parent page (e.g., dashboard or user profile page)
        console.warn('Sidebar: connected/pending props missing. Ensure parent page provides them from database.');
    } else if (connected.some((u) => u.id === userId)) {
        connectionStatus = 'accepted';
    } else if (pending.some((u) => u.id === userId)) {
        connectionStatus = 'pending';
    }
    const [loading, setLoading] = useState(false);

    const handleConnect = () => {
        setLoading(true);
        router.post(
            '/connections/send',
            { connected_user_id: userId },
            {
                preserveScroll: true,
                onFinish: () => setLoading(false),
                onSuccess: () => router.reload({ only: ['connected', 'pending'] }),
            },
        );
    };

    // Listen for changes in connected/pending to update UI after accept/decline
    React.useEffect(() => {
        // This effect will re-render the button as soon as connection status changes
    }, [connected, pending]);

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
                        className="relative flex h-[59%] flex-col items-center justify-end rounded-t-3xl bg-cover bg-top text-white"
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
                        <div className="flex h-full w-full flex-col rounded-tl-4xl rounded-br-4xl rounded-bl-4xl bg-darkBlue px-5 py-3 pl-4">
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
                                    <div className="-mt-5 flex w-full flex-col gap-2">
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
                                {/* <button className="flex items-center justify-center gap-2 rounded-xl bg-[#A47AF0] px-2 py-1 whitespace-nowrap text-secondaryWhite">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondaryWhite">
                                        <img src={images.connectLink} className="h-4 w-4" alt="" />
                                    </span>
                                    <span>Connect Now</span>
                                </button> */}
                                {userId !== authUserId &&
                                    (connectionStatus === 'accepted' ? (
                                        <button
                                            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-2 py-1 whitespace-nowrap text-secondaryWhite"
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondaryWhite">
                                                <img src={images.messageO} className="h-4 w-4" alt="" />
                                            </span>
                                            <span>Message</span>
                                        </button>
                                    ) : (
                                        <button
                                            className={`flex items-center justify-center gap-2 rounded-xl px-2 py-1 whitespace-nowrap text-secondaryWhite ${connectionStatus === 'pending' ? 'bg-gray-400' : 'bg-[#A47AF0]'}`}
                                            onClick={handleConnect}
                                            disabled={connectionStatus !== 'none' || loading}
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondaryWhite">
                                                <img src={images.connectLink} className="h-4 w-4" alt="" />
                                            </span>
                                            <span>{connectionStatus === 'pending' ? 'Pending' : loading ? 'Connecting...' : 'Connect Now'}</span>
                                        </button>
                                    ))}
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
