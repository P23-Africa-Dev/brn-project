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
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="right" className="border-none bg-transparent sm:max-w-md lg:max-w-4xl">
                <div className="flex h-full w-full rounded-3xl bg-white p-4 shadow-lg">
                    {/* Left Column - User Profile */}
                    <div className="flex w-[40%] flex-col rounded-l-3xl bg-[#A7D5DD] p-6 shadow-2xl">
                        {/***************************** Top Area */}
                        <div className="flex flex-col items-center text-center">
                            {/* <div className="relative h-28 w-28 overflow-hidden rounded-full">
                                <img src={imageSrc} alt={`${name}'s profile`} className="h-full bg-top  w-full object-cover" />
                            </div> */}

                            <div className="relative h-28 w-28 overflow-hidden rounded-full">
                                <div
                                    style={{
                                        backgroundImage: `url(${imageSrc})`,
                                    }}
                                    className="aboslute left-0 h-full w-full max-w-full overflow-hidden bg-cover bg-top bg-no-repeat"
                                ></div>
                            </div>

                            {/* Headings */}
                            <div className="mt-5 mb-4 space-y-0.5 text-darkBlue">
                                <h1 className="text-3xl leading-3.5 font-extrabold">{name}</h1>
                                <p className="text-xl font-normal">{title}</p>
                            </div>

                            {/* Descriptions */}

                            <p className="mt-4 text-[13px] font-medium text-darkBlue">"{topGoal}"</p>

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
                                    <span className="block text-sm font-light">{baseLocation}</span>
                                </h3>
                                <h3 className="text-base font-bold text-darkBlue">
                                    Operates In
                                    <span className="block text-sm font-light">{operatesIn}</span>
                                </h3>
                            </div>
                            <div className="mt-8 flex w-full items-start space-x-2">
                                <button className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue p-2 whitespace-nowrap text-secondaryWhite">
                                    <img src={images.mailVoice} className="h-6 w-6" alt="" />
                                </button>
                                <button className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue p-2 whitespace-nowrap text-secondaryWhite">
                                    <img src={images.messagepeople} className="h-6 w-6" alt="" />
                                </button>

                                <button className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue p-3 text-sm whitespace-nowrap text-secondaryWhite shadow-2xl">
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
                                <p className="mt-1 text-sm font-medium">{bio}</p>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-y-4 text-sm text-darkBlue">
                                <div>
                                    <p className="text-base font-bold">Experience</p>
                                    <p className="text-sm font-light">{experience}</p>
                                </div>
                                <div>
                                    <p className="text-base font-bold">Interest</p>
                                    <p className="text-sm font-light">{interest}</p>
                                </div>
                                <div>
                                    <p className="text-base font-bold">Industry</p>
                                    <p className="text-sm font-light">{industry}</p>
                                </div>
                                <div>
                                    <p className="text-base font-bold">Company Stage</p>
                                    <p className="text-sm font-light">{companyStage}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-base font-bold">Key Strength</p>
                                    <p className="text-sm font-light">{keyStrength}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-base font-bold">Top Goal</p>
                                    <p className="text-sm font-light">{topGoal}</p>
                                </div>
                            </div>
                        </div>

                        {/* Activity */}
                        <div className="mt-10 rounded-br-4xl bg-darkBlue px-5 py-7 pb-20 text-white">
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

                            <a href="#" className="mt-10 block text-sm font-medium underline">
                                View Reviews
                            </a>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserDetailedSidebar;
