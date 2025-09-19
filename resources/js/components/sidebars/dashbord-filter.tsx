import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import images from '@/constants/image';
import { useState } from 'react';

// Options
const countries = ['Nigeria'];
const industries = [
    'Consulting',
    'Legal Services',
    'Accounting & Bookkeeping',
    'Marketing & Advertising',
    'Business Coaching',
    'Virtual Assistance',
    'HR & Recruitment',
    'Technology',
    'Finance',
    'Healthcare',
];
const positions = ['CEO', 'CTO', 'CFO', 'Manager', 'Engineer'];

export const FilterSidebar = () => {
    // Search states
    const [searchCountry, setSearchCountry] = useState('');
    const [searchIndustry, setSearchIndustry] = useState('');
    const [searchPosition, setSearchPosition] = useState('');

    // Open/close states for icons
    const [openCountry, setOpenCountry] = useState(false);
    const [openIndustry, setOpenIndustry] = useState(false);
    const [openPosition, setOpenPosition] = useState(false);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="flex w-[40px] md:w-[100px] md:pr-2 lg:w-[50px]  xl:w-[130px] cursor-pointer items-center md:items-end lg:items-center justify-end">
                    <img src={images.desktopSlide} className="xl:h-10 hidden lg:block xl:w-10 lg:w-8 lg:mt-2 xl:mt-0 lg:h-8 cursor-pointer" alt="filter" />
                    <img src={images.preferenceHorizontal} className=" w-7 h-7  lg:hidden  cursor-pointer" alt="filter" />
                </div>
            </SheetTrigger>

            <SheetContent className="w-[336px] pb-20 xl:pb-0 overflow-y-auto rounded-l-[40px] p-10 dark:bg-gray-800 dark:text-gray-100">
                <SheetHeader>
                    <SheetTitle className="mb-2 text-2xl font-semibold text-deepBlack dark:text-gray-100">Filter By</SheetTitle>
                    <SheetDescription className="text-sm text-deepBlack dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </SheetDescription>
                </SheetHeader>

                <div className="grid gap-6 px-2 py-4">
                    {/* Country */}
                    <div className="relative">
                        <label htmlFor="country" className="text-base font-semibold text-darkBlue dark:text-gray-200">
                            Country
                        </label>
                        <div className='mt-2'>
                            <Select onOpenChange={(o) => setOpenCountry(o)}>
                                <SelectTrigger
                                    id="country"
                                    className="flex w-full justify-between rounded-none border py-2 whitespace-nowrap outline-none focus:ring-0 focus:ring-offset-0 [&_svg]:hidden"
                                >
                                    <SelectValue className="w-full whitespace-nowrap" placeholder="Choose an industry" />
                                    {openCountry ? (
                                        <span className="pointer-events-none absolute right-4 rotate-180 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    ) : (
                                        <span className="pointer-events-none absolute right-4 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    )}
                                </SelectTrigger>
                                <SelectContent className="w-full [&_svg]:hidden py-1 select-dropdown-shadow">
                                    {/* <div className="sticky top-0 z-10 mb-2 bg-white dark:bg-gray-700">
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={searchCountry}
                                        onChange={(e) => setSearchCountry(e.target.value)}
                                        className="mb-2 w-full border-b px-2 py-1 text-sm"
                                    />
                                </div> */}
                                    {countries
                                        .filter((c) => c.toLowerCase().includes(searchCountry.toLowerCase()))
                                        .map((c, i) => (
                                            <SelectItem className="data-[highlighted]:bg-[#CCA6FF]/15  data-[highlighted]:text-deepBlack cursor-pointer" key={i} value={c}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Industry */}
                    <div className="relative">
                        <label htmlFor="industry" className="text-base font-semibold text-darkBlue dark:text-gray-200">
                            Industry
                        </label>
                        <div className="mt-2">
                            <Select onOpenChange={(o) => setOpenIndustry(o)}>
                                <SelectTrigger
                                    id="industry"
                                    className="flex w-full justify-between rounded-none border py-2 whitespace-nowrap outline-none focus:ring-0 focus:ring-offset-0 [&_svg]:hidden"
                                >
                                    <SelectValue className="w-full whitespace-nowrap" placeholder="Choose an industry" />
                                    {openIndustry ? (
                                        <span className="pointer-events-none absolute right-4 rotate-180 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    ) : (
                                        <span className="pointer-events-none absolute right-4 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    )}
                                </SelectTrigger>

                                <SelectContent position="popper" sideOffset={4} className="max-h-60 w-[245px] overflow-y-auto border [&_svg]:hidden select-dropdown-shadow">
                                    <div className="sticky top-0 z-10 mt-0 mb-2 bg-white dark:bg-gray-700">
                                        <input
                                            type="text"
                                            placeholder="Search industry..."
                                            value={searchIndustry}
                                            onChange={(e) => setSearchIndustry(e.target.value)}
                                            className="mb-2 w-full rounded-none border-b px-2 py-2 text-sm focus:ring-0 focus:outline-0"
                                        />
                                    </div>
                                    {industries
                                        .filter((ind) => ind.toLowerCase().includes(searchIndustry.toLowerCase()))
                                        .map((ind, i) => (
                                            <SelectItem   className="data-[highlighted]:bg-[#CCA6FF]/15  data-[highlighted]:text-deepBlack cursor-pointer" key={i} value={ind}>
                                                {ind}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Position */}
                    <div className="relative">
                        <label htmlFor="position" className="text-base font-semibold text-darkBlue dark:text-gray-200">
                            Position
                        </label>
                        <div className="mt-2">
                            <Select onOpenChange={(o) => setOpenPosition(o)}>
                                <SelectTrigger
                                    id="position"
                                    className="flex w-full justify-between rounded-none border py-2 whitespace-nowrap outline-none focus:ring-0 focus:ring-offset-0 [&_svg]:hidden"
                                >
                                    <SelectValue className="w-full whitespace-nowrap" placeholder="Select a position" />
                                    {openPosition ? (
                                        <span className="pointer-events-none absolute right-4 rotate-180 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    ) : (
                                        <span className="pointer-events-none absolute right-4 transform">
                                            <img src={images.dropDownSelect} className="h-1.5 w-full" alt="" />
                                        </span>
                                    )}
                                </SelectTrigger>

                                <SelectContent
                                    position="popper"
                                    sideOffset={4}
                                    className="max-h-60 w-[245px] overflow-y-auto border focus:ring-0 focus:ring-offset-0 [&_svg]:hidden select-dropdown-shadow"
                                >
                                    <div className="sticky top-0 z-10 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Search position..."
                                            value={searchPosition}
                                            onChange={(e) => setSearchPosition(e.target.value)}
                                            className="mb-2 w-full rounded-none border-b px-2 py-2 text-sm focus:ring-0 focus:outline-0"
                                        />
                                    </div>
                                    {positions
                                        .filter((p) => p.toLowerCase().includes(searchPosition.toLowerCase()))
                                        .map((p, i) => (
                                            <SelectItem className="data-[highlighted]:bg-[#CCA6FF]/15  data-[highlighted]:text-deepBlack cursor-pointer" key={i} value={p}>
                                                {p}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Button className="mt-4 w-full rounded-full py-6 shadow-xl text-lg font-semibold text-white" style={{ backgroundColor: '#193E47' }}>
                    Search
                </Button>
            </SheetContent>
        </Sheet>
    );
};
