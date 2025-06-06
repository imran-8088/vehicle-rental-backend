import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const runSeed = async () => {
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();

  const bikeType = await prisma.vehicleType.create({
    data: {
      name: 'cruiser',
      vehicles: {
        create: [{ model: 'Royal Enfield Classic 350' }]
      }
    }
  });

  const carTypes = ['hatchback', 'suv', 'sedan'];
  for (const name of carTypes) {
    await prisma.vehicleType.create({
      data: {
        name,
        vehicles: {
          create: [
            { model: `${name} model 1` },
            { model: `${name} model 2` }
          ]
        }
      }
    });
  }

  console.log('Seeding complete.');
  await prisma.$disconnect();
};

runSeed().catch(e => {
  console.error(e);
  process.exit(1);
});
