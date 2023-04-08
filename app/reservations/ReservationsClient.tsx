'use client';
import React, { useCallback, useState } from 'react';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { Container } from '@/app/components/Container';
import { Heading } from '@/app/components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/app/components/ListingCard';

interface ReservationsClientProps {
  reservations: (SafeReservation & { listing: SafeListing })[];
  currentUser: SafeUser;
}

export const ReservationsClient: React.FC<ReservationsClientProps> = ({
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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
