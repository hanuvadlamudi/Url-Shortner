import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import UserUrls from './UserUrls';

function Dashboard() {
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const name = useSelector((state) => state.auth.user?.name || "User");

  const handleDataFetched = (urlsCount, clicksCount) => {
    setTotalUrls(urlsCount);
    setTotalClicks(clicksCount);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader name={name} totalUrls={totalUrls} totalClicks={totalClicks} />
      
      <main className="container mx-auto py-8 px-6">
        <UserUrls onDataFetched={handleDataFetched} />
      </main>
    </div>
  );
}

export default Dashboard;
