import prisma from '@/app/libs/prismadb';
import { SafeListing } from '@/app/types';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const getListings = async (
  params: IListingsParams,
): Promise<SafeListing[]> => {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      endDate,
      startDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {
                  gte: startDate,
                },
                startDate: {
                  lte: startDate,
                },
              },
              {
                startDate: {
                  lte: endDate,
                },
                endDate: {
                  gte: endDate,
                },
              },
            ],
          },
        },
      };
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
