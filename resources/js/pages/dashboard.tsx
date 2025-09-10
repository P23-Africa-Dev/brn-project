import SmartMatchesSection from '@/components/cards/SmartCard';
import UserCard from '@/components/cards/UserCard';
import UserCardLead from '@/components/cards/UserCardLead';
import SplineAreaChart from '@/components/chart/BasicAreaChart';
import BasicPolarChart from '@/components/chart/BasicPolarChart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { Counter } from '@/hooks/useCounter';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import axios from 'axios';
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

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

    const dummyLeads = [
        {
            name: 'Thabo Ladi',
            email: 'Username@gmail.com',
            title: 'COO',

            rating: 4.6,
            iconSrc: `${images.userCheck}`,
        },
        {
            name: 'P23 Africa',
            email: 'P23africa.com',
            title: 'Business',

            rating: 4.6,
            iconSrc: `${images.userCheck}`,
        },
        {
            name: 'Kwame Nkrumah',
            email: 'kwame.n@example.com',
            title: 'CEO',
            rating: 4.6,
            iconSrc: `${images.userCheck}`,
        },
        {
            name: 'M-Pesa Holdings',
            email: 'contact@mpesa.com',
            title: 'Fintech',
            rating: 4.6,
            iconSrc: `${images.userCheck}`,
        },
        {
            name: 'Lola Adeoye',
            email: 'lola.a@example.com',
            title: 'CTO',
            rating: 4.6,
            iconSrc: `${images.userCheck}`,
        },
    ];

    const dummyCards = [
        {
            name: 'Thabo Molefe',
            location: 'Johannesburg, South Africa',
            title: 'CFO',
            industry: 'Renewable Energy',
            rating: 4.6,
            imageSrc: `${images.man2}`,
        },
        {
            name: 'Amina Diop',
            location: 'Dakar, Senegal',
            title: 'COO',
            industry: 'Francophone Africa Startups',
            rating: 4.6,
            imageSrc: `${images.man3}`,
        },
        {
            name: 'Suresh Kumar',
            location: 'Mumbai, India',
            title: 'CTO',
            industry: 'Fintech',
            rating: 4.8,
            imageSrc: `${images.man4}`,
        },
        {
            name: 'Maria Garcia',
            location: 'Mexico City, Mexico',
            title: 'CEO',
            industry: 'E-commerce',
            rating: 4.5,
            imageSrc: `${images.man3}`,
        },
        {
            name: 'Chen Wei',
            location: 'Beijing, China',
            title: 'VP of Sales',
            industry: 'Artificial Intelligence',
            rating: 4.7,
            imageSrc: `${images.man2}`,
        },
        {
            name: 'Fatima Al-Hamad',
            location: 'Dubai, UAE',
            title: 'Head of Marketing',
            industry: 'Luxury Goods',
            rating: 4.9,
            imageSrc: `${images.man3}`,
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Dashboard" /> */}

            <div className="bg-transparent pt-0 pb-2.5 lg:bg-[#031C5B] lg:pt-2">
                <div
                    className="relative flex flex-1 rounded-4xl bg-[#f9f9f9] bg-cover bg-no-repeat bg-blend-overlay lg:py-3"
                    style={{
                        backgroundImage: `url(${images.uibg})`,
                    }}
                >
                    <div className="no-scrollbar flex max-h-[95vh] w-full flex-col gap-2 overflow-y-auto px-2 pb-1 lg:px-16 lg:py-0">
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
                            <div className="grid-card-shadow relative hidden aspect-auto overflow-hidden rounded-xl lg:block">
                                <div className="flex flex-col p-3">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold dark:text-deepBlue">Network Status</h4>
                                        <div>
                                            <h5 className="flex items-center justify-end gap-1.5">
                                                <span
                                                    className={`text-xl leading-10 font-medium ${
                                                        activityChange.isIncrease ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                                >
                                                    {Math.abs(activityChange.change)}%
                                                </span>
                                                <span>
                                                    <img
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
                            <img  className='block lg:hidden' src={images.mobileGraph} alt="" />

                            {/*-------------------------//////////////////////----------------- FOURTH ROW MOBILE----------------//////////////////////------------------------- */}
                            <div className='block lg:hidden'>
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
                            <div className="grid-card-shadow relative hidden aspect-auto overflow-hidden rounded-xl lg:block">
                                <div className="h-full w-full bg-gradient-to-r from-[#12553F] to-[#02251A] pl-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="mt-8 ml-2 pr-3">
                                            <h4 className="text-lg leading-5 font-semibold text-white">Let’s Join Our Community</h4>

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
                                            <img className="absolute right-10 -bottom-10" src={images.flowerPattern} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*-------------------------//////////////////////----------------- FIFTH ROW MOBILE----------------//////////////////////------------------------- */}

                        <div className='pt-3 px-2 bg-[#0B1727]'>
                            
                        </div>

                        {/* SECOND ROW */}
                        <div className=" lg:auto-rows-[392px] auto-rows-max gap-4 md:grid-cols-5 hidden lg:grid">
                            {/* First child spans 2 columns */}
                            <div className="relative col-span-3 aspect-auto overflow-hidden rounded-xl p-10 shadow-md">
                                <div className="no-scrollbar max-h-[50vh] overflow-y-auto bg-white">
                                    {/* Absolute positioning for the half-circles on the sides */}

                                    <div className="absolute top-[15%] left-0 -ml-4 h-10 w-8 -translate-y-1/2 rounded-r-full border-2 border-l-0 border-gray-200 bg-white"></div>
                                    <div className="absolute top-1/2 left-0 -ml-4 h-10 w-8 -translate-y-1/2 rounded-r-full border-2 border-l-0 border-gray-200 bg-white"></div>
                                    <div className="absolute top-[15%] right-0 -mr-4 h-10 w-8 -translate-y-1/2 rounded-l-full border-2 border-r-0 border-gray-200 bg-white"></div>
                                    <div className="absolute top-1/2 right-0 -mr-4 h-10 w-8 -translate-y-1/2 rounded-l-full border-2 border-r-0 border-gray-200 bg-white"></div>
                                    {/* Search Header */}
                                    <div className="sticky top-0 z-10 flex items-center justify-between border-b-3 bg-white pb-3">
                                        <h2 className="text-xl font-normal text-gray-800 italic">
                                            Let's find your <span className="text-2xl leading-3 font-bold text-deepBlue">next deal</span>
                                        </h2>

                                        <div className="-ml-10 flex w-full items-start space-x-2">
                                            <div className="relative w-full">
                                                <div className="rleative cursor-pointer">
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        className="w-full rounded-full border-0 bg-[#27E6A729] px-4 py-3 pl-10 text-primary/60 placeholder:text-primary/80 focus:ring focus:ring-primary/30 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-transparent"
                                                    />
                                                    <img
                                                        src={images.aiSearch}
                                                        className="absolute top-1/2 right-10 h-6 w-6 -translate-y-1/2"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>

                                            {/* API INTEGRATION FOR COUNTRY SEARCH */}
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <div className="flex w-[160px] cursor-pointer items-end justify-end self-center">
                                                        <img src={images.sliderHorizontal} className="h-10 w-10 cursor-pointer" alt="" />
                                                    </div>
                                                </SheetTrigger>
                                                <SheetContent className="w-[300px] px-5 sm:w-[400px] dark:bg-gray-800 dark:text-gray-100">
                                                    <SheetHeader>
                                                        <SheetTitle className="mb-4 text-2xl font-bold dark:text-gray-100">Filter By;</SheetTitle>
                                                        <SheetDescription className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="grid gap-6 py-4">
                                                        <div className="space-y-2">
                                                            <label htmlFor="country" className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                                                Country
                                                            </label>
                                                            {/* {loading && <p>Loading countries…</p>}
                                                            {error && <p className="text-red-500">Error: {error}</p>} */}

                                                            <Select>
                                                                <SelectTrigger id="country" className="w-full">
                                                                    <SelectValue placeholder="Select a country" />
                                                                </SelectTrigger>
                                                                <SelectContent className="px-3 py-4">
                                                                    Nigeria
                                                                    {/* {africanCountries.map((c) => (
                                                                        <SelectItem key={c.code} value={c.name}>
                                                                            {c.name}
                                                                        </SelectItem>
                                                                    ))} */}
                                                                </SelectContent>
                                                            </Select>
                                                            {/* <Select>
                                                                <SelectTrigger
                                                                    id="country"
                                                                    className="w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                                                >
                                                                    <SelectValue placeholder="Select a category" />
                                                                </SelectTrigger>
                                                                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                                                                    <SelectItem value="usa">USA</SelectItem>
                                                                    <SelectItem value="canada">Canada</SelectItem>
                                                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                                                </SelectContent>
                                                            </Select> */}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label
                                                                htmlFor="industry"
                                                                className="text-lg font-medium text-gray-700 dark:text-gray-200"
                                                            >
                                                                Industry
                                                            </label>
                                                            <Select>
                                                                <SelectTrigger
                                                                    id="industry"
                                                                    className="w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                                                >
                                                                    <SelectValue placeholder="Select a category" />
                                                                </SelectTrigger>
                                                                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                                                                    <SelectItem value="tech">Technology</SelectItem>
                                                                    <SelectItem value="finance">Finance</SelectItem>
                                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label
                                                                htmlFor="position"
                                                                className="text-lg font-medium text-gray-700 dark:text-gray-200"
                                                            >
                                                                Position
                                                            </label>
                                                            <Select>
                                                                <SelectTrigger
                                                                    id="position"
                                                                    className="w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                                                >
                                                                    <SelectValue placeholder="Select a category" />
                                                                </SelectTrigger>
                                                                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                                                                    <SelectItem value="ceo">CEO</SelectItem>
                                                                    <SelectItem value="cto">CTO</SelectItem>
                                                                    <SelectItem value="cfo">CFO</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        className="mt-8 w-full py-3 text-lg font-semibold text-white"
                                                        style={{ backgroundColor: '#193E47' }}
                                                    >
                                                        Search
                                                    </Button>
                                                </SheetContent>
                                            </Sheet>
                                        </div>
                                    </div>

                                    {/* Cards Container */}
                                    <div className="space-y-4 pr-2">
                                        {dummyCards.map((card, index) => (
                                            <UserCard
                                                key={index}
                                                name={card.name}
                                                location={card.location}
                                                title={card.title}
                                                industry={card.industry}
                                                rating={card.rating}
                                                imageSrc={card.imageSrc}
                                            />
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
                            </div>

                            {/* Second child spans 1 column */}
                            <div className="grid-card-shadow relative col-span-2 aspect-auto overflow-hidden rounded-xl bg-white hidden lg:block">
                                <div className="p-6">
                                    <h2 className="mb-3 text-xl font-semibold text-[#414D55] italic dark:text-gray-100">Message Stats</h2>

                                    <div>
                                        <div>{typeof window !== 'undefined' && <BasicPolarChart />}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* THIRD ROW */}
                        <div className="hidden auto-rows-min gap-4 md:grid-cols-5 lg:grid">
                            {/* SMART CLIENT */}
                            <div className="grid-card-shadow relative col-span-2 aspect-auto overflow-hidden rounded-xl border-2 border-darkGreen bg-white">
                                <div className="max-w-[150px] pt-3 pb-2 pl-5">
                                    <h2 className="font-lighter text-xl tracking-wider text-gray-800 italic dark:text-deepBlue">
                                        Your Smart <span className="text-2xl leading-3 font-bold tracking-normal text-deepBlue">Matches</span>
                                    </h2>
                                </div>

                                <div>
                                    <SmartMatchesSection />
                                </div>
                            </div>

                            {/* REMCOMMENDATION LEANDS */}
                            <div className="grid-card-shadow relative col-span-3 aspect-auto overflow-hidden rounded-xl bg-white">
                                <div className="mx-auto max-w-[590px] pt-4">
                                    {/* Header */}
                                    <div className="mb-6 flex items-center justify-between px-3 md:px-0">
                                        <h2 className="text-xl font-bold text-darkBlue dark:text-gray-100">Recommended Leads</h2>
                                        <div className="rounded-xl bg-[#59AFD6] px-6 py-0.5 text-sm font-medium text-white hover:bg-[#59AFD6]/80 dark:bg-blue-900">
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
