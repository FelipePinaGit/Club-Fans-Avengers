import React, { useState } from "react";
import { AvengerFormData, AvengerFormErrors } from "../types/avenger";
import { createAvenger } from "../services/avengerService";

const initialFormData: AvengerFormData = {
  nombre: "",
  alias: "",
  actor: "",
  descripcion: "",
  habilidades: "",
};

const AvengerForm: React.FC = () => {
  const [formData, setFormData] = useState<AvengerFormData>(initialFormData);
  const [errors, setErrors] = useState<AvengerFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: AvengerFormErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es obligatorio";
    if (!formData.alias.trim()) newErrors.alias = "Alias es obligatorio";
    if (!formData.actor.trim()) newErrors.actor = "Actor es obligatorio";
    if (!formData.descripcion.trim()) newErrors.descripcion = "Descripción es obligatoria";
    if (!formData.habilidades.trim()) newErrors.habilidades = "Habilidades son obligatorias";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Convertimos habilidades string en array, limpiando espacios y descartando vacíos
      const habilidadesArray = formData.habilidades
        .split(",")
        .map(h => h.trim())
        .filter(h => h.length > 0);

      // Enviamos el objeto con habilidades en formato array
      await createAvenger({
        ...formData,
        habilidades: habilidadesArray,
      });
      alert("Avenger creado con éxito!");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      alert("Error al crear el Avenger");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nombre real</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Alias</label>
        <input
          type="text"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.alias ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.alias && <p className="text-red-500 text-sm mt-1">{errors.alias}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Actor</label>
        <input
          type="text"
          name="actor"
          value={formData.actor}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.actor ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.actor && <p className="text-red-500 text-sm mt-1">{errors.actor}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.descripcion ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Habilidades (separadas por coma)</label>
        <input
          type="text"
          name="habilidades"
          value={formData.habilidades}
          onChange={handleChange}
          placeholder="Ej: fuerza, vuelo, telepatía"
          className={`w-full border rounded px-3 py-2 ${errors.habilidades ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.habilidades && <p className="text-red-500 text-sm mt-1">{errors.habilidades}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#E23636] text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Creando..." : "Crear Avenger"}
      </button>
    </form>
  );
};

export default AvengerForm;
