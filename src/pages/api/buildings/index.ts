// pages/api/buildings/index.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const buildings = await prisma.building.findMany({
    where: {
      unlocked: true, // Or any other condition to filter buildings based on user progress
    },
  });

  res.status(200).json(buildings);
}
