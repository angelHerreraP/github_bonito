import React, { useState, useEffect } from "react";
import { FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";

// Componente principal
const PDFUploadPage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Cargar los archivos previamente guardados del localStorage
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    setPdfFiles(storedFiles);
  }, []);

  // Manejar la carga de un archivo PDF
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Guardar el archivo en la "biblioteca"
  const handleUpload = () => {
    if (file) {
      setIsUploading(true);

      // Simulación de un pequeño retraso para mostrar el proceso de carga
      setTimeout(() => {
        const newFile = { name: file.name, url: URL.createObjectURL(file) };

        // Guardar en el estado
        setPdfFiles((prevFiles) => [...prevFiles, newFile]);

        // Guardar en localStorage
        const updatedFiles = [...pdfFiles, newFile];
        localStorage.setItem("pdfFiles", JSON.stringify(updatedFiles));

        // Limpiar el estado del archivo cargado
        setFile(null);
        setIsUploading(false);
      }, 1000); // Simula un retraso de 1 segundo para la carga
    } else {
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-gray-50 py-12 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Cargar y Ver PDFs
      </h1>

      {/* Sección de carga de archivos */}
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpload}
            className={`w-full p-3 rounded-md text-white ${
              isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition-colors duration-200`}
            disabled={isUploading}
          >
            {isUploading ? "Cargando..." : "Cargar PDF"}
          </button>
        </div>
      </div>

      {/* Mostrar archivos PDF en la biblioteca */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Biblioteca de PDFs</h2>
        <ul className="space-y-4">
          {pdfFiles.length === 0 ? (
            <p className="text-center text-gray-600">No tienes archivos PDF cargados.</p>
          ) : (
            pdfFiles.map((pdf, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaFilePdf className="text-red-600" />
                  <span className="text-lg font-medium">{pdf.name}</span>
                </div>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Ver PDF
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PDFUploadPage;
