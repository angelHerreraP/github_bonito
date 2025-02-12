import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, User, Bot } from 'lucide-react';
import { Button } from './ui/Button';
import Input from './ui/Input';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: 'system',
      content: 'Hola! Estoy listo para ayudarte con el contenido de tu PDF. ¿En qué puedo asistirte?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🚀 🔹 ¡Aquí definimos la función correctamente!
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        question: inputMessage,
        target_language: 'es',
        model_name: 'llama2',
      });

      const response = await fetch(`http://108.163.157.73:8000/query/?${queryParams.toString()}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error del servidor: ${response.statusText}`);
      }

      const data = await response.json();

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.answer || 'No se pudo obtener una respuesta.'
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error en la comunicación:', error);
      const errorMessage = {
        id: Date.now() + 2,
        type: 'system',
        content: 'Hubo un problema con el servidor. Inténtalo de nuevo.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="w-10 h-10 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">AI PDF Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={() => window.location.reload()}>
          <RefreshCw className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-xl max-w-[80%] ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
        <Input
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? <RefreshCw className="animate-spin" /> : <Send />}
        </Button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
