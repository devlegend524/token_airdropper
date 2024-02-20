import React from 'react';
import DepositToken from 'components/DepositToken';
import WithDrawToken from 'components/WithdrawToken';
import SetWhiteList from 'components/SetWhiteList';

export default function Airdrop() {
  return (
    <div className='flex items-center flex-col p-1 w-[100vw]'>
      <h1 className='text-center text-3xl'>Airdrop</h1>
      <div className='flex flex-col w-full max-w-lg items-center'>
        <br />
        <DepositToken />
        <WithDrawToken />
        <br />
        <SetWhiteList />
      </div>
    </div>
  );
}
