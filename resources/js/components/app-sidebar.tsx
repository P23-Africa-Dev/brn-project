"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  SquareDashedKanban,
  Headphones,
  Link as LinkIcon,
  LucideIcon,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import images from "@/constants/image";

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

// Define the navigation items with href for Inertia
const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Referrals", icon: LinkIcon, href: "/referrals" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
  { name: "Directory", icon: Users, href: "/directory" },
  { name: "Leads", icon: SquareDashedKanban, href: "/leads" },
];

const userAccountItems: NavItem[] = [
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Help", icon: Headphones, href: "/help" },
];

export default function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const profileImage: string = `${images.man1}`;

  return (
    <div>
      <div
        className="hidden md:block sticky top-0 left-0 w-[64] h-screen text-white rounded-r-[48px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #031C5B 0%, #0B1727 50%, #031C5B 100%)",
        }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 mb-10">
            <span className="text-3xl font-bold bg-white text-[#031C5B] px-3 py-1 rounded-full">
              BR
            </span>
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
                    isActive
                      ? "font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Highlight background */}
                  <div
                    className={`absolute top-0 left-0 w-full h-full transform transition-all duration-300 ${
                      isActive
                        ? "-translate-x-6 bg-white rounded-r-[32px]"
                        : ""
                    }`}
                  ></div>

                  {/* Icon + Label */}
                  <div
                    className={`relative flex items-center z-10 w-full p-3 rounded-lg transition-colors duration-300 ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    <item.icon className="w-6 h-6 mr-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Account Section */}
          <div className="mt-auto pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-4 tracking-wider">
              USER ACCOUNT
            </p>
            <div className="flex items-center mb-6">
              <img
                src={profileImage}
                alt="User Profile"
                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-400"
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
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <div className="relative flex items-center p-2 rounded-lg transition-colors duration-300">
                    <item.icon className="w-6 h-6 mr-4" />
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
