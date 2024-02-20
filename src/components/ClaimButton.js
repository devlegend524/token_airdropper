import React from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import AipDropperABI from 'config/abis/airdropper.json';

import { AirDropperAddress, TokenAddress } from 'config';
import { formatEther } from 'ethers/lib/utils.js';
export default function ClaimButton() {
  const { address } = useAccount();

  const result = useContractRead({
    abi: AipDropperABI,
    address: AirDropperAddress,
    args: [TokenAddress, address],
    functionName: 'amountToClaim',
  });
  const { config } = usePrepareContractWrite({
    address: AirDropperAddress,
    abi: AipDropperABI,
    args: [TokenAddress],
    functionName: 'claimAirdrop',
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <div className='ml-2 mb-2'>
        Available:{' '}
        {Number(
          result?.data === undefined ? 0 : formatEther(result?.data.toString())
        ).toFixed(2)}{' '}
        YUMBUCKS
      </div>
      <div className='flex justify-center flex-col'>
        <button
          className='mx-2 text-white btn_color py-1 px-2 rounded-lg disabled:bg-gray-600'
          disabled={isLoading}
          onClick={() => write?.()}
        >
          CLAIM TOKEN
        </button>
        <div className='flex'>
          {isLoading && <div>Processing...</div>}
          {isSuccess && <div>Transaction: Successful!</div>}
        </div>
      </div>
    </div>
  );
}
