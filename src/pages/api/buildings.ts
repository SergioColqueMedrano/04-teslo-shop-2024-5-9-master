import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { userId } = req.query;
      try {
        const buildings = await prisma.building.findMany({
          
          
        });
        const formattedMessages = buildings.map(message => {
           
            return {
              ...message,
              
            };
          });
      
          res.status(200).json(formattedMessages);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching messages' });
        }
        break;

      case 'POST':
      try {
        // Obtener la sesión del usuario
        const session = await getSession();
        const { senderId, receiverUsername, subject, content, resources } = req.body;
        console.log("senderId:", senderId);

        const receiver = await prisma.user.findFirst({
            where: {
              OR: [
                { name: receiverUsername },
                // Otras condiciones de búsqueda que puedan aplicarse
              ],
            },
          });
          

        if (!receiver) {
          return res.status(404).json({ error: 'Receiver not found' });
        }

        const message = await prisma.message.create({
          data: {
            senderId,
            receiverId: receiver.id,
            subject,
            content,
            resources,
          },
          include: {
            sender: true,
            receiver: true,
          },
        });
        

        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
