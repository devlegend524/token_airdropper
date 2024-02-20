import React from 'react';
import { useContractWrite, usePrepareContractWrite, useNetwork } from 'wagmi';
import { erc20ABI } from 'wagmi';

import { AirDropperAddress, TokenAddress } from 'config';
import { fromReadableAmount } from 'utils/customHelpers';

export default function ApproveToken() {
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    address: TokenAddress[chain && chain.id ? chain.id : 1],
    abi: erc20ABI,
    args: [
      AirDropperAddress[chain && chain.id ? chain.id : 1],
      fromReadableAmount('100000000000000000000000000000000000000000000'),
    ],
    functionName: 'approve',
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <div className='flex items-center flex-col'>
      <div className='flex w-full justify-center'>
        <button
          className='mx-2 text-white btn_color py-1 px-2 rounded-lg disabled:bg-gray-600'
          disabled={isLoading}
          onClick={() => write?.()}
        >
          Approve
        </button>
      </div>

      <div>
        {isLoading && <div>Processing...</div>}
        {isSuccess && <div>Transaction: Successful!</div>}
      </div>
    </div>
  );
}
