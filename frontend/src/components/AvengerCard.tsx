import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avenger } from '../types';

interface AvengerCardProps {
  avenger: Avenger;
}

const AvengerCard: React.FC<AvengerCardProps> = ({ avenger }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to get random heroic background color
  const getHeroicColor = (id: number) => {
    const colors = [
      'from-blue-600 to-blue-800',
      'from-red-600 to-red-800',
      'from-purple-600 to-purple-800',
      'from-green-600 to-green-800',
      'from-yellow-600 to-yellow-800',
    ];
    return colors[id % colors.length];
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className={`bg-gradient-to-r ${getHeroicColor(avenger.id)} text-white p-4`}>
        <h3 className="text-xl font-bold">{avenger.alias}</h3>
        <p className="text-sm opacity-90">{avenger.nombre}</p>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Actor: </span>
          {avenger.actor}
        </p>
        
        <div className="mt-3 mb-2">
          <h4 className="font-semibold text-gray-800">Habilidades:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {avenger.habilidades.map((habilidad) => (
              <span 
                key={habilidad.id}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {habilidad.habilidad}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={toggleExpanded}
            className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
          >
            {expanded ? (
              <>
                <span>Menos detalles</span>
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>Más detalles</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
          
          {expanded && (
            <div className="mt-3 text-gray-700 text-sm animate-fadeIn">
              <p>{avenger.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvengerCard;