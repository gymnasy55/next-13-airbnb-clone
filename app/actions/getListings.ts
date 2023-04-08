import prisma from '@/app/libs/prismadb';
import { SafeListing } from '@/app/types';

export interface IListingsParams {
  userId?: string;
}

export const getListings = async (
  params: IListingsParams,
): Promise<SafeListing[]> => {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: query,
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};
