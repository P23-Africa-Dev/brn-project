'use client';

import images from '@/constants/image';
import { Link } from '@inertiajs/react';
import { Headphones, LayoutDashboard, Link as LinkIcon, LucideIcon, MessageSquare, Settings, SquareDashedKanban, Users } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    name: string;
    icon: LucideIcon;
    href: string;
}

// Define the navigation items with href for Inertia
const navItems: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Referrals', icon: LinkIcon, href: '/referrals' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Directory', icon: Users, href: '/directory' },
    { name: 'Leads', icon: SquareDashedKanban, href: '/leads' },
];

const userAccountItems: NavItem[] = [
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help', icon: Headphones, href: '/help' },
];

export default function AppSidebar() {
    const [activeItem, setActiveItem] = useState<string>('Dashboard');

    const profileImage: string = `${images.man1}`;

    return (
        <div
      
            className="bg-[#031C5B]"
              style={{
                    background: 'linear-gradient(180deg, #031C5B 0%, #0B1727 50%, #031C5B 100%)',
                }}
        >
            <div
                className="sticky top-0 left-0 hidden h-screen w-[64] overflow-hidden rounded-r-[48px] text-white md:block"
                style={{
                    background: 'linear-gradient(180deg, #031C5B 0%, #0B1727 50%, #031C5B 100%)',
                }}
            >
                <div className="flex h-full flex-col p-6">
                    {/* Logo Section */}
                    <div className="mb-10 flex items-center space-x-2">
                        <img src={images.brnLogo} alt="" />
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 space-y-4">
                        {navItems.map((item: NavItem) => {
                            const isActive: boolean = activeItem === item.name;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveItem(item.name)}
                                    className={`relative flex items-center transition-all duration-300 ${
                                        isActive ? 'font-bold' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {/* Highlight background */}
                                    <div
                                        className={`absolute top-0 left-0 h-full w-full transform transition-all duration-300 ${
                                            isActive ? '-translate-x-6 rounded-r-[32px] bg-white' : ''
                                        }`}
                                    ></div>

                                    {/* Icon + Label */}
                                    <div
                                        className={`relative z-10 flex w-full items-center rounded-lg p-3 transition-colors duration-300 ${
                                            isActive ? 'text-gray-800' : 'text-gray-400'
                                        }`}
                                    >
                                        <item.icon className="mr-4 h-6 w-6" />
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Account Section */}
                    <div className="mt-auto border-t border-gray-700 pt-6">
                        <p className="mb-4 text-xs tracking-wider text-gray-400">USER ACCOUNT</p>
                        <div className="mb-6 flex items-center">
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="mr-4 h-12 w-12 rounded-full border-2 border-gray-400 object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">Kwame Williams</h3>
                                <p className="text-sm text-gray-400">CEO SuperBiz</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {userAccountItems.map((item: NavItem) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center text-gray-400 transition-colors duration-200 hover:text-white"
                                >
                                    <div className="relative flex items-center rounded-lg p-2 transition-colors duration-300">
                                        <item.icon className="mr-4 h-6 w-6" />
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
