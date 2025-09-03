import SmartMatchesSection from '@/components/cards/SmartCard';
import UserCard from '@/components/cards/UserCard';
import UserCardLead from '@/components/cards/UserCardLead';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Upload } from 'lucide-react';

// import required modules

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// interface SmartMatch {
//     name: string;
//     title: string;
//     company: string;
//     rating: number;
//     imageSrc: string;
// }

    type User = {
        id: number;
        name: string;
        email: string;
        profile_picture?: string;
        company_name?: string;
        company_description?: string;
        industry?: string;
        categories?: string | 'Johannesburg, South Africa';
        great_at?: string;
        can_help_with?: string;
        rating: 4.6;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };

    interface Props extends PageProps {
        users: User[];
    }

function Dashboard({ auth, users }: Props) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Dashboard" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="hidden md:block">
                    {auth.user ? (
                        <h3 className="text-3xl font-medium dark:text-white">
                            Good Morning <span className="font-bold">{auth.user.name}</span>{' '}
                        </h3>
                    ) : (
                        <h3 className="text-3xl font-medium dark:text-white">
                            Good Morning <span className="font-bold">Kwame</span>{' '}
                        </h3>
                    )}
                </div>
                {/* FIRST ROW */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* CHART CONTAINER */}
                    <div className="relative aspect-auto overflow-hidden rounded-xl shadow-md">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>

                    {/* CONNECTIONS CONTAINER */}
                    <div className="relative aspect-auto overflow-hidden rounded-xl shadow-md">
                        <div className="flex flex-col p-3">
                            <div className="flex justify-between">
                                <h4 className="font-bold">Network Status</h4>

                                <div>
                                    <h5 className="flex items-center justify-end gap-1.5">
                                        <span className="text-xl leading-10 font-medium">15%</span>
                                        <span>
                                            <img src={images.arrowUp} alt="" />
                                        </span>
                                    </h5>
                                    <h6 className="-mt-2 text-[12px] font-normal">Increase this week</h6>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="-mt-4 flex items-center divide-x divide-gray-200">
                                    <div className="pr-5">
                                        <span className="text-3xl font-bold text-[#F05831]">45k</span> <br />
                                        <h6 className="text-[#727677]">Leads</h6>
                                    </div>
                                    <div className="pl-5">
                                        <span className="text-3xl font-bold text-[#0496FF]">75k</span> <br />
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

                    {/* COMMUNITY CONTAINER */}
                    <div className="relative aspect-auto overflow-hidden rounded-xl shadow-md">
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

                {/* SECOND ROW */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    {/* First child spans 2 columns */}
                    <div className="relative col-span-3 aspect-auto overflow-hidden rounded-xl shadow-md">
                        <div className="bg-white p-6 dark:bg-gray-800">
                            {/* Search Header */}
                            <div className="mb-6 flex items-center justify-between border-b-3 pb-4">
                                <h2 className="text-xl font-light text-gray-800 italic dark:text-gray-100">
                                    Let's find your <span className="text-2xl leading-3 font-bold text-deepBlue">next deal</span>
                                </h2>
                                <div className="-ml-10 flex w-full items-start space-x-2">
                                    <div className="relative w-full">
                                        <div className="rleative">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="w-full rounded-full border-0 bg-[#27E6A729] px-4 py-3 pl-10 text-primary/60 placeholder:text-primary/80 focus:ring focus:ring-primary/30 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-transparent"
                                            />
                                            <img src={images.aiSearch} className="absolute top-1/2 right-10 h-6 w-6 -translate-y-1/2" alt="" />
                                        </div>
                                    </div>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <div className="flex w-[200px] cursor-pointer items-end justify-end self-center">
                                                <img src={images.sliderHorizontal} className="h-10 w-10 cursor-pointer" alt="" />
                                            </div>
                                        </SheetTrigger>
                                        <SheetContent className="w-[300px] sm:w-[400px] dark:bg-gray-800 dark:text-gray-100">
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
                                                    <Select>
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
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="industry" className="text-lg font-medium text-gray-700 dark:text-gray-200">
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
                                                    <label htmlFor="position" className="text-lg font-medium text-gray-700 dark:text-gray-200">
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

                            <div className="scrollbar-hide max-h-[60vh] space-y-4 overflow-y-auto pr-2">
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
                                {users.map((user) => (
                                    <UserCard
                                        key={user.id}
                                        name={user.name}
                                        categories={user.categories}
                                        company_name={user.company_name}
                                        industry={user.industry}
                                        updated_at={user.updated_at}
                                        profile_picture={user.profile_picture}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Second child spans 1 column */}
                    <div className="relative col-span-2 aspect-auto overflow-hidden rounded-xl shadow-md">
                        <div className="p-6">
                            <h2 className="mb-3 text-xl font-semibold text-[#414D55] italic dark:text-gray-100">Message Stats</h2>

                            <div>
                                <img src={images.chart} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* THIRD ROW */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    {/* SMART CLIENT */}
                    <div className="relative col-span-2 aspect-auto overflow-hidden rounded-xl shadow-md">
                        <div className="p-6">
                            <div className="max-w-[150px]">
                                <h2 className="font-lighter text-xl tracking-wider text-gray-800 italic dark:text-gray-100">
                                    Your Smart <span className="text-2xl leading-3 font-bold tracking-normal text-deepBlue">Matches</span>
                                </h2>
                            </div>

                            <div>
                                <SmartMatchesSection />
                            </div>
                        </div>
                    </div>

                    {/* REMCOMMENDATION LEANDS */}
                    <div className="relative col-span-3 aspect-auto overflow-hidden rounded-xl shadow-md">
                        <div className="p-6">
                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-darkBlue dark:text-gray-100">Recommended Leads</h2>
                                <div className="rounded-xl bg-[#59AFD6] px-6 py-0.5 text-sm font-medium text-white hover:bg-[#59AFD6]/80 dark:bg-blue-900">
                                    Verified
                                </div>
                            </div>

                            {/* Scrollable Card Container */}
                            <div className="scrollbar-hide max-h-[30vh] space-y-4 overflow-y-auto pr-2">
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
        </AppLayout>
    );
}

export default Dashboard;
