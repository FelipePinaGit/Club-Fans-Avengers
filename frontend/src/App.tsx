import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import AvengersList from './components/AvengersList';
import AvengerForm from './components/AvengerForm';
import { fetchAvengers } from './services/api';
import { Avenger } from './types';

function App() {
  const [avengers, setAvengers] = useState<Avenger[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const getAvengers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAvengers();
        setAvengers(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los avengers. Por favor, intenta de nuevo.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAvengers();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  const handleAvengerAdded = (newAvenger: Avenger) => {
    setAvengers([...avengers, newAvenger]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FanClub Avengers</h1>
          </div>
          <button
            onClick={toggleForm}
            className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 text-white px-4 py-2 rounded-md font-medium flex items-center"
          >
            {showForm ? 'Cancelar' : 'Nuevo Avenger'}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6\" role="alert">
            <p>{error}</p>
          </div>
        )}

        {showForm ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Crear Nuevo Avenger</h2>
            <AvengerForm onAvengerAdded={handleAvengerAdded} onCancel={() => setShowForm(false)} />
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Nuestros Héroes</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <AvengersList avengers={avengers} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Avengers Database | Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;