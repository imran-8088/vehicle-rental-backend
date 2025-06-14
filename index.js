import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

import vehicleRoutes from './routes/vehicle.js';
import bookingRoutes from './routes/booking.js';

app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
