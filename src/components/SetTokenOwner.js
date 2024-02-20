import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useNetwork } from 'wagmi';
import AipDropperABI from 'config/abis/airdropper.json';
import { AirDropperAddress, TokenAddress } from 'config';

export default function SetTokenOwner() {
  const [addr, setAddr] = useState('');

  const { chain } = useNetwork();

  const { config } = usePrepareContractWrite({
    address: AirDropperAddress[chain && chain.id ? chain.id : 1],
    abi: AipDropperABI,
    args: [TokenAddress[chain && chain.id ? chain.id : 1], addr],
    functionName: 'setTokenOwner',
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <div className='w-full'>
      <div>SetTokenOwner (* Admin Action)</div>
      <div className='flex w-md'>
        <input
          type='text'
          value={addr}
          placeholder='address'
          className='text-right text-[12px] w-full'
          onChange={(e) => setAddr(e.target.value)}
        />
        <div className='flex justify-center flex-col'>
          <button
            className='mx-2 text-white btn_color py-1 px-2 rounded-lg disabled:bg-gray-600'
            disabled={isLoading}
            onClick={() => write?.()}
          >
            Set
          </button>
          <div className='flex'>
            {isLoading && <div>Processing...</div>}
            {isSuccess && <div>Transaction: Successful!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
