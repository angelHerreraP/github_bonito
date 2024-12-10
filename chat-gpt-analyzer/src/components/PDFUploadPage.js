import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const PDFUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setErrorMessage(''); // Limpiar cualquier mensaje de error previo
    } else {
      alert('Por favor, selecciona solo archivos PDF');
    }
  };

  async function handleFileUpload() {
    try {
      if (!selectedFile) {
        setErrorMessage("No se seleccionó un archivo.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://108.163.157.73:8000/pdf/upload", {
        method: "POST",
        body: formData,
        // Elimina el modo "no-cors" y los headers de Accept
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        navigate('/chat');
      } else {
        // Manejar errores de respuesta
        const errorText = await response.text();
        setErrorMessage(`Error al subir el archivo: ${errorText}`);
        console.error("Error en la subida:", errorText);
      }
    } catch (error) {
      setErrorMessage(`Error al subir el archivo: ${error.message}`);
      console.error("Error al subir el archivo:", error);
    }
  }

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
          
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </div>
          )}
          
          <Button 
            className="mt-4 w-full" 
            onClick={handleFileUpload}
            disabled={!selectedFile}
          >
            Subir archivo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFUploadPage;