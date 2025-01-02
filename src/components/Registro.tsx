import React, { useState } from "react";

interface RegisterProps {
  onRegistroExitoso: () => void; // Define la propiedad que espera el componente
}

const Register: React.FC<RegisterProps> = ({ onRegistroExitoso }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        
      const response = await fetch("http://localhost/BalanceFinPro/registro.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nombre: formData.nombre,
          correo: formData.correo,
          password: formData.password,
        }).toString(),
      });
  
      if (!response.ok) {
        throw new Error("Error en el servidor");
      }
  
      const result = await response.json();
      if (result.success) {
        setMessage(result.message || "Registro exitoso");
        onRegistroExitoso(); // Cambia a la pantalla de login
      } else {
        setMessage(result.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      onRegistroExitoso();
      setMessage("Error al conectar con el servidor");
    }
  };
  
  
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Registro de Usuarios</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 w-full p-2">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
