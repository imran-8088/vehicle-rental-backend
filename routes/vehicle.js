import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.get('/vehicle-types', async (req, res) => {
  const types = await prisma.vehicleType.findMany({
    include: { vehicles: true }
  });
  res.json(types);
});

export default router;
