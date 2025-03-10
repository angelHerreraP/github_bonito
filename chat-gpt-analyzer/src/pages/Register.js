import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (register(email, password)) {
      navigate("/chat");
    } else {
      alert("Error al registrarse. Intenta con otro email.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Regístrate</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
            Registrarse
          </button>
        </form>
        <div className="text-center mt-4">
          <p>¿Ya tienes cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
