// resources/js/components/ui/sidebar/AppSidebar.tsx
import images from '@/constants/image';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion'; // install if not already
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
type MobileNavItem = { name: string; icon: string; activeIcon: string; href: string };

const NAV_ITEMS: NavItem[] = [
    { name: 'Dashboard', icon: images.dashboardIcon, href: '/dashboard' },
    { name: 'Referrals', icon: images.repeatIcon, href: '/referrals' },
    { name: 'Messages', icon: images.messageIcon, href: '/messages' },
    { name: 'Directory', icon: images.directoryIcon, href: '/directory' },
    { name: 'Leads', icon: images.LeadsIcon, href: '/leads' },
];
const MOBILE_NAV_ITEMS: MobileNavItem[] = [
    { name: 'Dashboard', icon: images.dashboardIcon, activeIcon: images.dashboardIcon, href: '/dashboard' },
    { name: 'Messages', icon: images.bubbleChat, activeIcon: images.bubbleChat, href: '/messages' },
    { name: 'Referrals', icon: images.repeatmobileIcon, activeIcon: images.repeatIcon, href: '/referrals' },
    { name: 'Directory', icon: images.searchList, activeIcon: images.searchList, href: '/directory' },
    { name: 'Leads', icon: images.shareKnowledgemobile, activeIcon: images.shareKnowledgemobile, href: '/leads' },
];

const userAccountItems: NavItem[] = [
    { name: 'Settings', icon: `${images.accountSettingsIcon}`, href: '/settings' },
    { name: 'Help', icon: `${images.profileIcon}`, href: '/help' },
];
export const AppSidebar: React.FC = () => {
    const { auth } = usePage<PageProps>().props;
    const { open, setOpen } = useSidebar();
    const [activePath, setActivePath] = useState<string>('');
    const [profileOpen, setProfileOpen] = useState(false); // 👈 toggle state

    const profileRef = useRef<HTMLDivElement>(null); // 👈 ref for dropdown

    // 👉 Detect outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false); // close if clicked outside
            }
        }

        if (profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileOpen]);

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
        <div className="">
            {/* Desktop Navigation */}
            <aside
                // style={{
                //     backgroundImage: `url(${images.sideBarBG})`,
                // }}
                // className={`sticky top-0 left-0 z-0 hidden h-screen overflow-hidden bg-cover bg-center transition-all duration-400 select-none lg:block ${open ? 'w-56' : 'w-20'} text-white`}
                className={`sticky top-0 left-0 z-[2] hidden h-screen overflow-hidden transition-all duration-400 outline-none select-none lg:block ${open ? 'w-56' : 'w-20 overflow-x-hidden'} bg-gradient-to-b from-[#031C5B] via-[#0B1727] to-[#031C5B] text-white`}
                aria-expanded={open}
                // 👉 expand on hover, collapse on leave
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <div className="flex h-full flex-col justify-between">
                    {/* Logo */}
                    <div className="mb-18 px-5 pt-14">
                        {/* <div className="mb-20 px-4 pt-14"> */}
                        <div className="flex items-center gap-2">
                            <img src={images.brnLogo} alt="logo" />
                        </div>
                    </div>

                    {/* NAV */}
                    <nav className="px-5 pb-10">
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = activeName === item.name;
                                return (
                                    <li key={item.name} className="relative">
                                        <Link
                                            href={item.href}
                                            onClick={() => setActivePath(item.href)}
                                            className={`relative z-[1] flex cursor-pointer items-center transition-all duration-300 ${
                                                // className={`relative flex z-0 !overflow-x-hidden  cursor-pointer items-center transition-all duration-300 ${
                                                isActive ? 'font-bold' : 'text-gray-400 hover:text-white'
                                            }`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {/* Highlight background */}
                                            <div
                                                className={`absolute top-0 left-0 z-0 h-full w-[250px] transform bg-cover bg-center bg-no-repeat transition-all duration-300 ${
                                                    isActive ? `active-link-bg -translate-x-3 rounded-l-full` : ''
                                                }`}
                                            ></div>

                                            {isActive && (
                                                <img
                                                    src={images.TopactivesmallBG}
                                                    alt="active pattern"
                                                    className={`absolute z-[2] w-full transition-all duration-300 backface-hidden ${open ? '-top-[71px] left-[1680px] -z-[5] h-20' : '-top-[40px] left-[40px] z-0 h-[50px] w-full delay-200'} `}
                                                />
                                            )}
                                            {isActive && (
                                                <img
                                                    src={images.BottomactivesmallBG}
                                                    alt="active pattern"
                                                    className={`absolute z-[2] w-full transition-all duration-300 backface-hidden ${open ? 'top-[71px] left-[1680px] -z-[5] h-20' : '-bottom-[44px] left-[40px] z-0 h-[50px] w-full delay-200'} `}
                                                />
                                            )}
                                            {/* {isActive && (
                                                <img
                                                    src={images.activetopBG}
                                                    alt="active pattern"
                                                    className={`absolute z-[2]  transform transition-all duration-300 ${open ? 'hidden' : 'left-[45px] block h-[130px] w-[200px] '} `}
                                                />
                                            )} */}

                                            {isActive && (
                                                <img
                                                    src={images.topActiveBg}
                                                    alt="active pattern"
                                                    className="absolute -top-[71px] left-[160px] h-20 w-auto transform"
                                                />
                                            )}
                                            {isActive && (
                                                <img
                                                    src={images.BottomActiveBg}
                                                    alt="active pattern"
                                                    className="absolute -bottom-[70px] left-[172px] h-20 w-auto transform"
                                                />
                                            )}

                                            {/* Icon + Label */}
                                            <div
                                                className={`relative flex w-full items-center rounded-lg py-2 transition-colors duration-300 ${
                                                    isActive
                                                        ? 'py-2.5 font-bold text-deepBlack hover:text-deepBlack/80'
                                                        : 'font-light text-white hover:text-white/80'
                                                }`}
                                            >
                                                <div
                                                    className={`mr-3 flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-full ${
                                                        isActive ? 'bg-[#0B1727] text-center text-white' : 'bg-[#263D5C8F]'
                                                    }`}
                                                >
                                                    <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
                                                </div>

                                                <span
                                                    className={`overflow-hidden whitespace-nowrap transition-all duration-400 ${
                                                        open ? 'ml-1.5 max-w-[120px] opacity-100' : 'ml-0 max-w-0 opacity-0'
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

                    {/* User Account Section */}
                    {/* User Account Section */}
                    <div className="relative mt-5 px-5">
                        <p
                            className={`mb-2 text-xs tracking-wider text-gray-400 transition-all duration-400 ${open ? 'max-w-[150px] opacity-60' : 'max-w-0 opacity-0'} overflow-hidden`}
                        >
                            USER ACCOUNT
                        </p>

                        {/* User Profile Trigger */}
                        <div onClick={() => setProfileOpen(!profileOpen)} className="mb-4 flex cursor-pointer items-center space-x-2">
                            <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#D6E264] p-2">
                                <img
                                    src={getProfilePicture()}
                                    alt={`${auth.user.name}'s Profile`}
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = profileImage;
                                    }}
                                />
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-400 ${open ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}
                            >
                                <h3 className="truncate text-[12px] font-semibold">{auth.user.name}</h3>
                                <p className="truncate text-[11px] font-light text-white/75">
                                    {auth.user.position && auth.user.company_name
                                        ? `${auth.user.position} at ${auth.user.company_name}`
                                        : auth.user.position || auth.user.company_name || ''}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1 pl-2">
                            {userAccountItems.map((item: NavItem) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center pb-2.5 font-light text-white transition-colors duration-200 hover:text-white/80"
                                >
                                    <div className="relative flex items-center rounded-lg transition-colors duration-400">
                                        <img src={item.icon} className="mr-5" alt="" />
                                        <span
                                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                                open ? 'ml-2 max-w-[120px] opacity-100' : 'ml-0 max-w-0 opacity-0'
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* MObile Bottom Navigation */}
            <div className="fixed bottom-0 z-20 w-full overflow-hidden bg-transparent lg:hidden">
                <div className="relative z-0 w-full">
                    <div
                        style={{
                            backgroundImage: `url(${images.curveMobilePattern})`,
                        }}
                        className="aboslute top-0 left-0 z-20 h-[160px] overflow-hidden bg-cover bg-top bg-no-repeat"
                    >
                        {/* <div className="fixed bottom-4 w-full px-8">
                            <div className="flex items-center justify-between">
                                {MOBILE_NAV_ITEMS.map((item, index) => {
                                    const isActive = activeName === item.name;

                                    const isMiddle = index === 2;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setActivePath(item.href)}
                                            className={`flex items-center justify-center rounded-full transition-all duration-300 ${isMiddle ? '-mt-10 h-20 w-20' : 'h-14 w-14'} ${isActive ? 'bg-[#27E6A7]' : 'bg-transparent'} `}
                                            aria-current={isActive ? 'page' : undefined}
                                            style={{
                                                boxShadow: isActive ? 'inset 0 4px 6px rgba(0,0,0,0.3)' : 'none',
                                            }}
                                        >
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                className={`object-contain transition-all ${isMiddle ? 'h-10 w-10' : 'h-8 w-8'} `}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div> */}

                        <div className="fixed bottom-4 w-full px-8">
                            <div className="flex items-center justify-between">
                                {MOBILE_NAV_ITEMS.map((item, index) => {
                                    const isActive = activeName === item.name;
                                    const isMiddle = index === 2;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setActivePath(item.href)}
                                            className={`flex items-center justify-center rounded-full transition-all duration-300 ${isMiddle ? '-mt-10 h-20 w-20 border bg-secondaryWhite shadow-[inset_0_4px_6px_rgba(0,0,0,0.5)]' : 'h-14 w-14'} ${isActive ? 'bg-[#27E6A7] shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]' : ''} `}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            <img
                                                src={isActive ? item.activeIcon : item.icon}
                                                alt={item.name}
                                                className={`object-contain transition-all ${isMiddle ? 'h-10 w-10' : 'h-8 w-8'} `}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-in Profile Showcase */}
            {/* Profile Dropdown */}
            <AnimatePresence>
                {profileOpen && (
                    <motion.div
                        ref={profileRef}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setProfileOpen(false)}
                        className="absolute bottom-16 left-50 z-[10] w-56 rounded-xl bg-[#0B1727] p-4 text-sm shadow-xl"
                    >
                        <div className="absolute left-[-8px] top-[50%] h-4 w-4 rotate-45 bg-[#0B1727]"></div>
                        <div className="mb-3 flex items-center space-x-3 border-b border-white/20 pb-3">
                            <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#D6E264] p-2">
                                <img
                                    src={getProfilePicture()}
                                    alt={`${auth.user.name}'s Profile`}
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = profileImage;
                                    }}
                                />
                            </div>

                            <div>
                                <h4 className="text-[13px] font-semibold text-white">{auth.user.name}</h4>
                                <p className="text-[11px] text-gray-300">{auth.user.position || 'Member'}</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-white/80">
                            <Link href="/profile" className="flex items-center gap-2 hover:text-white">
                                <span>👤</span> Personal Profile
                            </Link>
                            <Link href="/company" className="flex items-center gap-2 hover:text-white">
                                <span>🏢</span> Company Profile
                            </Link>
                            <Link href="/settings" className="flex items-center gap-2 hover:text-white">
                                <span>⚙️</span> General Settings
                            </Link>
                            <hr className="my-2 border-white/20" />
                            <Link href="/logout" className="flex items-center gap-2 text-red-400 hover:text-red-500">
                                <span>🚪</span> Logout
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
