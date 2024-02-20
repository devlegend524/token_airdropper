import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <div className='flex justify-end'>
      <ConnectButton />
    </div>
  );
}
