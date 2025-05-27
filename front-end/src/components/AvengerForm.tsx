import React, { useState } from 'react';
import { createAvenger } from '../services/avengerService';
import { AvengerFormData, AvengerFormErrors, Avenger } from '../types/avenger';
import { Shield, Check, X, Loader } from 'lucide-react';

interface AvengerFormProps {
  onAvengerAdded: (avenger: Avenger) => void;
}

const AvengerForm: React.FC<AvengerFormProps> = ({ onAvengerAdded }) => {
  const initialFormData: AvengerFormData = {
    nombre: '',
    alias: '',
    actor: '',
    descripcion: '',
    habilidades: '',
  };

  const [formData, setFormData] = useState<AvengerFormData>(initialFormData);
  const [errors, setErrors] = useState<AvengerFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: AvengerFormErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'Real name is required';
    if (!formData.alias.trim()) newErrors.alias = 'Superhero name is required';
    if (!formData.actor.trim()) newErrors.actor = 'Actor name is required';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'Description is required';
    if (!formData.habilidades.trim()) newErrors.habilidades = 'At least one ability is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof AvengerFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      // No procesamos habilidades acá: ya lo hace el avengerService
      const createdAvenger = await createAvenger(formData);
      onAvengerAdded(createdAvenger);

      setFormData(initialFormData);
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#E23636] text-white px-4 py-3 flex items-center">
        <Shield className="mr-2 h-5 w-5" />
        <h3 className="text-xl font-bold">Add New Avenger</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Real Name
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.nombre
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
              Superhero Name
            </label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.alias
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.alias && <p className="mt-1 text-sm text-red-600">{errors.alias}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="actor" className="block text-sm font-medium text-gray-700 mb-1">
            Portrayed By
          </label>
          <input
            type="text"
            id="actor"
            name="actor"
            value={formData.actor}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.actor
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.actor && <p className="mt-1 text-sm text-red-600">{errors.actor}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.descripcion
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="habilidades" className="block text-sm font-medium text-gray-700 mb-1">
            Abilities (separate with commas)
          </label>
          <input
            type="text"
            id="habilidades"
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
            placeholder="Super strength, Flight, Intelligence..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.habilidades
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.habilidades && (
            <p className="mt-1 text-sm text-red-600">{errors.habilidades}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#202020] hover:bg-[#111111]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              'Add Avenger'
            )}
          </button>

          {formStatus === 'success' && (
            <div className="flex items-center text-green-600">
              <Check className="mr-1 h-4 w-4" />
              <span className="text-sm">Avenger added successfully!</span>
            </div>
          )}

          {formStatus === 'error' && (
            <div className="flex items-center text-red-600">
              <X className="mr-1 h-4 w-4" />
              <span className="text-sm">Failed to add Avenger</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AvengerForm;
