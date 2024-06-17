// pages/api/buildings/build.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId, buildingId, location } = req.body;

  // Check if the user has enough resources, etc.
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const building = await prisma.building.findUnique({ where: { id: buildingId } });

  if (user.resources < building.cost) {
    return res.status(400).json({ error: 'Insufficient resources' });
  }

  // Deduct resources and create the building
  await prisma.user.update({
    where: { id: userId },
    data: { resources: user.resources - building.cost },
  });

  const newBuilding = await prisma.userBuilding.create({
    data: {
      userId,
      buildingId,
      location,
      status: 'completed', // Or 'in_progress' if there's a build time
    },
  });

  res.status(200).json(newBuilding);
}
