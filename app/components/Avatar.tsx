'use client';
import React from 'react';
import Image from 'next/image';

export const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
    />
  );
};
