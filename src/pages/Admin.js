import React from 'react';
import SetTokenOwner from 'components/SetTokenOwner';

export default function Admin() {
  return (
    <div className='flex items-center flex-col p-1 w-[100vw]'>
      <h1 className='text-center text-3xl'>Admin</h1>
      <div className='flex flex-col w-full max-w-lg items-center'>
        <br />
        <SetTokenOwner />
      </div>
    </div>
  );
}
