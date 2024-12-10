import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { Upload } from 'lucide-react'; // Icono de subida de archivo
import { Button } from '../components/ui/Button'; // Componente de botón
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'; // Componentes de UI

const PDFUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);  // Estado para almacenar el archivo seleccionado
  const [uploadProgress, setUploadProgress] = useState(0); // Estado para el progreso de carga (si lo necesitas)
  const navigate = useNavigate(); // Inicializa el hook useNavigate para redirigir

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);  // Almacena el archivo PDF en el estado
    } else {
      alert('Por favor, selecciona solo archivos PDF'); // Alerta si el archivo no es PDF
    }
  };

  async function handleFileUpload() {
    try {
      // Verifica si un archivo ha sido seleccionado
      if (!selectedFile) {
        throw new Error("No se seleccionó un archivo.");
      }

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "http://108.163.157.73:8000/pdf/upload";
      
      const formData = new FormData();
      formData.append("file", selectedFile); // Asegúrate de que el archivo esté correctamente asignado
      
      const response = await fetch(proxyUrl + targetUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });
      

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error(`Error al subir el archivo: ${response.statusText}`);
      }

      const data = await response.json();  // Obtiene la respuesta en formato JSON

      if (data && data.message) {
        console.log("Respuesta del servidor:", data.message);
        // Navega a la página de chat si la carga es exitosa
        navigate('/chat');
      } else {
        throw new Error("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error.message); // Muestra el error si ocurre
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Carga tu documento PDF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center 
            hover:border-blue-500 transition-all duration-300 
            hover:bg-blue-50 cursor-pointer relative"
          >
            <input 
              type="file" 
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <Upload className="text-blue-500 w-12 h-12" />
              <p className="text-gray-700">Arrastra tu archivo PDF aquí o haz clic para seleccionar</p>
              {selectedFile && <p className="text-sm text-gray-600">{selectedFile.name}</p>}
            </div>
          </div>
          <Button 
            className="mt-4 w-full" 
            onClick={handleFileUpload}
            disabled={!selectedFile} // Desactiva el botón si no hay archivo seleccionado
          >
            Subir archivo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFUploadPage;
