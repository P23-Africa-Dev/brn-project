import SmartMatchesSection from '@/components/cards/SmartCard';
import UserCard from '@/components/cards/UserCard';
import UserCardLead from '@/components/cards/UserCardLead';
import SplineAreaChart from '@/components/chart/BasicAreaChart';
import BasicPolarChart from '@/components/chart/BasicPolarChart';
import { FilterSidebar } from '@/components/sidebars/dashbord-filter';
import UserProfileSidebar from '@/components/sidebars/user-show-sidebar';
import images from '@/constants/image';
import { dummyCards, dummyLeads } from '@/dummyDatas/users';
import { Counter } from '@/hooks/useCounter';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import axios from 'axios';
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { Upload } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    profile_picture?: string | null;
    company_name?: string;
    company_description?: string;
    industry?: string;
    categories?: string;
    great_at?: string;
    can_help_with?: string;
    rating?: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    phone?: string;
    linkedin?: string;
    country?: string;
    position?: string;
    years_of_operation?: string;
    number_of_employees?: string;
    selected_outcome?: string;
    goals?: string;
};
interface Props extends PageProps {
    users: User[];
}

function Dashboard({ auth, users }: Props) {
    const [activityChange, setActivityChange] = useState<{
        change: number;
        isIncrease: boolean;
    }>({
        change: 0,
        isIncrease: true,
    });

    useEffect(() => {
        axios
            .get('/api/user-activity-change')
            .then((response) => {
                setActivityChange(response.data);
            })
            .catch((error) => {
                console.error('Error fetching activity change:', error);
            });
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AppLayout>
            <div className="relative z-0 bg-transparent pt-0 pb-2.5 lg:bg-[#031C5B] lg:pt-2">
                <div
                    className="relative flex flex-1 rounded-4xl bg-cover bg-no-repeat lg:py-3"
                    style={{
                        backgroundImage: `url(${images.uibg})`,
                    }}
                >
                    <div className="no-scrollbar flex h-screen max-h-[95vh] w-full flex-col gap-3 overflow-y-auto px-2 pb-1 lg:py-0 lg:pr-17 lg:pl-12">
                        {/* USER GREETINGS */}
                        <div className="mb-1 hidden w-full lg:block dark:text-deepBlue">
                            {auth.user ? (
                                <h3 className="text-3xl font-semibold tracking-wide">
                                    {getGreeting()} <span className="font-bold tracking-tight">{auth.user.name}</span>{' '}
                                </h3>
                            ) : (
                                <h3 className="text-3xl font-medium dark:text-white">
                                    Good Morning <span className="font-bold">Kwame</span>{' '}
                                </h3>
                            )}
                        </div>
                        {/*-------------------------//////////////////////----------------- FIRST ROW MOBILE----------------//////////////////////------------------------- */}
                        <div
                            className="w-full bg-center bg-no-repeat sm:bg-cover lg:hidden"
                            style={{
                                backgroundImage: `url(${images.mobileCardBG})`,
                            }}
                        >
                            <div className="grid w-full grid-cols-2 place-content-between px-6 py-10">
                                <div className="mb-1 w-full place-self-center text-white dark:text-white">
                                    {auth.user ? (
                                        <>
                                            <h3 className="text-2xl font-semibold tracking-wide whitespace-nowrap">
                                                Hello <span className="font-bold tracking-tight"> Kwame!</span> {/* {auth.user.name}  */}
                                            </h3>
                                            <h6 className="text-xs font-light text-white">{getGreeting()} </h6>
                                        </>
                                    ) : (
                                        <h3 className="text-base font-medium">
                                            Good Morning <span className="font-bold">Kwame</span>{' '}
                                        </h3>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 place-self-end">
                                    <img src={images.notification} alt="" />
                                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#D6E264] p-2">
                                        <img src={images.man6} alt={` profile`} className="absolute inset-0 h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FIRST ROW */}
                        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                            {/* CHART CONTAINER */}
                            <div className="grid-card-shadow relative hidden aspect-auto overflow-hidden rounded-2xl bg-gradient-to-r from-[#A47AF0] to-[#CCA6FF]/80 p-2 lg:block">
                                <SplineAreaChart />
                            </div>

                            {/* CONNECTIONS CONTAINER */}
                            <div className="grid-card-shadow relative hidden aspect-auto overflow-hidden rounded-2xl lg:block">
                                <div className="flex flex-col p-3 pl-6">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold dark:text-deepBlue">Network Status</h4>
                                        <div>
                                            <h5 className="flex items-center justify-end gap-1">
                                                <span
                                                    className={`text-xl leading-10 font-medium ${activityChange.isIncrease ? 'text-green-600' : 'text-red-600'
                                                        }`}
                                                >
                                                    {Math.abs(activityChange.change)}%
                                                </span>
                                                <span>
                                                    <img
                                                        className="h-6 w-6"
                                                        src={activityChange.isIncrease ? images.arrowUp : images.arrowDown}
                                                        alt={activityChange.isIncrease ? 'Increase' : 'Decrease'}
                                                    />
                                                </span>
                                            </h5>
                                            <h6 className="-mt-2 text-[12px] font-normal">
                                                {activityChange.isIncrease ? 'Increase' : 'Decrease'} this week
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="-mt-4 flex items-center divide-x divide-gray-200">
                                            <div className="pr-5">
                                                <span className="text-3xl font-bold text-[#F05831]">
                                                    {' '}
                                                    <Counter end={45000} />
                                                </span>{' '}
                                                <br />
                                                <h6 className="text-[#727677]">Leads</h6>
                                            </div>
                                            <div className="pl-5">
                                                <span className="text-3xl font-bold text-[#0496FF]">
                                                    <Counter end={75000} />
                                                </span>{' '}
                                                <br />
                                                <h6 className="text-[#727677]">Connections</h6>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <button className="rounded-xl bg-blue-600 p-3">
                                                <Upload className="text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*-------------------------//////////////////////----------------- SECOND ROW MOBILE----------------//////////////////////------------------------- */}
                            {/* MOBILE NETWORK STATUS */}
                            <div className="flex justify-between lg:hidden">
                                <div className="w-full max-w-[290px]">
                                    <h5 className="mb-2 pl-6 text-xs font-bold">Network Stats</h5>

                                    <div className="flex rounded-full border border-primary/70 px-4 py-1 ring">
                                        <div className="grid grid-cols-2 place-items-center gap-3">
                                            <img src={images.shareKnowledge} alt="" />

                                            <div className="">
                                                <span className="text-lg font-bold text-[#F05831]">
                                                    {' '}
                                                    <Counter end={45000} />
                                                </span>{' '}
                                                <h6 className="text-xs text-[#727677]">Leads</h6>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 place-items-center">
                                            <img src={images.unlink} alt="" className="-mr-4" />

                                            <div className="">
                                                <span className="text-lg font-bold text-[#0496FF]">
                                                    <Counter end={75000} />
                                                </span>{' '}
                                                <br />
                                                <h6 className="text-xs text-[#727677]">Connections</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex max-w-[100px] items-center justify-items-end gap-1">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex">
                                            <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                <img className="h-full w-full object-center" src={images.man3} alt="User avatar" />
                                            </div>
                                            <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                <img className="h-full w-full object-center" src={images.man1} alt="User avatar" />
                                            </div>
                                            <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                <img className="h-full w-full object-center" src={images.man2} alt="User avatar" />
                                            </div>
                                        </div>
                                        <h4 className="mb-2 w-full flex-1 text-center text-[9px] whitespace-nowrap text-primary">200k+ People</h4>
                                        <button className="rounded-full bg-[#BB98FB] px-3 py-1 text-[10px] font-semibold whitespace-nowrap">
                                            Active Member
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/*-------------------------//////////////////////----------------- THIRD ROW MOBILE----------------//////////////////////------------------------- */}
                            <img className="block lg:hidden" src={images.mobileGraph} alt="" />

                            {/*-------------------------//////////////////////----------------- FOURTH ROW MOBILE----------------//////////////////////------------------------- */}
                            <div className="block lg:hidden">
                                <div className="grid grid-cols-3 place-items-center rounded-full border border-[#F9F9F9] bg-[#F1EEEE] py-0.5 shadow-md">
                                    <button className="rounded-full bg-transparent px-4 py-1.5 text-[13px] font-normal whitespace-nowrap text-primary">
                                        Connections
                                    </button>
                                    <button className="rounded-full bg-[#A87EF7] px-4 py-1.5 text-[13px] font-semibold whitespace-nowrap text-primary">
                                        Smart matches
                                    </button>
                                    <button className="rounded-full bg-transparent px-4 py-1.5 text-[13px] font-normal whitespace-nowrap text-primary">
                                        Active Leads
                                    </button>
                                </div>
                            </div>

                            {/* COMMUNITY CONTAINER */}
                            <div className="grid-card-shadow relative hidden aspect-auto overflow-hidden rounded-2xl lg:block">
                                <div className="h-full w-full bg-gradient-to-r from-[#12553F] to-[#02251A] pl-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="mt-9 ml-2 pr-3">
                                            <h4 className="mt-2 text-lg leading-5 font-semibold text-white">Let’s Join Our Community</h4>

                                            <div className="mt-4 flex items-center gap-1">
                                                <div className="flex">
                                                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                        <img className="h-full w-full object-center" src={images.man3} alt="User avatar" />
                                                    </div>
                                                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                        <img className="h-full w-full object-center" src={images.man1} alt="User avatar" />
                                                    </div>
                                                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                        <img className="h-full w-full object-center" src={images.man2} alt="User avatar" />
                                                    </div>
                                                </div>

                                                <h4 className="w-full flex-1 text-[9px] whitespace-nowrap text-white/40">200k+ People</h4>
                                            </div>
                                        </div>
                                        <div className="relative w-[210px]">
                                            <img className="absolute right-10 -bottom-7" src={images.flowerPattern} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*-------------------------//////////////////////----------------- FIFTH ROW MOBILE----------------//////////////////////------------------------- */}

                        {/* SECOND ROW */}
                        <div className="grid auto-rows-max gap-4 md:grid-cols-5 lg:auto-rows-[385px]">
                            {/* First child spans 2 columns */}
                            <div className="grid-card-shadow pt relative col-span-3 aspect-auto overflow-hidden rounded-2xl bg-[#0B1727] p-4 shadow-md lg:bg-white lg:pr-14 lg:pl-12">
                                <div className="no-scrollbar max-h-[50vh] overflow-y-auto bg-transparent">
                                    {/* Absolute positioning for the half-circles on the sides */}

                                    <div className="absolute top-[25%] left-0 -ml-4 hidden h-10 w-8 -translate-y-1/2 rounded-r-full border-2 border-l-0 border-gray-200 bg-white lg:block"></div>
                                    <div className="absolute top-[57%] left-0 -ml-4 hidden h-10 w-8 -translate-y-1/2 rounded-r-full border-2 border-l-0 border-gray-200 bg-white lg:block"></div>
                                    <div className="absolute top-[25%] right-0 -mr-4 hidden h-10 w-8 -translate-y-1/2 rounded-l-full border-2 border-r-0 border-gray-200 bg-white lg:block"></div>
                                    <div className="absolute top-[57%] right-0 -mr-4 hidden h-10 w-8 -translate-y-1/2 rounded-l-full border-2 border-r-0 border-gray-200 bg-white lg:block"></div>

                                    {/* Search Header */}
                                    <div className="sticky top-0 z-10 flex items-center justify-between border-b-3 bg-[#0B1727] pt-4 pb-3 lg:bg-white">
                                        <h2 className="w-[170px] text-lg leading-1.5 font-normal text-white italic lg:text-[17px] lg:leading-6 lg:text-gray-800">
                                            Let's find your{' '}
                                            <span className="tex-white text-base font-bold lg:text-2xl lg:leading-3 lg:text-deepBlue">next deal</span>
                                        </h2>

                                        <div className="flex w-full items-start space-x-2">
                                            <div className="relative lg:w-full">
                                                <div className="rleative cursor-pointer">
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        className="w-full rounded-full border-0 bg-gray-700 px-4 py-3 pl-10 text-primary/60 placeholder:text-primary/80 focus:ring focus:ring-primary/30 focus:outline-none lg:bg-[#27E6A729] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-transparent"
                                                    />
                                                    <img
                                                        src={images.aiSearch}
                                                        className="absolute top-1/2 right-10 h-6 w-6 -translate-y-1/2"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            {/* FILTER SIDEBAR INTEGRATION FOR SEARCH */}
                                            <FilterSidebar />
                                        </div>
                                    </div>

                                    {/* Cards Container */}

                                    {users
                                        ?.filter((user) => auth.user && user.id !== auth.user.id)
                                        .map((user) => (
                                            <UserProfileSidebar
                                                userId={user.id}           // The user being viewed
                                                authUserId={auth.user?.id ?? 0}
                                                key={user.id}
                                                name={user.name}
                                                title={user.position || 'Position not specified'}
                                                imageSrc={user.profile_picture || 'images/no-user-dp.png'}
                                                experience={user.years_of_operation || 'N/A'}
                                                industry={user.industry || 'N/A'}
                                                interest={user.categories || 'N/A'}
                                                reviews={user.rating ? user.rating.toString() : '0'}
                                                baseLocation={user.country || 'N/A'}
                                                operatesIn={user.country || 'N/A'}
                                                bio={user.company_description || ''}
                                                companyStage={user.selected_outcome || ''}
                                                keyStrength={user.great_at || ''}
                                                topGoal={user.goals || ''}
                                                brnMemberSince={user.created_at || ''}
                                                responseRate={'N/A'}
                                                successfulDealsRate={'N/A'}
                                            >
                                                <UserCard
                                                    name={user.name}
                                                    location={user.country || 'Location not specified'}
                                                    title={user.position || 'Position not specified'}
                                                    industry={user.industry || 'N/A'}
                                                    rating={user.rating || 0}
                                                    imageSrc={user.profile_picture || 'images/no-user-dp.png'}
                                                />
                                            </UserProfileSidebar>
                                        ))}

                                    {/* {users
                                            ?.filter((user) => auth.user && user.id !== auth.user.id)
                                            .map((user) => (
                                                <UserCard
                                                    key={user.id}
                                                    name={user.name}
                                                    location={user.country || 'Location not specified'}
                                                    title={user.position || 'Position not specified'}
                                                    industry={user.industry || 'N/A'}
                                                    rating={user.rating || 4.6}
                                                    imageSrc={user.profile_picture || ''}
                                                />
                                            ))} */}
                                </div>
                            </div>

                            {/* Second child spans 1 column */}
                            <div className="grid-card-shadow relative col-span-2 hidden aspect-auto overflow-hidden rounded-3xl bg-white lg:block">
                                <div className="p-6">
                                    <h2 className="mb-3 pl-12 text-xl font-semibold text-[#414D55] dark:text-gray-100">Message Stats</h2>

                                    {/* <div className="relative mx-auto max-w-sm bg-cover bg-no-repeat lg:py-3">
                                        <img
                                            src={images.lineCHart}
                                            alt={`charts background`}
                                            className="absolute inset-0 h-full w-full max-w-[90px] rounded-l-xl object-cover"
                                        />
                                        <div className="z-10">{typeof window !== 'undefined' && <BasicPolarChart />}</div>
                                    </div> */}
                                    <div className="relative mx-auto max-w-sm bg-no-repeat lg:py-3">
                                        {/* Background image behind */}
                                        <img
                                            src={images.lineCHart}
                                            alt="charts background"
                                            className="absolute inset-0 mx-auto h-full w-full object-contain opacity-70"
                                        />

                                        {/* Chart in front */}
                                        <div className="relative z-0 flex justify-center">{typeof window !== 'undefined' && <BasicPolarChart />}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* THIRD ROW */}
                        <div className="hidden auto-rows-min gap-4 md:grid-cols-5 lg:grid">
                            {/* SMART CLIENT */}
                            <div className="grid-card-shadow relative col-span-2 aspect-auto overflow-hidden rounded-2xl border-2 border-darkGreen bg-white">
                                <div className="max-w-[150px] pt-3 pb-2 pl-5">
                                    <h2 className="font-lighter text-lg tracking-wider text-gray-800 italic dark:text-deepBlue">
                                        Your Smart <span className="text-2xl leading-4 font-extrabold tracking-normal text-deepBlue">Matches</span>
                                    </h2>
                                </div>

                                <div>
                                    <SmartMatchesSection />
                                </div>
                            </div>

                            {/* REMCOMMENDATION LEANDS */}
                            <div className="grid-card-shadow relative col-span-3 aspect-auto overflow-hidden rounded-2xl bg-white">
                                <div className="mx-auto max-w-[590px] pt-4">
                                    {/* Header */}
                                    <div className="mb-6 flex items-center justify-between px-3 md:px-0">
                                        <h2 className="text-xl font-bold text-[#193E47] dark:text-gray-100">Recommended Leads</h2>
                                        <div className="rounded bg-[#59AFD6] px-6 py-0.5 text-sm font-extralight text-white italic hover:bg-[#59AFD6]/80 dark:bg-blue-900">
                                            Verified
                                        </div>
                                    </div>

                                    {/* Scrollable Card Container */}
                                    <div className="no-scrollbar max-h-[30vh] space-y-4 overflow-y-auto pr-2">
                                        {dummyLeads.map((lead, index) => (
                                            <UserCardLead
                                                key={index}
                                                name={lead.name}
                                                email={lead.email}
                                                title={lead.title}
                                                iconSrc={lead.iconSrc}
                                                rating={lead.rating}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="fixed bottom-0 mx-auto w-full max-w-sm bg-transparent p-4 lg:hidden">
                    <div className="relative flex h-20 w-full items-center justify-around rounded-3xl border border-[#202730] bg-[#1e2531]">
                        <div className="absolute -top-8 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-[#121820] bg-[#394d6c] shadow-2xl">
                            <img src={images.dashboardIcon} alt="" />
                        </div>
                        <div className="flex h-full w-full items-center justify-between px-8 pt-4">
                            <div className="flex items-center space-x-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <div className="w-16"></div>
                            <div className="flex items-center space-x-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;
