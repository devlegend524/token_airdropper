import React from 'react';
import ClaimButton from 'components/ClaimButton';
import { useAccount } from 'wagmi';
export default function Home() {
  const { address } = useAccount();
  return (
    <div className='p-2'>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {address && <ClaimButton />}
      </div>
    </div>
  );
}
