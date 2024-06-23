'use client'
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
}

interface Message {
  id: number;
  subject: string;
  content: string;
  createdAt: string;
  sender: User;
  receiver: User;
  resources?: number; // Cambiado a número para reflejar recursos como un número
}

export const TotalRecursos = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiverUsername, setReceiverUsername] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [resources, setResources] = useState<number | undefined>(1000); // Valor inicial opcional
  const [totalResources, setTotalResources] = useState(0);

  useEffect(() => {
    fetch(`/api/messages?userId=${userId}`)
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

  const calculateTotalResources = (messages: Message[]): number => {
    return messages.reduce((total, message) => {
      if (message.resources) {
        return total + message.resources;
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

  return (
    <div className="container mx-auto p-4 flex">
      <div className="max-w-md w-full">
        
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <div className="mb-2"><strong>Total de Recursos de Mensajes:</strong> {totalResources}</div>
          
        </div>
      </div>
    </div>
  );
};

export default TotalRecursos;
