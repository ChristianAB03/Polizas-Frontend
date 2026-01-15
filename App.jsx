import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import NotificationsPage from './pages/Notifications';
import PoliciesPage from './pages/Policies';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'policies':
        return <PoliciesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;