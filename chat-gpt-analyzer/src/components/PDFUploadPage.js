import React, { useState } from 'react';
import { Upload, File, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Progress from './ui/Progress';


const PDFUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecciona solo archivos PDF');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      // Simular progreso de carga
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            // Aquí iría la lógica de cambio de pestaña o navegación
            console.log('Carga completada');
          }
        }, 200);
      };

      simulateUpload();

      // Aquí iría tu endpoint de carga real
      // const response = await fetch('/api/upload-pdf', {
      //   method: 'POST',
      //   body: formData
      // });
    } catch (error) {
      console.error('Error al subir el archivo', error);
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
              <Upload className="w-16 h-16 text-blue-500" />
              <p className="text-gray-600">
                {selectedFile 
                  ? `${selectedFile.name} seleccionado` 
                  : 'Arrastra y suelta tu PDF aquí o haz clic para seleccionar'}
              </p>
              {selectedFile && (
                <div className="flex items-center space-x-2 text-gray-700">
                  <FileText className="w-6 h-6" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          {selectedFile && (
            <div className="mt-4 space-y-4">
              <Progress 
                value={uploadProgress} 
                className="w-full h-2 bg-blue-100"
              />
              <Button 
                onClick={handleFileUpload} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subir PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFUploadPage;