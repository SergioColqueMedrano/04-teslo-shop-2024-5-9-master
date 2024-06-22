'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getResources = async (): Promise<number> => {
  try {
    const message = await prisma.message.findFirst({
      select: { resources: true },
    });

    if (!message || message.resources === null) return 0;

    // resources debería ser un Int, pero si no, convertirlo
    const resources = parseInt(message.resources.toString());

    return resources;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
