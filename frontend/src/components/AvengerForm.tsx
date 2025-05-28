import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createAvenger } from '../services/api';
import { Avenger, AvengerFormData } from '../types';

interface AvengerFormProps {
  onAvengerAdded: (avenger: Avenger) => void;
  onCancel: () => void;
}

const AvengerForm: React.FC<AvengerFormProps> = ({ onAvengerAdded, onCancel }) => {
  const [formData, setFormData] = useState<AvengerFormData>({
    nombre: '',
    alias: '',
    actor: '',
    descripcion: '',
    habilidades: [''],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHabilidadChange = (index: number, value: string) => {
    const updatedHabilidades = [...formData.habilidades];
    updatedHabilidades[index] = value;
    setFormData({ ...formData, habilidades: updatedHabilidades });
  };

  const addHabilidadField = () => {
    setFormData({ ...formData, habilidades: [...formData.habilidades, ''] });
  };

  const removeHabilidadField = (index: number) => {
    const updatedHabilidades = formData.habilidades.filter((_, i) => i !== index);
    setFormData({ ...formData, habilidades: updatedHabilidades });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!formData.nombre || !formData.alias || !formData.actor || !formData.descripcion) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validate habilidades
    const validHabilidades = formData.habilidades.filter(hab => hab.trim() !== '');
    if (validHabilidades.length === 0) {
      setError('Por favor, agrega al menos una habilidad.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      // Only submit valid habilidades
      const dataToSubmit = {
        ...formData,
        habilidades: validHabilidades,
      };
      
      const newAvenger = await createAvenger(dataToSubmit);
      onAvengerAdded(newAvenger);
    } catch (err) {
      setError('Error al crear el avenger. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4\" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Real <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
              Alias / Nombre de Superhéroe <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="actor" className="block text-sm font-medium text-gray-700 mb-1">
            Actor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="actor"
            name="actor"
            value={formData.actor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Habilidades <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addHabilidadField}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar habilidad
            </button>
          </div>
          
          {formData.habilidades.map((habilidad, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={habilidad}
                onChange={(e) => handleHabilidadChange(index, e.target.value)}
                placeholder="Ej: Super fuerza, Volar, Inteligencia..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.habilidades.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHabilidadField(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : (
              'Guardar Avenger'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvengerForm;