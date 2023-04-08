'use client';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src?: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || '/images/placeholder.jpg'}
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
    />
  );
};
