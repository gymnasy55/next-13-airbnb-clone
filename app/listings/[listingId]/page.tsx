import React from 'react';

import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getListingById } from '@/app/actions/getListingById';
import { getReservations } from '@/app/actions/getReservations';
import { ClientOnly } from '@/app/components/ClientOnly';
import { EmptyState } from '@/app/components/EmptyState';
import { ListingClient } from '@/app/listings/[listingId]/ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
