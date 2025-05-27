import React, { useEffect, useState } from 'react';
import { getAvengers } from '../services/avengerService';
import { Avenger } from '../types/avenger';
import AvengerCard from './AvengerCard';
import { ShieldAlert, Loader } from 'lucide-react';

const AvengerList: React.FC = () => {
  const [avengers, setAvengers] = useState<Avenger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvengers = async () => {
      try {
        setLoading(true);
        const data = await getAvengers();
        setAvengers(data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la lista de Avengers. Intentalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvengers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader className="w-10 h-10 text-[#E23636] animate-spin mb-4" />
        <p className="text-gray-600">Assembling the Avengers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-[#E23636] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (avengers.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay Avengers registrados</h3>
        <p className="text-gray-600">Agrega algunos para que aparezcan aquí.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {avengers.map((avenger) => (
        <AvengerCard key={avenger.alias} avenger={avenger} />
      ))}
    </div>
  );
};

export default AvengerList;
