"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  Settings,
  User,
  SquareDashedKanban,
  Headphones,
  Link,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  name: string;
  icon: LucideIcon;
}

// Define the navigation items with the NavItem type
const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Referrals', icon: Link },
  { name: 'Messages', icon: MessageSquare },
  { name: 'Directory', icon: Users },
  { name: 'Leads', icon: SquareDashedKanban },
];

const userAccountItems: NavItem[] = [
  { name: 'Settings', icon: Settings },
  { name: 'Help', icon: Headphones },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const profileImage: string = "https://images.unsplash.com/photo-1507003211169-e6955a6d0ad2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
  <div>
       <div
      className="sticky top-0 left-0 w-[64] h-screen text-white rounded-r-[48px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #031C5B 0%, #0B1727 50%, #031C5B 100%)',
      }}
    >
      <div className="flex flex-col h-full p-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 mb-10">
          <span className="text-3xl font-bold bg-white text-[#031C5B] px-3 py-1 rounded-full">BR</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-4">
          {navItems.map((item: NavItem) => {
            const isActive: boolean = activeItem === item.name;
            return (
              <div
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`relative flex items-center cursor-pointer transition-all duration-300 ${
                  isActive ? 'font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute top-0 left-0 w-full h-full transform transition-all duration-300 ${
                  isActive ? '-translate-x-6 bg-white rounded-r-[32px]' : ''
                }`}></div>
                <div className={`relative flex items-center z-10 w-full p-3 rounded-lg transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                  <item.icon className="w-6 h-6 mr-4" />
                  <span>{item.name}</span>
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Account Section */}
        <div className="mt-auto pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-4 tracking-wider">USER ACCOUNT</p>
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
              <div
                key={item.name}
                className="flex items-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
              >
                <div className="relative flex items-center p-2 rounded-lg transition-colors duration-300">
                  <item.icon className="w-6 h-6 mr-4" />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
