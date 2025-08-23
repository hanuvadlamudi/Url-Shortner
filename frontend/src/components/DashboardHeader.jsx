import React, { useState, useEffect } from 'react';

const DashboardHeader = ({ 
  name = "User", 
  totalUrls = 0, 
  totalClicks = 0 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [navbarHeight] = useState(76); // Height of existing navbar

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboardSticky = scrollY >= navbarHeight;

  // Hide existing navbar when dashboard becomes sticky
  useEffect(() => {
    const navbar = document.querySelector('header');
    if (navbar) {
      if (isDashboardSticky) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease-in-out';
      } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease-in-out';
      }
    }
  }, [isDashboardSticky]);

  return (
    <>
      {/* Spacer to push DashboardHeader below the fixed navbar */}
      {!isDashboardSticky && <div className="h-20"></div>}
      
      <div 
        className={`w-full transition-all duration-300 ${
          isDashboardSticky ? 'fixed top-0 z-50' : 'relative z-10'
        }`}
      >
        {/* Dashboard Header Section */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 text-white px-6 py-3 shadow-lg">
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
            {/* Welcome Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Welcome back, {name}
                </h1>
                <p className="text-gray-300 text-sm mt-1">
                  Here's your dashboard overview
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex items-center space-x-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[120px]">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {totalUrls.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-300 font-medium mt-1">
                    Total URLs
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[120px]">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {totalClicks.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-300 font-medium mt-1">
                    Total Clicks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;