// pages/api/buildings/assignWorkers.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId, buildingId, workers } = req.body;

  // Update the building with the new number of workers
  const updatedBuilding = await prisma.userBuilding.update({
    where: { id: buildingId },
    data: { workers },
  });

  res.status(200).json(updatedBuilding);
}
