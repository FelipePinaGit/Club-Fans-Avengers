import React from 'react';
import { Avenger } from '../types';
import AvengerCard from './AvengerCard';

interface AvengersListProps {
  avengers: Avenger[];
}

const AvengersList: React.FC<AvengersListProps> = ({ avengers }) => {
  if (avengers.length === 0) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <p className="text-yellow-700">No hay Avengers disponibles. ¡Agrega uno nuevo!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {avengers.map((avenger) => (
        <AvengerCard key={avenger.id} avenger={avenger} />
      ))}
    </div>
  );
};

export default AvengersList;
