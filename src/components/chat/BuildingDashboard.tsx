'use client'
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
}

interface Building {
  id: number;
  name: string;
  cost: number;
  benefits: string;
  unlocked: boolean;
  isResorceExtractor: boolean; // Cambiado a número para reflejar recursos como un número
}

export const BuildingDashboard = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiverUsername, setReceiverUsername] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [resources, setResources] = useState<number | undefined>(1000); // Valor inicial opcional
  const [totalResources, setTotalResources] = useState(0);

  const [selectedMessage, setSelectedMessage] = useState<Building | null>(null);

  
  useEffect(() => {
    fetch(`/api/buildings?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        const total = calculateTotalResources(data);
        setTotalResources(total);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, [userId]);

  const calculateTotalResources = (messages: Building[]): number => {
    return messages.reduce((total, message) => {
      if (message.cost) {
        return total + message.cost;
      }
      return total;
    }, 0);
    
  };

  const sendMessage = async () => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId: userId, receiverUsername, subject, content, resources }),
    });
    if (response.ok) {
      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      const total = totalResources + (resources || 0);
      setTotalResources(total);
      setReceiverUsername('');
      setSubject('');
      setContent('');
      setResources(1000); // Restablecer a valor inicial después de enviar mensaje
    } else {
      console.error('Error sending message');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = (message : any) => {
    setSelectedMessage(message);
  };
  return (
    <div className="container mx-auto p-4 flex justify-end">
      <div className="max-w-md w-full">
        
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <div className="mb-2"><strong>Total de Recursos de Mensajes:</strong> {totalResources}</div>
          <div>
      {messages.map((message) => (
        <div key={message.id} className="p-4 hover:bg-green-500 border rounded mb-2" onClick={() => handleClick(message)}>
          <div><strong>De:</strong> {message.name || 'Unknown'}</div>
          <div><strong>Cuesta:</strong> {message.cost || 'Unknown'}</div>
          <div><strong>Beneficios:</strong> {message.benefits}</div>
          <div><strong>Bloqueado:</strong> {message.unlocked}</div>
        </div>
      ))}
      {selectedMessage && (
        <div className="p-4 border rounded mb-2 bg-red-500">
          <h3>Detalle del Mensaje Seleccionado:</h3>
          <div><strong>De:</strong> {selectedMessage.name || 'Unknown'}</div>
          <div><strong>Cuesta:</strong> {selectedMessage.cost || 'Unknown'}</div>
          <div><strong>Beneficios:</strong> {selectedMessage.benefits}</div>
          <div><strong>Bloqueado:</strong> {selectedMessage.unlocked}</div>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDashboard;
