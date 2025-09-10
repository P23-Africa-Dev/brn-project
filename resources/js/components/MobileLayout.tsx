import React, { useState } from 'react';

// Main App component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('smart-matches');

  // Dummy data for the deal list
  const deals = [
    {
      id: 1,
      name: 'Thabo Molefe',
      location: 'Johannesburg, South Africa',
      title: 'CFO',
      rating: 4.6,
      industry: 'Industry',
      industryDetail: 'Renewable Energy',
      imageUrl: 'https://placehold.co/100x100/A3A3B1/ffffff?text=TM',
    },
    {
      id: 2,
      name: 'Thabo Molefe',
      location: 'Johannesburg, South Africa',
      title: 'CFO',
      rating: 4.6,
      industry: 'Industry',
      industryDetail: 'Renewable Energy',
      imageUrl: 'https://placehold.co/100x100/A3A3B1/ffffff?text=TM',
    },
    {
      id: 3,
      name: 'Jane Doe',
      location: 'Pretoria, South Africa',
      title: 'CEO',
      rating: 4.8,
      industry: 'Industry',
      industryDetail: 'Tech',
      imageUrl: 'https://placehold.co/100x100/A3A3B1/ffffff?text=JD',
    },
  ];

  // Dummy data for the chart
  const chartData = [
    { day: 'Mon', value: 36, label: '36%' },
    { day: 'Tue', value: 75, label: '75%' },
    { day: 'Wed', value: 44, label: '44%' },
    { day: 'Thu', value: 67, label: '67%' },
    { day: 'Fri', value: 87, label: '87%' },
    { day: 'Sat', value: 89, label: '89%' },
    { day: 'Sun', value: 95, label: '95%' },
  ];

  // Reusable component for the bar chart
  const BarChart = () => (
    <div className="flex justify-between items-end h-[150px] space-x-2 p-4">
      {chartData.map((data) => (
        <div key={data.day} className="flex flex-col items-center justify-end h-full">
          <span className="text-xs mb-1 font-semibold text-gray-700">{data.label}</span>
          <div
            className="w-8 rounded-full bg-[#394d6c] transition-all duration-300 ease-in-out"
            style={{ height: `${data.value}%` }}
          ></div>
          <span className="text-sm mt-2 text-gray-500 font-semibold">{data.day}</span>
        </div>
      ))}
    </div>
  );

  // Reusable component for a deal card
  const DealCard: React.FC<{ deal: typeof deals[0] }> = ({ deal }) => (
    <div className="bg-[#121820] rounded-xl p-4 flex items-center justify-between space-x-4 mb-4 shadow-lg border border-[#202730]">
      <div className="flex items-center space-x-4">
        <img
          src={deal.imageUrl}
          alt={deal.name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-bold">{deal.name}</h3>
          <p className="text-[#a4a4b2] text-sm">{deal.location}</p>
          <div className="text-[#6c6c77] text-xs mt-1">{deal.title}</div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-1">
          <span className="text-white font-bold">{deal.rating}</span>
          <span className="text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <div className="text-right text-[#6d6d78] text-xs">{deal.industry}</div>
        <div className="text-right text-[#a4a4b2] text-xs font-semibold">{deal.industryDetail}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#121820] text-gray-200 min-h-screen font-sans flex flex-col items-center pb-24">
      {/* Top Header Section */}
      <div className="relative w-full p-6 text-white bg-[#121820] rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hello, Kwame!</h1>
            <p className="text-[#9ea3ae] text-sm">Good morning!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#1e2531] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.28V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.444 6 11v3.28c0 .318-.112.635-.305.925L4 17h5m5 0a4 4 0 01-4 4H9a4 4 0 01-4-4m5 0v1a1 1 0 001 1h2a1 1 0 001-1v-1m-4-2h4"
                />
              </svg>
            </div>
            <img
              src="https://placehold.co/100x100/A3A3B1/ffffff?text=K"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#5f5f71]"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm px-4 -mt-10 space-y-6">
        {/* Network Stats Card */}
        <div className="bg-[#121820] rounded-3xl p-6 shadow-xl border border-[#202730]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[#6c6c77]">Network Stats</h2>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#222934]"
                  src="https://placehold.co/100x100/A3A3B1/ffffff?text=1"
                  alt=""
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#222934]"
                  src="https://placehold.co/100x100/A3A3B1/ffffff?text=2"
                  alt=""
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#222934]"
                  src="https://placehold.co/100x100/A3A3B1/ffffff?text=3"
                  alt=""
                />
              </div>
              <p className="text-xs font-semibold text-white">
                <span className="text-green-400">200k+</span> People
              </p>
              <button className="bg-[#a398fe] text-[#222934] font-semibold text-xs px-3 py-1 rounded-full">
                Active Members
              </button>
            </div>
          </div>
          <div className="flex justify-around items-center space-x-4 text-center">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#202730] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a398fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 8.5l-1.5 1.5L9 11.5l1.5-1.5L12 11.5l-1.5-1.5L10.5 8.5l-1.72-2.88a1 1 0 00-.948-.684H5a2 2 0 00-2 2v10a2 2 0 002 2h3.28c.39 0 .76-.176 1-.48l2.8-3.4c.18-.21.4-.3.62-.3h1.8c.28 0 .54.12.72.33l2.8 3.4c.24.29.56.47.9.47H19a2 2 0 002-2V7a2 2 0 00-2-2h-3.28a1 1 0 00-.948.684L10.5 8.5l-1.5-1.5L9 11.5l-1.5-1.5L10.5 8.5l-1.72-2.88a1 1 0 00-.948-.684H5a2 2 0 00-2 2v10a2 2 0 002 2h3.28c.39 0 .76-.176 1-.48l2.8-3.4c.18-.21.4-.3.62-.3h1.8c.28 0 .54.12.72.33l2.8 3.4c.24.29.56.47.9.47H19a2 2 0 002-2V7a2 2 0 00-2-2h-3.28c-.39 0-.76.176-1 .48l-2.8 3.4c-.18.21-.4.3-.62.3h-1.8c-.28 0-.54-.12-.72-.33l-2.8-3.4c-.24-.29-.56-.47-.9-.47H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-4xl font-bold text-white">45K</span>
              </div>
              <p className="text-sm text-[#a4a4b2]">Leads</p>
            </div>
            <div className="w-px h-16 bg-[#202730]"></div>
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#202730] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a398fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-2.053 2.053a4.5 4.5 0 01-6.364-6.364l1.414-1.414a1 1 0 00-.707-1.707L8.7 7.7a6.5 6.5 0 000-9.192l-1.414 1.414a4.5 4.5 0 010 6.364l2.053 2.053a4.5 4.5 0 01-1.242 7.244m-6.364-6.364l-1.414 1.414a6.5 6.5 0 000 9.192l1.414-1.414a4.5 4.5 0 016.364-6.364l-1.414-1.414a1 1 0 00-1.707.707l-2.053-2.053a4.5 4.5 0 017.244-1.242" />
                  </svg>
                </div>
                <span className="text-4xl font-bold text-white">75K</span>
              </div>
              <p className="text-sm text-[#a4a4b2]">Connections</p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-[#1e2531] rounded-3xl p-6 shadow-xl border border-[#202730]">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center space-x-2 text-white bg-[#2e3745] px-4 py-2 rounded-full">
              <span className="text-sm">More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-2 text-white bg-[#2e3745] px-4 py-2 rounded-full">
              <span className="text-sm">7 days</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 font-semibold pr-2 -ml-2">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            {/* Chart grid lines */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute w-full border-t border-gray-400" style={{ top: '0%' }}></div>
              <div className="absolute w-full border-t border-gray-400" style={{ top: '25%' }}></div>
              <div className="absolute w-full border-t border-gray-400" style={{ top: '50%' }}></div>
              <div className="absolute w-full border-t border-gray-400" style={{ top: '75%' }}></div>
              <div className="absolute w-full border-t border-gray-400" style={{ bottom: '0%' }}></div>
            </div>
            <BarChart />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center bg-[#1e2531] rounded-full p-1 border border-[#202730]">
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex-1 text-center py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'connections' ? 'bg-[#a398fe] text-[#222934]' : 'text-white'
            }`}
          >
            Connections
          </button>
          <button
            onClick={() => setActiveTab('smart-matches')}
            className={`flex-1 text-center py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'smart-matches' ? 'bg-[#a398fe] text-[#222934]' : 'text-white'
            }`}
          >
            Smart matches
          </button>
          <button
            onClick={() => setActiveTab('active-leads')}
            className={`flex-1 text-center py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'active-leads' ? 'bg-[#a398fe] text-[#222934]' : 'text-white'
            }`}
          >
            Active Leads
          </button>
        </div>

        {/* Deals Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Let's find your next deal!</h2>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
          </div>
          <div className="flex items-center bg-[#1e2531] rounded-full p-2 border border-[#202730]">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-white text-sm pl-4"
            />
            <button className="p-2 rounded-full bg-[#394d6c]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div>
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full max-w-sm p-4 bg-transparent">
        <div className="relative flex justify-around items-center h-20 bg-[#1e2531] rounded-3xl border border-[#202730]">
          <div className="w-16 h-16 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#394d6c] flex items-center justify-center border-4 border-[#121820] shadow-2xl z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="flex items-center justify-between w-full h-full px-8 pt-4">
            <div className="flex items-center space-x-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="w-16"></div>
            <div className="flex items-center space-x-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
