// pages/api/instances/index.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const instances = await prisma.instance.findMany({
    include: {
      user: true,
    },
  });

  res.status(200).json(instances);
}
