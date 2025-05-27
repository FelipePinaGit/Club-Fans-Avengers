import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#202020] text-white py-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-8 w-8 text-[#E23636] mr-3" />
            <h1 className="text-2xl font-bold">Avengers Fan Club</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-300 italic">
              "Earth's Mightiest Heroes"
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;