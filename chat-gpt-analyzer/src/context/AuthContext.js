import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    console.log("useEffect: Revisando token en localStorage:", token);
    if (!token) {
      localStorage.removeItem("token");
      console.log("Token no encontrado, limpiando localStorage.");
    }
  }, [token]);

  // Función de registro
  const register = (email, password) => {
    console.log("Intentando registrar usuario:", email);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      console.log("El correo ya está registrado:", email);
      alert("El correo ya está registrado");
      return false;
    }

    // Guardar el nuevo usuario
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Nuevo usuario registrado:", email);

    // Simular la generación de un token al registrarse
    const fakeToken = "fake-jwt-token";
    localStorage.setItem("token", fakeToken);
    setToken(fakeToken);
    console.log("Token generado para el nuevo usuario:", fakeToken);
    
    return true;
  };

  // Función de inicio de sesión
  const login = (email, password) => {
    console.log("Intentando iniciar sesión con:", email);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar si existe el usuario
    const validUser = users.find((u) => u.email === email && u.password === password);
    if (validUser) {
      console.log("Usuario encontrado, iniciando sesión...");
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);
      setToken(fakeToken);
      console.log("Token generado para el usuario:", fakeToken);
      return true;
    }
    console.log("Usuario o contraseña incorrectos");
    return false;
  };

  // Cerrar sesión
  const logout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    setToken(null);
    console.log("Sesión cerrada y token removido");
  };

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
