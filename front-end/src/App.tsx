import React, { useState } from 'react';
import Header from './components/Header';
import AvengerList from './components/AvengerList';
import AvengerForm from './components/AvengerForm';
import { Avenger } from './types/avenger';

function App() {
  const [avengers, setAvengers] = useState<Avenger[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Handler for when a new avenger is added
  const handleAvengerAdded = (newAvenger: Avenger) => {
    // Update local state if we're managing it here
    setAvengers(prev => [...prev, newAvenger]);
    
    // Force a refresh of the avenger list to fetch from API
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AvengerForm onAvengerAdded={handleAvengerAdded} />
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-[#202020] border-b-2 border-[#E23636] pb-2">
          Avengers Roster
        </h2>
        
        <AvengerList key={refreshKey} />
      </main>
      
      <footer className="bg-[#202020] text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Avengers Fan Club</p>
        </div>
      </footer>
    </div>
  );
}

export default App;