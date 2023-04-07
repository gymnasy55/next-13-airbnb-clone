'use client';
import React from 'react';
import Image from 'next/image';

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
