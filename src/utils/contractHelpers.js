import { ethers } from 'ethers';

const getContract = (abi, address, provider) => {
  return new ethers.Contract(address, abi, provider);
};
