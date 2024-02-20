import React from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import AipDropperABI from 'config/abis/airdropper.json';

import { AirDropperAddress, TokenAddress } from 'config';

export default function WithDrawToken() {
  const { config } = usePrepareContractWrite({
    address: AirDropperAddress,
    abi: AipDropperABI,
    args: [TokenAddress],
    functionName: 'withdrawExtraToken',
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <div>
      <div>Withdraw Token</div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center'>
          <button
            className='mx-2 text-white btn_color py-1 px-2 rounded-lg disabled:bg-gray-600'
            disabled={isLoading}
            onClick={() => write?.()}
          >
            {isLoading
              ? 'Processing...'
              : isSuccess
              ? 'Successful'
              : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
}
