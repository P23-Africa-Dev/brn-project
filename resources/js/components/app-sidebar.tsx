// resources/js/components/ui/sidebar/AppSidebar.tsx
import images from '@/constants/image';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSidebar } from './sidebar-context';

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


type NavItem = { name: string; icon: string; href: string };

const NAV_ITEMS: NavItem[] = [
    { name: 'Dashboard', icon: images.dashboardIcon, href: '/dashboard' },
    { name: 'Referrals', icon: images.repeatIcon, href: '/referrals' },
    { name: 'Messages', icon: images.messageIcon, href: '/chats' },
    { name: 'Directory', icon: images.directoryIcon, href: '/directory' },
    { name: 'Leads', icon: images.LeadsIcon, href: '/leads' },
];

const userAccountItems: NavItem[] = [
    { name: 'Settings', icon: `${images.accountSettingsIcon}`, href: '/settings' },
    { name: 'Help', icon: `${images.profileIcon}`, href: '/help' },
];
export const AppSidebar: React.FC = () => {
    const { auth } = usePage<PageProps>().props;
    const { open, setOpen } = useSidebar();
    const [activePath, setActivePath] = useState<string>('');

    const profileImage: string = `${images.man6}`;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setActivePath(window.location.pathname);
        }
    }, [usePage]); // run on mount & when page changes

    // derive active item name from path
    const activeName = useMemo(() => {
        const match = NAV_ITEMS.find((n) => activePath.startsWith(n.href));
        return match?.name ?? 'Dashboard';
    }, [activePath]);

    // 👉 On mount: open sidebar, then collapse after 3s
    useEffect(() => {
        setOpen(true); // expanded first
        const timer = setTimeout(() => {
            setOpen(false); // auto-collapse
        }, 4000);
        return () => clearTimeout(timer);
    }, [setOpen]);

    // Add this function to clean the URL
    const getProfilePicture = () => {
        if (!auth.user?.profile_picture) return profileImage;
        return auth.user.profile_picture.startsWith('http') ? auth.user.profile_picture : `${window.location.origin}${auth.user.profile_picture}`;
    };

    useEffect(() => {
        console.log('Profile picture URL:', auth.user.profile_picture);
    }, [auth.user.profile_picture]);

    return (
        <aside
            className={`sticky top-0 left-0 z-0 h-screen transition-all duration-300 select-none ${open ? 'w-56' : 'w-20'} bg-gradient-to-b from-[#031C5B] via-[#0B1727] to-[#031C5B] text-white`}
            aria-expanded={open}
            // 👉 expand on hover, collapse on leave
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="flex h-full flex-col justify-between overflow-visible">
                {/* Logo */}
                <div className="mb-18 px-4 pt-14">
                    {/* <div className="mb-20 px-4 pt-14"> */}
                    <div className="flex items-center gap-2">
                        <img src={images.brnLogo} alt="logo" />
                    </div>
                </div>

                {/* NAV */}
                <nav className=" px-4 pb-10 ">
                    <ul className="space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeName === item.name;
                            return (
                                <li key={item.name} className="relative">
                                    <Link
                                        href={item.href}
                                        onClick={() => setActivePath(item.href)}
                                        className={`relative  flex cursor-pointer items-center transition-all duration-300 ${
                                            isActive ? 'font-bold' : 'text-gray-400 hover:text-white'
                                        }`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        {/* Active background image pattern */}
                                        {/* 👉 Curved background */}
                                        {isActive && (
                                            <div className="">
                                                {/* <svg
                                                    className="absolute top-0 left-0 h-full w-8 translate-x-[175px]"
                                                    viewBox="0 0 24 100"
                                                    preserveAspectRatio="none"
                                                >
                                                   
                                                    <path d="M24 0 C-10 25 -10 75 24 100 L0 100 L0 0 Z" fill="#0B1727" />
                                                 
                                                    <path d="M24 0 C-5 25 -5 75 24 100" stroke="#fff" strokeWidth="0" fill="none" />
                                                </svg> */}
{/* 
                                                <svg
                                                className="absolute top-0 left-0 h-full w-24 translate-x-[175px]" 
                                                viewBox="0 0 60 100"
                                                preserveAspectRatio="none"
                                                >
                                                <path
                                                    d="M60 0 
                                                    A30 30 0 0 0 30 30 
                                                    L60 30 Z"
                                                    fill="#0B1727"
                                                />

                                                <path
                                                    d="M60 100 
                                                    A30 30 0 0 1 30 70 
                                                    L60 70 Z"
                                                    fill="#0B1727"
                                                />
                                                </svg> */}

                                            </div>
                                        )}

                                        {/* Highlight background */}
                                        <div
                                            className={`absolute top-0 z-0  left-0 h-full w-[600px] transform transition-all duration-300 ${
                                                isActive ? '-translate-x-3 rounded-l-full rounded-r-2xl bg-white' : ''
                                            }`}
                                        ></div>

                                        {/* Icon + Label */}
                                        <div
                                            className={`relative flex w-full items-center rounded-lg py-2 transition-colors duration-300 ${
                                                isActive ? 'py-2.5 font-bold text-deepBlack' : 'font-light text-white'
                                            }`}
                                        >
                                            <div
                                                className={`mr-3 flex items-center justify-center rounded-full p-2 ${
                                                    isActive ? 'bg-[#0B1727] text-center text-white' : 'bg-[#263D5C8F]'
                                                }`}
                                            >
                                                <img src={item.icon} alt="" />
                                            </div>
                                            <span
                                                className={`overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 ${
                                                    open ? 'w-auto opacity-100' : 'w-0 opacity-0'
                                                }`}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom: user */}
                {/* <div className="px-4 pb-6">
                    <div className={`mb-3 flex items-center gap-3 ${open ? '' : 'justify-center'}`}>
                        <div className="relative h-10 w-10 rounded-full bg-[#D6E264] p-1">
                            <img
                                src={auth.user?.profile_picture ? auth.user.profile_picture : images.man1}
                                alt={auth.user?.name ?? 'User'}
                                className="h-full w-full rounded-full object-cover"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = images.man1;
                                }}
                            />
                        </div>
                        {open && (
                            <div className="min-w-0">
                                <div className="text-sm leading-tight font-semibold">{auth.user?.name}</div>
                                <div className="text-xs text-gray-300">{auth.user?.position ?? auth.user?.company_name ?? ''}</div>
                            </div>
                        )}
                    </div>
                </div> */}
                {/* User Account Section */}
                <div className="mt-5 px-4">
                    {/* <div className="mt-10 px-4 pb-10"> */}
                    <p className={`mb-2 text-xs tracking-wider text-gray-400 ${open ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>USER ACCOUNT</p>

                    {/* User Profile  */}
                    <div className="mb-4 flex items-center space-x-1.5">
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

                        <div className={`w-auto transition-all duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-[12px] font-semibold">{auth.user.name}</h3>
                            <p className="text-[11px] font-light text-white/75">
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
                                className="flex items-center pb-2.5 font-light text-white transition-colors duration-200 hover:text-white/70"
                            >
                                <div className="relative flex items-center rounded-lg transition-colors duration-300">
                                    <img src={item.icon} className="mr-5" alt="" />
                                    <span className={`text-sm transition-all duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};
