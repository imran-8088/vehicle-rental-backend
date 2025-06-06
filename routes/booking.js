import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/book', async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;

  const conflict = await prisma.booking.findFirst({
    where: {
      vehicleId,
      OR: [
        {
          startDate: { lte: new Date(endDate) },
          endDate: { gte: new Date(startDate) }
        }
      ]
    }
  });

  if (conflict) {
    return res.status(400).json({ error: 'Vehicle already booked for this date range' });
  }

  const booking = await prisma.booking.create({
    data: {
      vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }
  });

  res.json(booking);
});

export default router;
