import React from 'react';

import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getFavoriteListings } from '@/app/actions/getFavoriteListings';
import { ClientOnly } from '@/app/components/ClientOnly';
import { EmptyState } from '@/app/components/EmptyState';
import { FavoritesClient } from '@/app/favorites/FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getFavoriteListings();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
