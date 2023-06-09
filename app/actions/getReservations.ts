import prisma from '@/app/libs/prismadb';
import { SafeListing, SafeReservation } from '@/app/types';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (
  params: IParams,
): Promise<(SafeReservation & { listing: SafeListing })[]> => {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (e) {
    throw e;
  }
};
