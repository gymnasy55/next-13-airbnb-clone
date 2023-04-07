'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
    />
  );
};
