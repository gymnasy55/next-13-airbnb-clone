'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { Container } from '@/app/components/Container';
import { Heading } from '@/app/components/Heading';
import { ListingCard } from '@/app/components/ListingCard';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

interface TripsClientProps {
  reservations: (SafeReservation & { listing: SafeListing })[];
  currentUser: SafeUser;
}

export const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled');
          router.refresh();
        })
        .catch((error) =>
          toast.error(error?.response?.data?.error || 'Something went wrong'),
        )
        .finally(() => setDeletingId(''));
    },
    [router],
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};
