import { getServerSession } from 'next-auth';

import prisma from '@/app/libs/prismadb';
import { SafeUser } from '@/app/types';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async (): Promise<SafeUser | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
};
