'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { Star } from 'lucide-react';
import React from 'react';

interface UserDetailedSidebarProps {
    name: string;
    title: string;
    imageSrc: string;
    reviews: string;
    baseLocation: string;
    operatesIn: string;
    bio: string;
    experience: string;
    interest: string;
    industry: string;
    companyStage: string;
    keyStrength: string;
    topGoal: string;
    brnMemberSince: string;
    responseRate: string;
    successfulDealsRate: string;
    children: React.ReactNode;
}

const UserDetailedSidebar: React.FC<UserDetailedSidebarProps> = ({
    name,
    title,
    imageSrc,
    reviews,
    baseLocation,
    operatesIn,
    bio,
    experience,
    interest,
    industry,
    companyStage,
    keyStrength,
    topGoal,
    brnMemberSince,
    responseRate,
    successfulDealsRate,
    children,
}) => {
    return (
        <div >
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>

                <div id="sidebar-profile">
                    <SheetContent side="right" className="border-none bg-transparent sm:max-w-md lg:max-w-[800px]">
                        <div className="flex h-full w-full rounded-3xl bg-white p-4 shadow-lg">
                            {/* Left Column - User Profile */}
                            <div className="flex w-[40%] flex-col rounded-l-3xl bg-[#A7D5DD] p-6 shadow-2xl">
                                {/***************************** Top Area */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-[#325A64] via-[#325A64] to-[#AC7CEE] p-1">
                                        <div
                                            style={{
                                                backgroundImage: `url(${imageSrc})`,
                                            }}
                                            className="left-0 h-36 w-36 overflow-hidden rounded-full bg-cover bg-top bg-no-repeat"
                                        ></div>
                                    </div>

                                    {/* Headings */}
                                    <div className="mt-5 mb-4 space-y-0.5 text-darkBlue">
                                        <h1 className="text-2xl leading-3.5 font-extrabold">{name}</h1>
                                        <p className="text-[18px] font-normal">{title}</p>
                                    </div>

                                    {/* Descriptions */}

                                    <p className="mt-2 text-[13px] font-medium text-darkBlue">"{topGoal}"</p>

                                    <div className="mt-4 flex items-center space-x-1">
                                        <p className="text-xl font-bold text-darkBlue underline">{reviews}</p>
                                        <Star className="h-5 w-5 fill-[#978FED] text-[#978FED]" />
                                    </div>
                                </div>
                                {/***************************** Bottom Area */}
                                <div className="mt-10">
                                    <div className="w-full space-y-2 text-left">
                                        <h3 className="text-base font-bold text-darkBlue">
                                            Base Location
                                            <span className="block text-sm font-normal">{baseLocation}</span>
                                        </h3>
                                        <h3 className="text-base font-bold text-darkBlue">
                                            Operates In
                                            <span className="block text-sm font-normal">{operatesIn}</span>
                                        </h3>
                                    </div>
                                    <div className="mt-8 flex w-full items-start space-x-2">
                                        <button className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue p-2 whitespace-nowrap text-secondaryWhite">
                                            <img src={images.userMailVoice} className="h-7 w-7" alt="" />
                                        </button>
                                        <button className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue p-2 whitespace-nowrap text-secondaryWhite">
                                            <img src={images.userMessage} className="h-7 w-7" alt="" />
                                        </button>

                                        <button className="flex items-center justify-center gap-2 rounded-full bg-darkBlue p-3 py-3.5 text-sm font-semibold whitespace-nowrap text-[#D7F6EC] shadow-2xl">
                                            Request Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column - Detailed Info */}
                            <div className="no-scrollbar max-h-max w-[60%] overflow-y-auto p-6">
                                <div className="">
                                    <div className="text-darkBlue">
                                        <h2 className="text-lg font-extrabold">Bio</h2>
                                        <p className="mt-1 text-[13px] font-medium">{bio}</p>
                                    </div>
                                    <div className="mt-10 grid grid-cols-2 gap-y-4 text-sm text-darkBlue">
                                        <div>
                                            <p className="text-base font-bold">Experience</p>
                                            <p className="text-sm font-normal">{experience}</p>
                                        </div>
                                        <div>
                                            <p className="text-base font-bold">Interest</p>
                                            <p className="text-sm font-normal">{interest}</p>
                                        </div>
                                        <div>
                                            <p className="text-base font-bold">Industry</p>
                                            <p className="text-sm font-normal">{industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-base font-bold">Company Stage</p>
                                            <p className="text-sm font-normal">{companyStage}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-base font-bold">Key Strength</p>
                                            <p className="text-sm font-normal">{keyStrength}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-base font-bold">Top Goal</p>
                                            <p className="text-sm font-normal">{topGoal}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Activity */}
                                <div className="mt-10 rounded-br-4xl bg-darkBlue px-5 py-7 pb-20 text-secondaryWhite">
                                    <h2 className="text-lg font-bold">Activity & Reputation</h2>
                                    <div className="mt-8 flex flex-col gap-y-4 text-sm">
                                        <div>
                                            <p className="font-bold">BRN Member Since</p>
                                            <p className="text-sm font-light">{brnMemberSince}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Response Rate</p>
                                            <p className="text-sm font-light">{responseRate}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-bold">Successful Deals Rate</p>
                                            <p className="text-sm font-light">{successfulDealsRate}</p>
                                        </div>
                                    </div>

                                    <a href="#" className="mt-10 block text-sm font-medium italic underline">
                                        View Reviews
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </div>
            </Sheet>
        </div>
    );
};

export default UserDetailedSidebar;
