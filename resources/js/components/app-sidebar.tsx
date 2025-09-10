'use client';

import images from '@/constants/image';
import { Link, usePage } from '@inertiajs/react';
import { Headphones, LucideIcon, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavItem {
    name: string;
    icon: string;
    href: string;
}

interface PageProps {
    auth: {
        user: {
            name: string;
            position?: string;
            company_name?: string;
            profile_picture: string | null; // Update this line
        };
    };
    [key: string]: unknown; // Add index signature to satisfy Inertia's PageProps constraint
}

// Define the navigation items with href for Inertia
const navItems: NavItem[] = [
    {
        name: 'Dashboard',
        icon: `${images.dashboardIcon}`,
        href: '/dashboard',
    },
    {
        name: 'Referrals',
       icon: `${images.repeatIcon}`,
        href: '/referrals',
    },
    {
        name: 'Messages',
         icon: `${images.messageIcon}`,
        href: '/chats',
    },
    {
        name: 'Directory',
        icon: `${images.directoryIcon}`,
        href: '/directory',
    },
    {
        name: 'Leads',
        icon: `${images.LeadsIcon}`,
        href: '/leads',
    },
];

const userAccountItems: NavItem[] = [
    { name: 'Settings',   icon: `${images.accountSettingsIcon}`, href: '/settings' },
    { name: 'Help',   icon: `${images.profileIcon}`, href: '/help' },
];

export default function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const profileImage: string = `${images.man1}`;

    // Add this function to clean the URL
    const getProfilePicture = () => {
        if (!auth.user?.profile_picture) return profileImage;
        return auth.user.profile_picture.startsWith('http') ? auth.user.profile_picture : `${window.location.origin}${auth.user.profile_picture}`;
    };

    useEffect(() => {
        console.log('Profile picture URL:', auth.user.profile_picture);
    }, [auth.user.profile_picture]);

    return (
        <div
            className="bg-[#031C5B]"
            style={{
                background: 'linear-gradient(100deg, #0B1727 100%, #0B1727 80%, #0B1727 40%)',
            }}
        >
            <div
                className="sticky top-0 left-0 hidden h-screen w-[210px]  overflow-hidden text-white md:block"
                style={{
                    background: 'linear-gradient(180deg, #031C5B 0%, #0B1727 80%, #031C5B 100%)',
                }}
            >
                <div className="flex h-full flex-col justify-between pl-6">
                    {/* Logo Section */}
                    <div className="mb-20 flex items-center space-x-2 pt-8">
                        <img src={images.brnLogo} alt="" />
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1">
                        {navItems.map((item: NavItem) => {
                            const isActive: boolean = activeItem === item.name;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveItem(item.name)}
                                    className={`relative flex items-center   transition-all duration-300 ${
                                        isActive ? 'font-bold' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {/* Highlight background */}
                                    <div
                                        className={`absolute top-0 left-0 h-full w-[600px] z-10 transform transition-all duration-300 ${
                                            isActive ? '-translate-x-3 rounded-l-full rounded-r-2xl bg-white' : ''
                                        }`}
                                    ></div>

                                    {/* Icon + Label */}
                                    <div
                                        className={`relative z-10 flex w-full   items-center rounded-lg py-2 transition-colors duration-300 ${
                                            isActive ? 'text-gray-800 font-bold' : 'text-white font-light'
                                        }`}
                                    >
                                        <div
                                            className={`flex rounded-full mr-3 bg-[#263D5C8F] p-2 justify-center items-center${
                                                isActive ? ' bg-primary  text-center text-white' : ''
                                            }`}
                                        >
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Account Section */}
                    <div className="mt-10 pb-10">
                        <p className="mb-2 text-xs tracking-wider text-gray-400">USER ACCOUNT</p>
                        <div className="mb-3 flex items-center space-x-1.5">
                            <div className="relative h-10 w-10 rounded-full bg-[#D6E264] p-2">
                                <img
                                    src={getProfilePicture()}
                                    alt={`${auth.user.name}'s Profile`}
                                    className="absolute inset-0 mr-4 h-full w-full rounded-full border-2 border-gray-400 object-center"
                                    onError={(e) => {
                                        e.currentTarget.src = profileImage;
                                    }}
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold">{auth.user.name}</h3>
                                <p className="text-xs text-gray-400">
                                    {auth.user.position && auth.user.company_name
                                        ? `${auth.user.position} at ${auth.user.company_name}`
                                        : auth.user.position || auth.user.company_name || ''}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            {userAccountItems.map((item: NavItem) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center text-gray-400 transition-colors duration-200 hover:text-white"
                                >
                                    <div className="relative flex items-center rounded-lg transition-colors duration-300">
                                        <img src={item.icon} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
