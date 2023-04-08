import prisma from '@/app/libs/prismadb';
import { SafeListing } from '@/app/types';

export const getListings = async (): Promise<SafeListing[]> => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};
