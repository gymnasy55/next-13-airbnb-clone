'use client';
import React, { useCallback, useState } from 'react';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Container } from '@/app/components/Container';
import { Heading } from '@/app/components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/app/components/ListingCard';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

export const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listings deleted');
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete listing"
          />
        ))}
      </div>
    </Container>
  );
};
