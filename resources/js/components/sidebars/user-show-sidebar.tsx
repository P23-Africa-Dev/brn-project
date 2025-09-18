'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';
import React from 'react';
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

const UserProfileSidebar: React.FC<UserProfileSidebarProps & { userId: number }> = ({
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
}) => {
    // Use Inertia page props for connection status, which must be provided by the parent page (from database)
    const {
        connected,
        pending,
        conversations = [],
        auth,
    } = usePage().props as {
        connected?: { id: number }[];
        pending?: { id: number }[];
        conversations?: { id?: string; encrypted_id?: string; participants?: { id: number }[] }[];
        auth?: { user?: { id: number } };
    };
    // Connection status logic (currently not displayed in UI but calculated for future use)
    // let connectionStatus: 'none' | 'pending' | 'accepted' = 'none';
    // if (!connected || !pending) {
    //     // If not present, warn developer to provide these props from the parent page (e.g., dashboard or user profile page)
    //     console.warn('Sidebar: connected/pending props missing. Ensure parent page provides them from database.');
    // } else if (connected.some((u) => u.id === userId)) {
    //     connectionStatus = 'accepted';
    // } else if (pending.some((u) => u.id === userId)) {
    //     connectionStatus = 'pending';
    // }
    // const [loading, setLoading] = useState(false);

    // Find existing conversation with this user (if any) - currently not used in UI
    // let conversationLink: string | null = null;
    // if (Array.isArray(conversations) && auth?.user?.id) {
    //     const found = conversations.find((c) => {
    //         // Direct message: only 2 participants, and the other is userId
    //         if (c.participants && c.participants.length === 2 && auth.user) {
    //             return c.participants.some((p) => p.id === userId) && c.participants.some((p) => p.id === auth.user.id);
    //         }
    //         return false;
    //     });
    //     if (found && found.id) {
    //         conversationLink = `/messages/${found.id}`;
    //     } else if (found && found.encrypted_id) {
    //         conversationLink = `/messages/${found.encrypted_id}`;
    //     }
    // }

    // Handler to start a new conversation if none exists (currently not used in UI)
    // const handleStartConversation = () => {
    //     if (conversationLink) {
    //         router.visit(conversationLink);
    //     } else {
    //         // POST to a route to create a new conversation, then redirect
    //         setLoading(true);
    //         router.post(
    //             '/messages/start',
    //             { user_id: userId },
    //             {
    //                 preserveScroll: true,
    //                 onFinish: () => setLoading(false),
    //                 onSuccess: () => {
    //                     // Expect backend to redirect to the new conversation
    //                 },
    //             },
    //         );
    //     }
    // };

    // const handleConnect = () => {
    //     setLoading(true);
    //     router.post(
    //         '/connections/send',
    //         { connected_user_id: userId },
    //         {
    //             preserveScroll: true,
    //             onFinish: () => setLoading(false),
    //             onSuccess: () => router.reload({ only: ['connected', 'pending'] }),
    //         },
    //     );
    // };

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
            <SheetContent
                side="right"
                className="rounded-tl-4xl rounded-tr-4xl rounded-br-4xl rounded-bl-4xl border-none bg-white p-0 outline-0 sm:max-w-md lg:max-w-[400px]"
            >
                <div className="no-scrollbar flex h-full flex-col overflow-y-auto rounded-3xl shadow-lg">
                    {/* Profile Header Section */}
                    <div
                        className="relative m-2 flex h-[460px] flex-col items-center justify-end rounded-3xl bg-cover bg-top text-white"
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${imageSrc})`,
                        }}
                    >
                        <div className="absolute bottom-15 rounded-xl bg-darkBlue px-3 py-4 pl-5 text-right opacity-60">
                            <h1 className="text-2xl leading-3.5 font-bold">{name}</h1>
                            <p className="mt-1 text-sm font-medium">{title}</p>
                        </div>
                    </div>
                    {/* Content Section */}
                    <div className="w-full px-4 pt-1 pb-2">
                        {/* Details Grid */}
                        <div className="flex h-full w-full flex-col rounded-tl-[67px] rounded-br-2xl rounded-bl-2xl bg-darkBlue px-5 py-3 pt-5 pl-7">
                            <div className="flex w-full pl-5">
                                <div className="grid grid-cols-3 gap-1">
                                    <div className="grid w-[200px] grid-cols-2 gap-4 pb-6">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-secondaryWhite">Experience</p>
                                            <p className="text-xs font-extralight text-secondaryWhite">{experience}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-secondaryWhite">Industry</p>
                                            <p className="text-xs font-extralight text-secondaryWhite">{industry}</p>
                                        </div>
                                        <div className="col-span-2 flex flex-col">
                                            <p className="text-sm font-semibold text-secondaryWhite">Interest</p>
                                            <p className="text-xs font-extralight text-secondaryWhite">{interest}</p>
                                        </div>
                                    </div>

                                    <div className="col-start-1 col-end-3 flex items-center space-x-2 pb-8">
                                        <p className="text-[16px] font-bold text-secondaryWhite">{reviews}</p>
                                        <Star className="h-6 w-6 fill-[#27E6A7] text-[#27E6A7]" />
                                        {/* <p className="text-sm font-medium text-gray-500">Reviews</p> */}
                                    </div>
                                </div>
                                <div className="flex items-start justify-between">
                                    <div className="flex w-full flex-col gap-2">
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
                                            <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                                <img src={images.userList} className="h-6 w-6" alt="" />
                                            </button>
                                        </UserDetailedSidebar>

                                        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                            <img src={images.messageO} className="h-6 w-6" alt="" />
                                        </button>
                                        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D7F6EC] p-1 hover:text-gray-600">
                                            <img src={images.videoCamera} className="h-6 w-6" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons - Currently commented out as handlers are not implemented */}
                            {/* <div className=" flex space-x-3">
                                {userId !== authUserId &&
                                    (connectionStatus === 'accepted' ? (
                                        <button
                                            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-2 py-1 whitespace-nowrap text-secondaryWhite"
                                            onClick={handleStartConversation}
                                            disabled={loading}
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
                                <button className="flex gap-2  items-center rounded-full bg-transparent px-3 py-2 whitespace-nowrap text-secondaryWhite">
                                    <img src={images.bookmark} className="h-6 w-6" alt="" />
                                    <span className='text-[14px]'>Save for later</span>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserProfileSidebar;
