import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { SafeListing } from '@/app/types';

export const getFavoriteListings = async (): Promise<SafeListing[]> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
  } catch (e) {
    throw e;
  }
};
