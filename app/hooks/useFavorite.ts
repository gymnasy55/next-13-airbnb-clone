import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { useLoginModal } from '@/app/hooks/useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const request = hasFavorited
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await request();
        router.refresh();
        toast.success('Favorited');
      } catch (e) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, loginModal, hasFavorited, listingId, router],
  );

  return { hasFavorited, toggleFavorite };
};
