import React, { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import AipDropperABI from 'config/abis/airdropper.json';
import { AirDropperAddress, BaseFee, TokenAddress } from 'config';
import { parseEther } from 'ethers/lib/utils.js';
import { ethers } from 'ethers';

export default function SetWhiteList() {
  const { address } = useAccount();
  const [addresses, setAddresses] = useState([]);
  const { chain } = useNetwork();

  const handleChange = (e) => {
    const currentAddresses = e.target.value;
    setAddresses(currentAddresses);
  };

  const handleClick = async (e) => {
    const newArr = addresses.replace(/\r\n/g, '\n').split('\n');
    let addressArr = [];
    let amountArr = [];
    for (let i = 0; i < newArr.length; i++) {
      let addr = newArr[i].split(/(\s+)/).filter((e) => e.trim().length > 0);
      console.log(addr);
      if (addr.length === 2) {
        addressArr.push(addr[0]);
        amountArr.push(parseEther(Number(addr[1]).toString()));
      }
    }

    if (addressArr.length !== amountArr.length) {
      console.log('invalid input data');
      return;
    }

    const fee = parseEther(
      Number(Number(BaseFee) * Number(addressArr.length))
        .toFixed(4)
        .toString()
    );
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const airdropContract = new ethers.Contract(
      AirDropperAddress[chain && chain.id ? chain.id : 1],
      AipDropperABI,
      signer
    );

    const tx = await airdropContract.addUsersForAirdrop(
      TokenAddress[chain && chain.id ? chain.id : 1],
      addressArr,
      amountArr,
      {
        from: address,
        value: fee,
      }
    );
    await tx.wait();
  };
  return (
    <div>
      {' '}
      <div>Set WhiteList (max 200 per one transaction)</div>
      <div className='flex flex-row gap-4 justify-between'>
        <div>
          {' '}
          <textarea
            rows={30}
            value={addresses}
            onChange={(e) => handleChange(e)}
            placeholder='0xAc998f3417758447da8Bea801098BD18098a48cA 123'
            className='text-[12px] min-w-[500px] p-1 text-black'
          />
        </div>
      </div>
      <div className='flex justify-center mt-2'>
        <div className='flex justify-center flex-col'>
          <button
            className='mx-2 text-white btn_color py-1 px-2 rounded-lg disabled:bg-gray-600'
            onClick={(e) => handleClick(e)}
          >
            Set WhiteList
          </button>
        </div>
      </div>
    </div>
  );
}
